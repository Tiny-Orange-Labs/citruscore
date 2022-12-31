import sgMail from '@sendgrid/mail';
async function _sendEmail(msg) {
    await sgMail.send(msg);
    console.log(`Email sent to ${msg.to}`);
}
export default async function sendEmail(data) {
    if (process.env.SENDGRID_API_KEY && process.env.SENDER_EMAIL) {
        const msg = {
            from: process.env.SENDER_EMAIL,
            ...data,
        };
        return await _sendEmail(msg);
    }
}
