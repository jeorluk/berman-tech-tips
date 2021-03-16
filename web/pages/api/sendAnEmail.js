const nodemailer = require('nodemailer')

export default async (req, res) => {
  const SEND_TO = process.env.CONTACT_ADDRESS 

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: req?.query?.email,
      serviceClient: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
      privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    },
  })
  try {
    await transporter.verify()
    await transporter.sendMail({
      from: req.query.email,
      to: SEND_TO,
      subject: 'Support Request',
      html: `
      <div>
      <h2>Request Title</h2>
      <p>Request Body</p>
      </div>
      `,
    })
  } catch (err) {
    console.error(err)
  }

  res.send('Ack!')
}
