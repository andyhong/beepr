import { MongoClient } from 'mongodb'

let cachedMongoClient = null
let cachedDb = null

export async function connectToDatabase() {

  if (cachedMongoClient && cachedDb) {
    return { client: cachedMongoClient, db: cachedDb }
  }

  const client = await MongoClient.connect(
    process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  const db = client.db("beepr")

  cachedMongoClient = client
  cachedDb = db

  return { client, db }
}
