import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

type Email = {
    to: string;
    subject: string;
    text: string;
    html: string;
};

async function _sendEmail(msg: MailDataRequired) {
    await sgMail.send(msg);
    console.log(`Email sent to ${msg.to}`);
}

export default async function sendEmail(data: Email) {
    if (process.env.SENDGRID_API_KEY && process.env.SENDER_EMAIL) {
        const msg = {
            from: process.env.SENDER_EMAIL,
            ...data,
        };

        return await _sendEmail(msg);
    }
}
