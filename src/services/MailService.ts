import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default class MailService {
  async sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ) {
    const transporter = nodemailer.createTransport({
      host: String(process.env.SMTP_SERVER),
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    return transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  }
}
