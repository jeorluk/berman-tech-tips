const nodemailer = require('nodemailer')

import { getSession } from 'next-auth/client'

const sendAnEmail = async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    // Signed in
    const data = JSON.parse(req.body)
    const { subject = 'Form Submission', ...fields } = data

    const SEND_TO = process.env.CONTACT_ADDRESS
    const { privateKey } = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    )
    console.log(privateKey)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: session.user.email,
        serviceClient: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
        privateKey: privateKey,
      },
    })
    try {
      await transporter.verify()
      await transporter.sendMail({
        from: session.user.email,
        to: SEND_TO,
        subject: subject,
        html: `
        <div>
        <h1>${subject}</h1>
        ${parseFields(fields)}
        </div>
        `,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        success: false,
        message:
          'There was an error sending your message. Please try again.  If the error persists, please contact support@randsol.com.',
      })
    }
    res.status(200).json(data)
  } else {
    // Not Signed in
    res.status(401).json({
      success: false,
      message: 'You must be logged in to perform this function.',
    })
  }
}

const parseFields = (fields) =>
  //Convert fields object to formatted string containing all keys and values
  Object.entries(fields)
    .map(([key, value]) => {
      return `<p style="font-weight: bold; text-transform: uppercase; background: lightGrey; ">${key}</p><p>${value}</p>`
    })
    .join('')

export default sendAnEmail
