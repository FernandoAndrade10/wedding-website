import { useLanguage } from "../context/LanguageContext"

export default function Privacy() {
    const { language } = useLanguage();
    const privacyText = {
        en: {
            h1: "Privacy Policy",
            p1: "This website is used to collect RSVP information for our wedding.",
            h2: "Information We Collect",
            p2: "When you submit an RSVP, we may collect:",
            l1: "Your name",
            l2: "Your phone number",
            l3: "Attendance and meal preferences (if applicable)",
            h3: "How We Use Your Information",
            p3: "Your information is used solely for:",
            l4: "Managing wedding RSVPs",
            l5: "Sending confirmation or reminder messages related to the event",
            sms: "SMS Messaging",
            smsP1: "If you opt in on the RSVP form, Fernando and Breanna Wedding may send SMS messages about your RSVP, wedding updates, reminders, or event logistics.",
            smsP2: "Message frequency varies, but is expected to be low and limited to wedding-related notifications.",
            smsP3: "Message and data rates may apply.",
            smsP4: "Reply STOP to unsubscribe or HELP for help.",
            dataSharing: "Data Sharing",
            p5: "We do not sell, rent, or share your personal information with third parties for marketing purposes. Mobile information and SMS opt-in consent are used only for wedding-related communications and will not be shared with third parties or affiliates for marketing or promotional purposes.",
            dataRetention: "Data Retention",
            p6: "Your information will be retained only as long as necessary for wedding planning purposes and will not be used after the event.",
            contact: "Contact",
            p7: "If you have questions about this Privacy Policy, please contact us through the website.",
        },
        es: {
            h1: "Política de Privacidad",
            p1: "Este sitio web se utiliza para recopilar información de confirmación de asistencia (RSVP) para nuestra boda.",
            h2: "Información que recopilamos",
            p2: "Cuando envía una confirmación de asistencia, podemos recopilar:",
            l1: "Su nombre",
            l2: "Su número de teléfono",
            l3: "Preferencias de asistencia y comida (si corresponde)",
            h3: "Cómo usamos su información",
            p3: "Su información se utiliza únicamente para:",
            l4: "Gestionar las confirmaciones de asistencia a la boda",
            l5: "Enviar mensajes de confirmación o recordatorios relacionados con el evento",
            sms: "Mensajes SMS",
            smsP1: "Si acepta en el formulario de RSVP, Fernando and Breanna Wedding puede enviarle mensajes SMS sobre su RSVP, actualizaciones de la boda, recordatorios o detalles del evento.",
            smsP2: "La frecuencia de mensajes varía, pero se espera que sea baja y limitada a notificaciones relacionadas con la boda.",
            smsP3: "Pueden aplicarse tarifas por mensajes y datos.",
            smsP4: "Responda STOP para cancelar la suscripción o HELP para obtener ayuda.",
            dataSharing: "Uso compartido de datos",
            p5: "No vendemos, alquilamos ni compartimos su información personal con terceros con fines de marketing. La información móvil y el consentimiento de suscripción a SMS se usan solo para comunicaciones relacionadas con la boda y no se compartirán con terceros ni afiliados con fines de marketing o promocionales.",
            dataRetention: "Retención de datos",
            p6: "Su información se conservará solo durante el tiempo necesario para la planificación de la boda y no se utilizará después del evento.",
            contact: "Contacto",
            p7: "Si tiene preguntas sobre esta Política de Privacidad, comuníquese con nosotros a través del sitio web.",
        },
    }

    return (
    <section className="min-h-screen bg-white px-6 pt-32 pb-24 text-black relative overflow-hidden">
        <img
            src="/images/bg-pastel.png"
            className="absolute inset-0 w-full h-full bg-cover opacity-80 z-0"
        />
        <div className="relative z-10 font-serif">
            <h1 className="text-center text-5xl md:text-5xl font-bold italic font-serif mb-4">
                {privacyText[language].h1}
            </h1>
            <p className="text-center text-sm">{privacyText[language].p1}</p>
            <br></br>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {privacyText[language].h2}
            </h2>
            <p className="text-sm mb-2">{privacyText[language].p2}</p>
            <div className="text-sm">
                <li>{privacyText[language].l1}</li>
                <li>{privacyText[language].l2}</li>
                <li>{privacyText[language].l3}</li>
            </div>
            <br></br>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {privacyText[language].h3}
            </h2>
            <p className="text-sm">{privacyText[language].p3}</p>
            <div className="text-sm">
                <li>{privacyText[language].l4}</li>
                <li>{privacyText[language].l5}</li>
            </div>
            <br></br>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {privacyText[language].sms}
            </h2>
            <div className="text-sm">
                <p>{privacyText[language].smsP1}</p>
                <p>{privacyText[language].smsP2}</p>
                <p>{privacyText[language].smsP3}</p>
                <p>{privacyText[language].smsP4}</p>
            </div>
            <br></br>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{privacyText[language].dataSharing}</h2>
            <p className="text-sm">{privacyText[language].p5}</p>
            <br></br>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{privacyText[language].dataRetention}</h2>
            <p className="text-sm">{privacyText[language].p6}</p>
            <br></br>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{privacyText[language].contact}</h2>
            <p className="text-sm">{privacyText[language].p7}</p>
        </div>
    </section>
    );
}