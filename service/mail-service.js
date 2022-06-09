const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendOrderMessage(to, title, text, subject) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: subject,
            text: '',
            html:
                `
                    <div>
                        <h1>${title}</h1>
                        <span>${text}</span>
                    </div>
                `
        })
    }
}

module.exports = new MailService();