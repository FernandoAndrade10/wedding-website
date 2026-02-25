import background from '/images/hero-bg.jpg';
import scrollIcon from '../assets/images/scroll-down-rust2.svg';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { language } = useLanguage();
  const heroText = {
    en: {
      title: "We're getting married!",
      button: "RSVP Now",
    },
    es: {
      title: "¡Estamos por casarnos!",
      button: "Confirmar mi asistencia",
    }
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <img
        src={background}
        alt="Wedding background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent -z-10" />

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-white" data-aos="fade-down">
          Fernando & Breanna
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-white" data-aos="fade-in" data-aos-delay="200">
          {heroText[language].title}
        </p>
        <Link
          to="/rsvp"
          className="inline-block bg-peach text-white font-semibold py-3 px-6 rounded-md hover:bg-peach/90 transition-colors"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {heroText[language].button}
        </Link>
      </div>

      {/* Scroll Icon */}
      <div className="text-rust absolute bottom-24 md:bottom-6 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#next" className="animate-pulse" aria-label='Scroll to next section'>
          <img src={scrollIcon} alt="scroll" className="h-20" />
        </a>
      </div>
    </section>
  );
}
