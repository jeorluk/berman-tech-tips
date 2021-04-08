import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

async function isUserStaff(email) {
  const { google } = require('googleapis')
  const { privateKey } = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  )
  console.log(privateKey)
  const config = {
    type: 'service_account',
    project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    private_key: privateKey,
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  }
  const auth = new google.auth.JWT(
    config.client_email,
    null,
    config.private_key,
    [
      'https://apps-apis.google.com/a/feeds/groups/',
      'https://www.googleapis.com/auth/admin.directory.group',
      'https://www.googleapis.com/auth/admin.directory.group.member',
      'https://www.googleapis.com/auth/admin.directory.group.member.readonly',
      'https://www.googleapis.com/auth/admin.directory.group.readonly',
    ],
    'orlukj@mjbha.org'
  )

  auth.authorize((err) => {
    if (err) {
      console.log(err)
    }
  })

  const service = google.admin({ version: 'directory_v1', auth })
  const isMember = await service.members
    .hasMember({
      groupKey: 'employees@mjbha.org',
      memberKey: email,
    })
    .then((resp) => resp.data.isMember)
  return isMember
}

const options = {
  providers: [
    Providers.Google({
      id: 'google',
      name: 'Google',
      type: 'oauth',
      version: '2.0',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/admin.directory.group.readonly',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
      requestTokenUrl: 'https://accounts.google.com/o/oauth2/auth',
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/auth?prompt=select_account&response_type=code&hd=mjbha.org',
      profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      profile: (profile) => {
        return {
          profile: profile,
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      if (
        account.provider === 'google' &&
        profile.verified_email === true &&
        profile.email.endsWith('@mjbha.org') &&
        (await isUserStaff(profile.email))
      ) {
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    },
  },
}
export default (req, res) => NextAuth(req, res, options)
