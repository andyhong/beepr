import { getSession } from 'next-auth/client'

import connectToTwilio from '../../../utils/twilio'
import { refreshTokens } from '../../../utils/token'
import { getAllCheckins, getChurchName } from '../../../utils/pco'

export default async (req, res) => {
  const session = await getSession({ req })
  const { method, query: { code } } = req
  const client = await connectToTwilio()

  if (session && method === "POST") {
    try {
      const { accessToken } = await refreshTokens(session.user.id)
      const allCheckins = await getAllCheckins(accessToken)
      const emergencyContact = allCheckins.filter((checkin) => checkin.code === code)

      if (emergencyContact.length < 1) {
        res.status(400).json({
          status: "error",
          title: "Invalid code!",
          description: "Please check your code and try again."
        })
      } else if (emergencyContact[0].phone === null || emergencyContact[0]["phone"].length < 10) {
        res.status(400).json({
          status: "error",
          title: "No phone number on file!",
          description: "Please notify a staff member."
        })
      } else {
        const churchName = await getChurchName(session.user.id)
        const message = await client.messages.create({
          body: `${churchName}: Hi ${emergencyContact[0].name.split(" ")[0]}! Your child needs your assistance.`,
          to: `+${emergencyContact[0].phone}`,
          from: `+12018347990`
        })

        if (message) {
          res.status(200).json({
            status: "success",
            title: "Message sent!",
            description: "Wasn't that easy?"
          })
        }
      }
    } catch(error) {
      console.log(error)
      res.status(400).json({
        status: "error",
        title: "Uh oh! Something went wrong.",
        description: "Please try again."
      })
    }
  } else {
    res.status(400).json({
      status: "error",
      title: "Uh oh! Something went wrong.",
      description: "Please try again."
    })
  }
}
