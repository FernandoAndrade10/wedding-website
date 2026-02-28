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
            title: 'Parking & Transportation',
            items: [
                {
                    q: 'Will parking be available?',
                    a: 'Yes. Complimentary valet parking will be available at the reception venue. Rideshare options like Uber and Lyft are also recommended.',
                },
                {
                    q: 'Should we plan extra travel time?',
                    a: 'Yes, especially if traveling between ceremony and reception. Please allow extra time for traffic and parking drop-off.',
                },
            ],
            },
            {
            title: 'Arrival Window',
            items: [
                {
                    q: 'What time should guests arrive?',
                    a: 'Please arrive 20–30 minutes before the ceremony start time so everyone can be seated comfortably.',
                },
                {
                    q: 'What if we arrive late?',
                    a: 'Out of respect for the ceremony, late seating may be limited until an appropriate moment.',
                },
            ],
            },
            {
            title: 'Plus-Ones & Invitations',
            items: [
                {
                    q: 'Can I bring a plus-one?',
                    a: 'We can only accommodate guests named on the invitation. If you are unsure, please reach out to us directly.',
                },
                {
                    q: 'Can I bring additional family members?',
                    a: 'Please follow the guest count reflected in your invitation/RSVP household list so we can plan seating and meals accurately.',
                },
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
            title: 'Estacionamiento y Transporte',
            items: [
                {
                    q: '¿Habrá estacionamiento disponible?',
                    a: 'Sí. Habrá valet parking de cortesía en la recepción. También recomendamos usar aplicaciones como Uber o Lyft.',
                },
                {
                    q: '¿Debemos considerar tiempo extra de traslado?',
                    a: 'Sí, especialmente si viajarán entre ceremonia y recepción. Consideren tiempo adicional por tráfico y acceso al lugar.',
                },
            ],
            },
            {
            title: 'Horario de Llegada',
            items: [
                {
                    q: '¿A qué hora debemos llegar?',
                    a: 'Por favor lleguen 20–30 minutos antes del inicio de la ceremonia para que todos puedan tomar asiento con calma.',
                },
                {
                    q: '¿Qué pasa si llegamos tarde?',
                    a: 'Por respeto a la ceremonia, el acceso al asiento podría ser limitado hasta un momento adecuado.',
                },
            ],
            },
            {
            title: 'Acompañantes e Invitaciones',
            items: [
                {
                    q: '¿Puedo llevar acompañante?',
                    a: 'Solo podremos recibir a los invitados que aparecen en la invitación. Si tienes duda, por favor contáctanos directamente.',
                },
                {
                    q: '¿Puedo llevar familiares adicionales?',
                    a: 'Por favor respeta el número de invitados reflejado en tu invitación/lista de RSVP para planear asientos y alimentos correctamente.',
                },
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
                {faqText[language].sections.map((section) => (
                <div key={section.title} className="bg-white/75 backdrop-blur-sm rounded-xl shadow-md border border-peach/20 p-6">
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