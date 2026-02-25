// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import WeddingPartyCard from "../components/WeddingPartyCard";
import { useLanguage } from "../context/LanguageContext";





export default function About() {
  const { language } = useLanguage();
  const partyText = {
    en: {
      title: "The Wedding Party",
      boldLetter: "W",
      p1: "e are beyond blessed to be surrounded by an incredible group of friends and family.",
      p2: "Meet the people who will be standing beside us on our big day.",
      padrinos: "Godparents",
      groomsmen: "Groomsmen",
      bridesmaids: "Bridesmaids",
      cousin: "Grooms Cousin",
      broGroom: "Grooms Brother",
      broBride: "Brides Brother",
      friendFemale: "Friend",
      friendMale: "Friend",
      sisBride: "Brides Sister"
    },
    es: {
      title: "La Corte Nupcial",
      boldLetter: "N",
      p1: "os sentimos inmensamente bendecidos de estar rodeados por un grupo increíble de amigos y familiares.",
      p2: "Conoce a las personas que estarán a nuestro lado en este día tan especial.",
      padrinos: "Padrinos",
      groomsmen: "Caballeros de Honor",
      bridesmaids: "Damas de Honor",
      cousin: "Primo del Novio",
      broGroom: "Hermano del Novio",
      broBride: "Hermano de la Novia",
      friendFemale: "Amiga",
      friendMale: "Amigo",
      sisBride: "Hermana de la Novia",
    }
  }

  const padrinos = [
    { id: 1, name: 'Tio Sal and Tia Tania', bio: 'Padrinos de Boda', image: '/images/placeholder1.jpg' },
    { id: 2, name: 'Tio and Tia', bio: 'Padrinos de Lazo', image: '/images/placeholder2.jpg' },
    { id: 3, name: 'Tio and Tia', bio: 'Padrinos de Anillos', image: '/images/placeholder3.jpg' },
    { id: 4, name: 'Tio and Tia', bio: 'Padrinos de Arras', image: '/images/placeholder4.jpg' },
    { id: 5, name: 'Tio and Tia', bio: 'Padrinos de Ramo', image: '/images/placeholder3.jpg' },
    { id: 6, name: 'Tio and Tia', bio: 'Padrinos de Biblia y Rosario', image: '/images/placeholder2.jpg' },
  ];

  const groomsmen = [
    { id: 1, name: 'Marcos', bio: partyText[language].cousin, image: '/images/placeholder1.jpg' },
    { id: 2, name: 'Carlos', bio: partyText[language].cousin, image: '/images/placeholder2.jpg' },
    { id: 3, name: 'Tony', bio: partyText[language].broGroom, image: '/images/placeholder3.jpg' },
    { id: 4, name: 'Jonathan', bio: partyText[language].broGroom, image: '/images/placeholder4.jpg' },
    { id: 5, name: 'Dante', bio: partyText[language].broBride, image: '/images/placeholder1.jpg' },
    { id: 6, name: 'Matthew', bio: partyText[language].broBride, image: '/images/placeholder2.jpg' },
    { id: 7, name: 'Chris', bio: partyText[language].friendMale, image: '/images/placeholder3.jpg' },
    { id: 8, name: 'Dereck', bio: partyText[language].friendMale, image: '/images/placeholder4.jpg' },
  ];

  const cardAnimations  = ['flip-left', 'flip-right', 'zoom-in', 'fade-up'];

  const bridesmaids = [
    { id: 1, name: 'Natalie' , bio: 'Sister', image: '/images/placeholder1.jpg' },
    { id: 2, name: 'Clarissa', bio: 'Sister', image: '/images/placeholder2.jpg' },
    { id: 3, name: 'Anna', bio: 'Friend', image: '/images/placeholder3.jpg' },
    { id: 4, name: 'Janet', bio: 'Friend', image: '/images/placeholder4.jpg' },
    { id: 5, name: 'Gabby', bio: 'Friend', image: '/images/placeholder1.jpg' },
    { id: 6, name: 'Kenia', bio: 'Sister-In-Law', image: '/images/placeholder2.jpg' },
  ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: -20}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <section className="relative min-h-screen px-6 pt-8 pb-24">
          <img 
            src="/images/bg-pastel.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
          />

          {/* Title */}
          <h1 className="relative font-serif font-semibold pt-32 text-center text-mauve text-5xl"
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
          >
            {partyText[language].title}
          </h1>
          <p className="relative pt-6 text-center text-gray-700 text-lg mx-auto"
            data-aos="fade-down" 
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
          >
            <span className="text-peach font-bold text-3xl">{partyText[language].boldLetter}</span>{partyText[language].p1} <br /> {partyText[language].p2}
          </p>
          <hr className="relative rounded-full bg-mauve w-80 h-1 mx-auto mt-6"/>

          {/* Padrinos */}
          <div className="relative text-mauve text-center mt-12">
            <h2 className=" font-semibold text-3xl pb-12" 
              data-aos="fade-down" 
              data-aos-delay="200"
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
            >
              {partyText[language].padrinos}
            </h2>

            {/* Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mx-auto"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
            >
              {padrinos.map((p, i) => (
                <WeddingPartyCard 
                  key={p.id}
                  name={p.name}
                  bio={p.bio}
                  image={p.image}
                  delay={i * 150 + 100}
                  animation={cardAnimations[i % cardAnimations.length]}
                />
              ))}
            </div>
            <hr className="relative rounded-full bg-mauve w-80 h-1 mx-auto mt-8"/>
          </div>

          {/* Groomsmen */}
          <div className="relative text-center mt-12 text-mauve" 
            data-aos="fade-up" 
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
          >
            <h2 className="font-semibold text-3xl pb-12">
              {partyText[language].groomsmen}
            </h2>

            {/* Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto px-4"
              data-aos="fade-down"
            >
              {groomsmen.map((g, i) => (
                <WeddingPartyCard 
                  key={g.id}
                  name={g.name}
                  bio={g.bio}
                  image={g.image}
                  delay={i * 150 + 100}
                  animation={cardAnimations[i % cardAnimations.length]}
                />
              ))}
            </div>
            <hr className="relative rounded-full bg-mauve w-80 h-1 mx-auto mt-8"/>

            {/* Bridesmaids */}
            <div className="relative text-center mt-12 text-mauve" 
              data-aos="fade-down" 
              data-aos-delay="400" 
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
            >
              <h2 className="font-semibold text-3xl pb-12">
                {partyText[language].bridesmaids}
              </h2>

              {/* Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto px-4">
                {bridesmaids.map((b, i) => (
                  <WeddingPartyCard
                    key={b.id}
                    name={b.name}
                    bio={b.bio}
                    image={b.image}
                    delay={i * 150 + 100}
                    animation={cardAnimations[i % cardAnimations.length]}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    );
  }
  