# beepr.

**[Homepage](https://beepr.vercel.app)**

**[Demo](https://beepr.vercel.app/demo)** (no account needed!)

> A free, mobile-minded, Planning Center app to page parents during church services.

## About

**beepr** allows staff and volunteer to easily page parents during church services via text message in the case their child needs their attention in childcare.

This app implements and utilizes OAuth2 authentication via [Planning Center](https://planning.center/), and uses its API to query the emergency contact of the child. Then, the [Twilio API](https://www.twilio.com/) is used to send an SMS message to the phone number on file.

## Built With

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Twilio](https://www.twilio.com/)
- [Chakra UI](https://chakra-ui.com/)
- Deployed on [Vercel](https://vercel.com/)
