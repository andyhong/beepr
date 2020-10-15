const twilio = require("twilio")

const connectToTwilio = async () => {

  const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )

  return client
}

export default connectToTwilio
