require('dotenv').config()
let nodemailer = require('nodemailer')

module.exports = class DayZeroGmail {
    constructor() {
        this.mail_address = process.env.EMAIL_ADDRESS
    }
    send(recipients, subject, body) {
        let msg = {
            from: this.mail_address,
            to: recipients,
            subject: subject,
            text: body,
        }

        let config = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.mail_address,
                pass: process.env.PASSWORD,
            },
        }
        let transporter = nodemailer.createTransport(config)
        transporter.sendMail(msg, function(err, response) {
            console.log(err || response)
        })
    }
}