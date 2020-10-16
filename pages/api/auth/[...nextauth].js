import NextAuth from 'next-auth'

const options = {

  providers: [
    {
      id: 'pco',
      name: 'Planning Center Online',
      type: 'oauth',
      version: '2.0',
      scope: 'people check_ins',
      params: { grant_type: "authorization_code" },
      accessTokenUrl: 'https://api.planningcenteronline.com/oauth/token',
      requestTokenUrl: 'https://api.planningcenteronline.com/oauth/token',
      authorizationUrl: 'https://api.planningcenteronline.com/oauth/authorize?response_type=code',
      profileUrl: 'https://api.planningcenteronline.com/people/v2/me?include=emails',
      profile: _profile => {
        return {
          id: _profile.data.id,
          name: _profile.data.attributes.name,
          email: _profile.included[0] ? _profile.included[0].attributes.address : null,
          image: _profile.data.attributes.avatar,
        }
      },
      clientId: process.env.PCO_CLIENT_ID,
      clientSecret: process.env.PCO_CLIENT_SECRET,
    }
  ],

  database: process.env.DATABASE_URL,

  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id
      // session.user.permission = await getPermission(user.id)
      return Promise.resolve(session)
    },
  },

}

export default (req, res) => NextAuth(req, res, options)
