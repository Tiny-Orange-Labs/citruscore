import sendGrid from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
}
