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
            ? `Fernando and Breanna Wedding: Hola ${name}, recibimos tu RSVP. Responde STOP para cancelar o HELP para ayuda.`
            : `Fernando and Breanna Wedding: Hi ${name}, we received your RSVP. Reply STOP to unsubscribe or HELP for help.`;

    const message = await client.messages.create({
        to,
        from: fromNumber,
        body,
    });

    return { sid: message.sid };
}

module.exports = { sendRsvpConfirmationSms };
