const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

let client = null;

if (accountSid && authToken && fromNumber) {
    client = twilio(accountSid, authToken);
} else {
    console.warn("Twilio env vars missing. SMS will be skipped.");
}

async function sendRsvpConfirmationSms({ to, name, language = "en" }) {
    if (!client) return { skipped: true };

    const body =
        language === "es"
            ? `Hola ${name}, recibimos tu confirmación (RSVP). ¡Gracias!`
            : `Hi ${name}, we received your RSVP. Thank you!`;

    const message = await client.messages.create({
        to,
        from: fromNumber,
        body,
    });

    return { sid: message.sid };
}

module.exports = { sendRsvpConfirmationSms };
