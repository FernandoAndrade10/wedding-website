import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLanguage } from '../context/LanguageContext';

const staticImages = [
  { src: '/images/gallery1.JPG' },
  { src: '/images/Gallery2.JPG' },
  { src: '/images/Gallery4.JPG' },
  { src: '/images/Gallery5.JPG' },
  { src: '/images/Gallery6.JPG' },
  { src: '/images/Gallery13.JPG' },
  { src: '/images/Gallery9.JPG' },
  { src: '/images/Gallery7.JPG' },
  { src: '/images/Gallery12.JPG' },
  { src: '/images/Gallery10.JPG' },
  { src: '/images/Gallery11.JPG' },
  { src: '/images/Gallery14.JPG' },
  { src: '/images/Gallery3.JPG' },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { language } = useLanguage();
  const galleryText = {
    en: {
      title: "Gallery",
      subtitle: "A peek into our favorite memories so far ✨",
    },
    es: {
      title: "Galería",
      subtitle: "Un vistazo a nuestros recuerdos favoritos hasta ahora ✨",
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0, y: -20}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <section className="relative w-full min-h-screen bg-white pt-40 pb-20 px-6">
        <img
          src='/images/bg-pastel.png'
          className='absolute inset-0 w-full h-full object-cover opacity-80 z-0'
          alt=""
          aria-hidden="true"
        />
        <div className='relative z-10'>
          <h2 className="relative text-4xl text-center font-serif font-bold text-mauve mb-4" data-aos="fade-down">
            {galleryText[language].title}
          </h2>
          {/* Image Grid */}
          <p className="text-center text-gray-700 mb-10" data-aos="fade-down" data-aos-delay="100">
            {galleryText[language].subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {staticImages.map((image, i) => (
                <button
                  type="button"
                  key={`${image.src}-${i}`}
                  className="text-left group block transform transition duration-300 hover:-translate-y-1"
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                >
                  <img
                    loading='lazy'
                    src={image.src}
                    alt={`Gallery ${i + 1}`}
                    className="rounded-lg shadow-md cursor-pointer group-hover:opacity-85 transition duration-300 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-peach/40"
                  />
                </button>
              ))}
          </div>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={staticImages}
            index={index}
            on={{
              view: ({ index: current }) => setIndex(current),
            }}
            plugins={[Thumbnails]}
          />
        </div>
      </section>
    </motion.div>
  );
}