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
      padrinosBodaLaso: "Wedding and Lasso Godparents",
      padrinosAras: "Coin Godparents",
      padrinosBibliaRosario: "Bible and Rosary Godparents",
      padrinosAnillosPastel: "Ring and Cake Godparents",
      padrinosCopas: "Cup Godparents",
      padrinosCojines: "Pillow Godparents",
      padrinosBrindis: "Toast Godparents",
      padrinosFotosVestido: "Photo and Dress Godparents",
      padrinosDj: "DJ Godparents",
      padrinosRecuerdosMisa: "Mass Souvenir Godparents",
      madrinaRamoNatural: "Natural Bouquet Godparent",
      padrinosRecuerdosSalon: "Reception Souvenir Godparents",
    },
    es: {
      title: "La Corte Nupcial",
      boldLetter: "N",
      p1: "os sentimos inmensamente bendecidos de estar rodeados por un grupo increíble de amigos y familiares.",
      p2: "Conoce a las personas que estarán a nuestro lado en este día tan especial.",
      padrinos: "Padrinos",
      padrinosBodaLaso: "Padrinos de Boda y Laso",
      padrinosAras: "Padrinos de Aras",
      padrinosBibliaRosario: "Padrinos de Biblia y Rosario",
      padrinosAnillosPastel: "Padrinos de Anillos y Pastel",
      padrinosCopas: "Padrinos de Copas",
      padrinosCojines: "Padrinos de Cojines",
      padrinosBrindis: "Padrinos de Brindis",
      padrinosFotosVestido: "Padrinos de Fotos y Vestido",
      padrinosDj: "Padrinos de DJ",
      padrinosRecuerdosMisa: "Padrinos de Recuerdos de Misa",
      madrinaRamoNatural: "Madrina de Ramo Natural",
      padrinosRecuerdosSalon: "Padrinos de Recuerdos de Salon",
    }
  }

  const padrinos = [
    { id: 1, name: 'Sal and Tania', bioKey: 'padrinosBodaLaso', image: '/images/padrinos4.jpg' },
    { id: 2, name: 'Francisco and Rosi', bioKey: 'padrinosAras', image: '/images/padrinos1.jpg' },
    { id: 3, name: 'Gerardo and Patricia', bioKey: 'padrinosBibliaRosario', image: '/images/placeholder3.jpg' },
    { id: 4, name: 'Joel and Araceli', bioKey: 'padrinosAnillosPastel', image: '/images/placeholder4.jpg' },
    { id: 5, name: 'Jorge and Claudia', bioKey: 'padrinosCopas', image: '/images/padrinos3.jpg' },
    { id: 6, name: 'Marta and Tony', bioKey: 'padrinosCojines', image: '/images/placeholder2.jpg' },
    { id: 7, name: 'Maria and Patricio', bioKey: 'padrinosBrindis', image: '/images/placeholder1.jpg' },
    { id: 8, name: 'Sergio and Arcadia', bioKey: 'padrinosFotosVestido', image: '/images/padrinos2.jpg' },
    { id: 9, name: 'Denise and Abraham', bioKey: 'padrinosDj', image: '/images/padrinos7.jpg' },
    { id: 10, name: 'Armida and Manny', bioKey: 'padrinosRecuerdosMisa', image: '/images/placeholder4.jpg' },
    { id: 11, name: 'Conchis', bioKey: 'madrinaRamoNatural', image: '/images/placeholder3.jpg' },
    { id: 12, name: 'Marlene and Marcos', bioKey: 'padrinosRecuerdosSalon', image: '/images/padrinos5.jpg' },
  ];

  const groomsmen = [
    { id: 1, name: 'Marcos', image: '/images/marcos.jpg' },
    { id: 2, name: 'Carlos', image: '/images/Carlos.jpg' },
    { id: 3, name: 'Tony', image: '/images/placeholder3.jpg' },
    { id: 4, name: 'Jonathan', image: '/images/placeholder4.jpg' },
    { id: 5, name: 'Dante', image: '/images/placeholder1.jpg' },
    { id: 6, name: 'Matthew', image: '/images/matthew.jpg' },
    { id: 7, name: 'Anthony', image: '/images/placeholder3.jpg' },
    { id: 8, name: 'Dereck', image: '/images/placeholder4.jpg' },
    { id: 9, name: 'Andres', image: '/images/Andres.jpg' },
    { id: 10, name: 'Aaron', image: '/images/aaron.jpg' },
  ];

  const cardAnimations  = ['flip-left', 'flip-right', 'zoom-in', 'fade-up'];

  const bridesmaids = [
    { id: 1, name: 'Natalie' , image: '/images/nat.jpg' },
    { id: 2, name: 'Clarissa', image: '/images/clarissa.jpg' },
    { id: 3, name: 'Ellenie', image: '/images/ellenie.jpg' },
    { id: 4, name: 'Janet', image: '/images/janet.jpg' },
    { id: 5, name: 'Gabby', image: '/images/gabby.jpg' },
    { id: 6, name: 'Kenia', image: '/images/kenia.jpg' },
    { id: 7, name: 'Marlene', image: '/images/marlene.png' },
    { id: 8, name: 'Violet', image: '/images/violet.jpg' },
    { id: 9, name: 'Julissa', image: '/images/juli.jpg' },
    { id: 10, name: 'Sofia', image: '/images/sofia.jpg' },
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
            data-aos-duration="300"
            data-aos-easing="ease-in-out"
          >
            {partyText[language].title}
          </h1>
          <p className="relative pt-6 text-center text-gray-700 text-lg mx-auto"
            data-aos="fade-down" 
            data-aos-delay="100"
            data-aos-duration="300"
            data-aos-easing="ease-in-out"
          >
            <span className="text-peach font-bold text-3xl">{partyText[language].boldLetter}</span>{partyText[language].p1} <br /> {partyText[language].p2}
          </p>
          <hr className="relative rounded-full bg-mauve w-80 h-1 mx-auto mt-6"/>

          {/* Padrinos */}
          <div className="relative text-mauve text-center mt-12">
            <h2 className=" font-semibold text-3xl pb-12" 
              data-aos="fade-down" 
              data-aos-duration="300"
              data-aos-easing="ease-in-out"
            >
              {partyText[language].padrinos}
            </h2>

            {/* Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mx-auto"
              data-aos="zoom-in"
              data-aos-duration="100"
              data-aos-easing="ease-in-out"
            >
              {padrinos.map((p, i) => (
                <WeddingPartyCard 
                  key={p.id}
                  name={p.name}
                  bio={partyText[language][p.bioKey]}
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
            data-aos-delay="50"
            data-aos-duration="150"
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
              data-aos-delay="50" 
              data-aos-duration="20s0"
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
  