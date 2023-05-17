// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require('nodemailer')

interface MailInfo {
  messageId: string
  // include other properties as needed
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, mobility, note, date } = req.body

  const userMessage = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: email,
    subject: 'Thank you for your message',
    text: `Dear ${name},\n\nThank you for your message. Here are the next steps...`,
    // Include HTML version of your message here
  }

  const adminMessage = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: process.env.ADMIN_EMAIL_ADDRESS,
    subject: '🚝 MIH | Přišla nová zpráva',
    text: `Nová zpráva od ${name} at ${date}:\n\nInterest: ${mobility}\n\nNote: ${note}`,
    // Include HTML version of your message here
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  if (req.method === 'POST') {
    transporter.sendMail(userMessage, (err: Error | null, info: MailInfo) => {
      if (err) {
        console.error(`Error sending email to user: ${err}`)
        res.status(500).json({ error: 'Error sending email to user' })
        return
      }

      transporter.sendMail(
        adminMessage,
        (err: Error | null, info: MailInfo) => {
          if (err) {
            console.error(`Error sending email to admin: ${err}`)
            res.status(500).json({ error: 'Error sending email to admin' })
          } else {
            res.status(200).json({ success: 'Messages sent successfully' })
          }
        }
      )
    })
  }
}
