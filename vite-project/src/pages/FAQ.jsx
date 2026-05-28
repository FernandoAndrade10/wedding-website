// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
    const { language } = useLanguage();

    const faqText = {
        en: {
            title: 'FAQ',
            subtitle: 'Helpful details for planning your day with us',
            sections: [
                {
                    title: 'Wedding Day Basics',
                    items: [
                        { q: 'Will parking be available?', a: 'Yes. Parking will be available at the venue, and a traffic control attendant will guide you to the appropriate parking area upon arrival.' },
                        { q: 'What time should guests arrive?', a: 'Please arrive 20–30 minutes before the ceremony start time so everyone can be seated comfortably.' },
                        { q: 'Can I bring a plus-one or extra guests?', a: 'We can only accommodate guests named on the invitation/RSVP household list.' },
                        { q: 'Can guests take centerpieces home?', a: 'No. Our centerpieces are provided through the venue and cannot be taken home.' },
                    ],
                },
                {
                    title: 'Food, Bar & Timing',
                    items: [
                        { q: 'When does the bar open and close?', a: 'The bar opens at 5:30PM and closes about 15 minutes before event end (per venue policy).' },
                        { q: 'Will guests be carded at the bar?', a: 'Yes. Valid ID is required for alcohol service. Guests without valid proof of age cannot be served.' },
                        { q: 'Can guests bring their own alcohol?', a: 'Alcohol must be handled through the bar staff per venue policy. Bottles should not be kept at guest tables.' },
                    ],
                },
                {
                    title: 'Children Policy',
                    items: [
                        {
                            q: 'Are children invited?',
                            a: 'Please refer to your invitation for included names. If children are not listed, we kindly ask that this remain an adults-only celebration for your party.',
                        },
                    ],
                },
                {
                    title: 'Dress Expectations',
                    items: [
                        {
                            q: 'What is the dress code?',
                            a: 'Semi-formal attire in vibrant summer colors is encouraged. For full details and examples, please visit our Attire page.',
                        },
                        {
                            q: 'Are jeans or black attire allowed?',
                            a: 'As shared on the Attire page, we kindly ask guests to avoid jeans and all-black looks.',
                        },
                    ],
                },
            ],
        },
        es: {
            title: 'Preguntas Frecuentes',
            subtitle: 'Detalles útiles para planear este día con nosotros',
            sections: [
                {
                    title: 'Información Básica del Día',
                    items: [
                        { q: '¿Habrá estacionamiento disponible?', a: 'Sí. Habrá estacionamiento disponible en el lugar y una persona de control de tráfico les indicará dónde estacionarse al llegar.' },
                        { q: '¿A qué hora debemos llegar?', a: 'Por favor lleguen 20–30 minutos antes del inicio de la ceremonia para que todos puedan tomar asiento con calma.' },
                        { q: '¿Puedo llevar acompañante o invitados extra?', a: 'Solo podremos recibir a los invitados que aparecen en la invitación/lista de RSVP.' },
                        { q: '¿Los invitados pueden llevarse los centros de mesa?', a: 'No. Nuestros centros de mesa son proporcionados por el lugar y no se pueden llevar a casa.' },
                    ],
                },
                {
                    title: 'Comida, Barra y Horarios',
                    items: [
                        { q: '¿Cuándo abre y cierra la barra?', a: 'La barra abre a las 5:30PM y cierra unos 15 minutos antes de terminar el evento (según política del lugar).' },
                        { q: '¿Les pedirán identificación en la barra?', a: 'Sí. Se requiere identificación válida para servir alcohol. Invitados sin prueba de edad no podrán recibir servicio.' },
                        { q: '¿Se puede llevar alcohol propio?', a: 'El alcohol debe manejarse a través del personal de barra según la política del lugar. No debe quedarse en las mesas.' },
                    ],
                },
                {
                    title: 'Política de Niños',
                    items: [
                        {
                            q: '¿Están invitados los niños?',
                            a: 'Por favor revisa los nombres incluidos en tu invitación. Si no aparecen niños, les pedimos amablemente que su celebración sea solo para adultos en su grupo.',
                        },
                    ],
                },
                {
                    title: 'Código de Vestimenta',
                    items: [
                        {
                            q: '¿Cuál es el código de vestimenta?',
                            a: 'Se recomienda vestimenta semi-formal en colores veraniegos y vibrantes. Para más detalles y ejemplos, visita la página de Vestimenta.',
                        },
                        {
                            q: '¿Se permite mezclilla o ropa negra?',
                            a: 'Como se indica en la página de Vestimenta, les pedimos evitar mezclilla y atuendos completamente negros.',
                        },
                    ],
                },
            ],
        },
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <section className="min-h-screen bg-white pt-36 pb-24 px-6 relative overflow-hidden">
                <img
                    src="/images/bg-pastel.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
                />

                <div className="relative z-10 max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-5xl text-center font-bold font-serif text-mauve mb-3">
                        {faqText[language].title}
                    </h1>
                    <p className="text-center text-gray-700 mb-10">{faqText[language].subtitle}</p>

                    <div className="space-y-8">
                        {faqText[language].sections.map((section, sectionIndex) => (
                        <div
                            key={section.title}
                            className="bg-white/75 backdrop-blur-sm rounded-xl shadow-md border border-peach/20 p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-peach/30"
                            data-aos={sectionIndex % 2 === 0 ? 'fade-up' : 'fade-down'}
                            data-aos-duration="350"
                            data-aos-delay={Math.min(sectionIndex * 80, 320)}
                            data-aos-easing="ease-in-out"
                        >
                            <h2 className="text-2xl font-semibold text-mauve mb-4">{section.title}</h2>
                            <div className="space-y-4">
                                {section.items.map((item) => (
                                    <div key={item.q}>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.q}</h3>
                                        <p className="text-gray-700 mt-1 leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
}