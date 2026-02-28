import Hero from "../components/Hero";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaMapMarkedAlt, FaClock, FaGift, FaTshirt } from "react-icons/fa";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const homeText = {
    en: {
      story: "Our Story",
      p1: "Our story began at work, where a natural connection revealed the compatibility that now defines our relationship. From our first date to this very moment, we have shared laughter, growth, and unwavering support, each chapter bringing us closer and enriching the love we cherish today.",
      p2: "Now, we’re excited to begin this new chapter as husband and wife — and we cannot wait to celebrate this moment with you.",
      wedding_details: "Wedding Day Details",
      p3: "We can't wait to celebrate our special day with you. Here's everything you need to know!",
      location: "Location",
      ceremony: "Ceremony",
      reception: "Reception",
      location_link: "View directions and venue information.",
      time: "Time",
      ceremony_time: "Ceremony begins at 12:30 PM",
      reception_time: "Reception to follow at 5:30 PM",
      faq: "View FAQ",
      dress: "Dress Code",
      dress_details: "Garden formal attire is requested.",
      dress_details2: "Please avoid white and overly casual clothing.",
      dress_link: "View outfit inspiration.",
      gifts: "Gifts",
      gift_details: "Your presence is the greatest gift.",
      gift_link: "View our gift preferences.",
    },
    es: {
      story: "Nuestra Estoria",
      p1: "Nuestra historia comenzó en el trabajo, donde una conexión natural reveló la compatibilidad que hoy define nuestra relación. Desde nuestra primera cita hasta este momento, hemos compartido risas, crecimiento y un apoyo inquebrantable; cada capítulo nos ha acercado más y ha enriquecido el amor que atesoramos hoy.",
      p2: "Ahora, estamos emocionados de comenzar este nuevo capítulo como esposo y esposa — y no podemos esperar para celebrar este momento contigo",
      wedding_details: "Detalles del Día de la Boda",
      p3: "Estamos muy emocionados de celebrar este día tan especial contigo. Aquí encontrarás toda la información que necesitas.",
      location: "Ubicación",
      ceremony: "Ceremonia",
      reception: "Recepción",
      location_link: "Ver direcciones e información del lugar.",
      time: "Tiempo",
      ceremony_time: "La ceremonia comienza a las 12:30 PM",
      reception_time: "La celebración de la recepción es a las 5:30 PM",
      faq: "Ver las preguntas frecuentes",
      dress: "Código de Vestimenta",
      dress_details: "Se solicita vestimenta garden formal.",
      dress_details2: "Por favor evita el color blanco y la ropa demasiado casual.",
      dress_link: "Ver inspiración de atuendos.",
      gifts: "Regalos",
      gift_details: "Tu presencia es el mejor regalo.",
      gift_link: "Ver nuestras preferencias de regalos.",
    }
  }
  return (
    <>
      <Hero />

      <motion.div
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: -20}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Our Story */}
        <section
          id="next"
          className="bg-peach/10 text-mauve py-20 px-6 flex flex-col md:flex-row items-center gap-10"
        >
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 " data-aos="fade-up">
              {homeText[language].story}
            </h2>
            <p
              className="max-w-2xl text-lg leading-relaxed mx-auto"
              data-aos="fade-in"
              data-aos-delay="600"
              >
              {homeText[language].p1}
              <br className="hidden md:block" />
              <br />
              {homeText[language].p2}
            </p>
          </div>
          {/* Carousel */}
          <div className="w-full md:w-2/3 lg:w-1/2" data-aos="slide-right" data-aos-delay="800" data-aos-once="true">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={6000}
              className="rounded-xl shadow-lg overflow-hidden"
            >
              <div>
                <img src="/images/Our Story 1.jpg" alt="Memory 1" data-aos="slide-right" data-aos-delay="800"/>
              </div>
              <div>
                <img src="/images/Our Story 2.jpg" alt="Memory 2" />
              </div>
              <div>
                <img src="/images/Our Story 3.jpg" alt="Memory 3" />
              </div>
              <div>
                <img src="/images/Our Story 4.jpg" alt="Memory 4" />
              </div>
              <div>
                <img src="/images/Our Story 5.jpg" alt="Memory 5" />
              </div>
              <div>
                <img src="/images/Gallery8.JPG" alt="Memory 6" />
              </div>
            </Carousel>
          </div>
          {/* Divider */}
          <div className="my-6">
            <img
              src="/images/floral divider.png"
              alt="Floral Divider"
              className="w-40 mx-auto opacity-70"
              data-aos="slide-up"
            />
          </div>
        </section>
        {/* Event Details */}
        <section id="details" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-mauve mb-6">
              {homeText[language].wedding_details}
            </h2>
            <p className="text-lg text-gray-700 mb-10">
              {homeText[language].p3}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
              {/* Venue */}
              <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="100">
                <FaMapMarkedAlt className="text-mauve w-6 h- mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {homeText[language].location}
                  </h3>
                  <p className="text-gray-600">
                    <em className="text-sage font-semibold text-lg">{homeText[language].ceremony}</em><br />
                    St. Helen Catholic Church <br />
                    3170 Firestone Blvd, <br />South Gate, CA 90280<br /> <br />
                    <em className="text-sage font-semibold text-lg">{homeText[language].reception}</em><br/>
                    SGV Event Center - Louisiana Room <br />
                    15900 Old Valley Blvd, <br /> La Puente, CA 91744 <br />
                    <Link to="/location" className="text-peach underline hover:text-peach/80">
                      {homeText[language].location_link}
                    </Link>
                  </p>
                </div>
              </div>
              {/* Time */}
              <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="200">
                <FaClock className="text-mauve w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {homeText[language].time}
                  </h3>
                  <p className="text-gray-600">
                    {homeText[language].ceremony_time}<br /> {homeText[language].reception_time}
                  </p>
                  <Link to="/faq" className="text-peach underline hover:text-peach/80">
                      {homeText[language].faq}
                  </Link>
                </div>
              </div>
              {/* Dress Code */}
              <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="300">
                <FaTshirt className="text-mauve w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{homeText[language].dress}</h3>
                  <p className="text-gray-600">
                    {homeText[language].dress_details} <br /> {homeText[language].dress_details2} <br />
                    <Link to="/attire" className="text-peach underline hover:text-peach/80">
                      {homeText[language].dress_link}
                    </Link>
                  </p>
                </div>
              </div>
              {/* Gifts */}
              <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="400">
                <FaGift className="text-mauve w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{homeText[language].gifts}</h3>
                  <p className="text-gray-600">
                    {homeText[language].gift_details} <br />
                    <Link to="/gifts" className="text-peach underline hover:text-peach/80">
                      {homeText[language].gift_link}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
  
