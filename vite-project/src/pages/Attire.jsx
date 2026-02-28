// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Attire() {
  const { language } = useLanguage();
  const attireText = {
    en: {
      title: "Dress Attire",
      boldLetter: "W",
      p1: "e kindly invite guests to dress in ",
      italicP1: "fun, vibrant summer colors",
      endP1: " — elegant, semi-formal looks that are comfortable and celebration-ready.",
      p2: "Think flowy dresses, dressy jumpsuits, linen suits, or button-down shirts in cheerful hues. Bright florals, pastels, and warm tones are perfect for celebrating under the sun.",
      picCaption: "Kindly note that jeans and black attire are not permitted.",
    },
    es: {
      title: "Código de Vestimenta",
      boldLetter: "L",
      p1: "os invitamos cordialmente a vestir con ",
      italicP1: "colores veraniegos alegres y vibrantes",
      endP1: " — atuendos elegantes y semi-formales que sean cómodos y perfectos para celebrar.",
      p2: "Piensa en vestidos fluidos, jumpsuits elegantes, trajes de lino o camisas de vestir en tonos alegres. Los estampados florales, los colores pasteles y las tonalidades cálidas son perfectos para celebrar bajo el sol.",
      picCaption: "Por favor, ten en cuenta que no se permite el uso de mezclilla ni ropa de color negro.",
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0, y: -20}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <section className="min-h-screen bg-white px-6 pt-8 pb-24 text-mauve relative overflow-hidden">
        <img
          src="/images/bg-pastel.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
        />
        {/* Top Floral Divider */}
        <img
          src="/images/floral divider.png"
          alt="Floral Top"
          className="mt-20 mx-auto w-48 opacity-40"
          data-aos="fade-down"
          data-aos-delay="50"
        />
      
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-wide" data-aos="fade-down" data-aos-delay="100" >
            {attireText[language].title}
          </h1>
          <div className="w-20 h-1 bg-peach mx-auto rounded-full mb-8" data-aos="fade-down" data-aos-delay="200" />
          <p className="text-lg md:text-xl leading-loose mb-12 max-w-3xl mx-auto text-gray-700 text-justify" data-aos="fade-down" data-aos-delay="300">
            <span className="float-left text-5xl font-serif font-bold text-peach leading-none mr-2">{attireText[language].boldLetter}</span>
            {attireText[language].p1} <span className="italic text-sage font-extrabold text-lg">{attireText[language].italicP1}</span> {attireText[language].endP1}
            <br /><br />
            {attireText[language].p2}
          </p>
          {/* Color Palette */}
          <div className="mb-12" data-aos="zoom-in" data-aos-delay="350">
            <p className="text-md text-rust font-bold italic mt-2" data-aos="fade-down" data-aos-delay="350">
              {attireText[language].picCaption}
            </p>
            <img
              src="/images/color-palette.jpg"
              alt="Guest Color Palette"
              className="mx-auto w-full sm:max-w-lg h-auto max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
        {/* Bottom Floral Divider */}
        <img
          loading="lazy"
          src="/images/floral divider.png"
          alt="Floral Bottom"
          className="mt-16 mx-auto w-48 opacity-40"
          data-aos="fade-up"
          data-aos-delay="500"
        />
      </section>
    </motion.div>
  );
}
