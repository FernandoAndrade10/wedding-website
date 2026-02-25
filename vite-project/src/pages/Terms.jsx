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
            smsP1: "By providing your phone number and submitting the RSVP form, you consent to receive SMS messages related to your RSVP and wedding details.",
            smsP2: "Message frequency is limited.",
            smsP3: "Message and data rates may apply.",
            smsP4: "Reply STOP to opt out at any time.",
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
            smsP1: "Al proporcionar su número de teléfono y enviar el formulario de confirmación de asistencia, usted acepta recibir mensajes SMS relacionados con su RSVP y detalles de la boda.",
            smsP2: "La frecuencia de los mensajes es limitada.",
            smsP3: "Pueden aplicarse tarifas por mensajes y datos.",
            smsP4: "Responda STOP para cancelar la suscripción en cualquier momento.",
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
                <p className="text-sm">{termsText[language].smsP4}</p>
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