import { ObjectId } from 'mongodb'

import { connectToDatabase } from './db'


export const getTokens = async (userId) => {
  const { db } = await connectToDatabase()
  const { accessToken, refreshToken, providerAccountId } = await db.collection("accounts").findOne({
    userId: ObjectId(userId)
  })

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    pcoId: providerAccountId
  }
}

export const refreshTokens = async (userId) => {
  const { db } = await connectToDatabase()
  const { refreshToken, pcoId } = await getTokens(userId)
  const options = {
    method: "POST",
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({
      'client_id': process.env.PCO_CLIENT_ID,
      'client_secret': process.env.PCO_CLIENT_SECRET,
      'refresh_token': refreshToken,
      'grant_type': "refresh_token"
    })
  }
  const response = await fetch(`https://api.planningcenteronline.com/oauth/token`, options)
  const json = await response.json()
  await db.collection("accounts").updateOne({
    userId: ObjectId(userId)}, {
      $set: {
        accessToken: json.access_token,
        refreshToken: json.refresh_token
      }
    }
  )

  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    pcoId
  }
}
