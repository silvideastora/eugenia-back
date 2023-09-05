import {createTransport} from "nodemailer";

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(JSON.stringify(error))
            throw new Error('Error al enviar el correo electrónico');
        }
    }
}
