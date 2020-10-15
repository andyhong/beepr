import { getSession } from 'next-auth/client'

import { refreshTokens } from '../../utils/token'

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    const { accessToken, refreshToken } = await refreshTokens(session.user.id)
    res.status(200).json({ accessToken, refreshToken })
  } else {
    res.status(400).json({ error: "no session found" })
  }
}
