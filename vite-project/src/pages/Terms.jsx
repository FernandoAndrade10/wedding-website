import { useLanguage } from "../context/LanguageContext";

export default function Terms() {
    const { language } = useLanguage();
    const termsText = {
        en: {
            terms: "Terms of Service",
            p1: "By using this website, you agree to the following terms.",
            purpose: "Website Purpose",
            p2: "This website is intended for invited guests to submit RSVP information for our wedding.",
            sms: "SMS Communications",
            smsP1: "Program name: Fernando and Breanna Wedding SMS Updates.",
            smsP2: "Program description: guests who opt in may receive RSVP confirmations, wedding reminders, event updates, and logistics messages.",
            smsP3: "Message frequency varies, but is expected to be low. Message and data rates may apply.",
            smsP4: "Reply STOP to unsubscribe at any time. Reply HELP for help.",
            smsP5: "Carriers are not liable for any delayed or undelivered messages.",
            smsP6: "SMS consent is optional and is not required to submit your RSVP. See our Privacy Policy for how mobile information and opt-in consent are handled.",
            use: "Acceptable Use",
            p3: "You agree to provide accurate information when submitting your RSVP and to use this website only for its intended purpose.",
            commercial: "No Commercial Use",
            p4: "This website and its messaging services are not used for advertising, marketing, or commercial purposes.",
            changes: "Changes to These Terms",
            p5: "We may update these Terms of Service if necessary. Continued use of the website constitutes acceptance of any updates.",
        },
        es: {
            terms: "Términos de Servicio",
            p1: "Al utilizar este sitio web, usted acepta los siguientes términos.",
            purpose: "Propósito del sitio web",
            p2: "Este sitio web está destinado a invitados para enviar su confirmación de asistencia (RSVP) a nuestra boda.",
            sms: "Comunicaciones por SMS",
            smsP1: "Nombre del programa: Fernando and Breanna Wedding SMS Updates.",
            smsP2: "Descripción del programa: los invitados que acepten pueden recibir confirmaciones de RSVP, recordatorios de la boda, actualizaciones del evento y mensajes de logística.",
            smsP3: "La frecuencia de mensajes varía, pero se espera que sea baja. Pueden aplicarse tarifas por mensajes y datos.",
            smsP4: "Responda STOP para cancelar la suscripción en cualquier momento. Responda HELP para obtener ayuda.",
            smsP5: "Los operadores no son responsables de mensajes demorados o no entregados.",
            smsP6: "El consentimiento para SMS es opcional y no es obligatorio para enviar su RSVP. Consulte nuestra Política de Privacidad para saber cómo se manejan la información móvil y el consentimiento de suscripción.",
            use: "Uso aceptable",
            p3: "Usted acepta proporcionar información precisa al enviar su confirmación de asistencia y utilizar este sitio web únicamente para su propósito previsto.",
            commercial: "Sin uso comercial",
            p4: "Este sitio web y sus servicios de mensajería no se utilizan con fines publicitarios, de marketing ni comerciales.",
            changes: "Cambios en estos términos",
            p5: "Podemos actualizar estos Términos de Servicio si es necesario. El uso continuo del sitio web constituye la aceptación de cualquier actualización.",
        },
    }
    
    return(
        <section className="min-h-screen bg-white px-6 pt-32 pb-24 text-black relative overflow-hidden">
            <img
            src="/images/bg-pastel.png"
            className="absolute inset-0 w-full h-full bg-cover opacity-80 z-0"
            />
            <div className="relative z-10 font-serif">
                <h1 className="text-center text-5xl md:text-5xl font-bold italic font-serif mb-4">
                    {termsText[language].terms}
                </h1>
                <p className="text-center text-sm">{termsText[language].p1}</p>
                <br></br>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {termsText[language].purpose}
                </h2>
                <p className="text-sm">{termsText[language].p2}</p>
                <br></br>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {termsText[language].sms}
                </h2>
                <p className="text-sm">{termsText[language].smsP1}</p>
                <p className="text-sm">{termsText[language].smsP2}</p>
                <p className="text-sm">{termsText[language].smsP3}</p>
                <p className="text-sm"><strong>{termsText[language].smsP4}</strong></p>
                <p className="text-sm">{termsText[language].smsP5}</p>
                <p className="text-sm">{termsText[language].smsP6}</p>
                <br></br>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {termsText[language].use}
                </h2>
                <p className="text-sm">{termsText[language].p3}</p><br></br>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {termsText[language].commercial}
                </h2>
                <p className="text-sm">{termsText[language].p4}</p><br></br>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {termsText[language].changes}
                </h2>
                <p className="text-sm">{termsText[language].p5}</p>
            </div>
        </section>
    )
}