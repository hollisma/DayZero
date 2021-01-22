require('dotenv').config()
let nodemailer = require('nodemailer')

module.exports = class DayZeroGmail {
  constructor() {
    this.mail_address = process.env.EMAIL_ADDRESS
  }

  async send(recipients, subject, body) {
    let msg = {
      from: this.mail_address,
      to: recipients,
      subject: subject,
      text: body
    }

    let config = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: this.mail_address,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    }

    let transporter = nodemailer.createTransport(config)
    transporter.sendMail(msg, function(err, response) {
      console.log(err || response)
    })
  }
}
