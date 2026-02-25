import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLanguage } from '../context/LanguageContext';

const images = [
  { src: '/images/gallery1.JPG', aspect: "tall" },
  { src: '/images/Gallery2.JPG', aspect: "tall" },
  { src: '/images/Gallery4.JPG', aspect: "tall" },
  { src: '/images/Gallery5.JPG', aspect: "tall" },
  { src: '/images/Gallery6.JPG', aspect: "tall" },
  { src: '/images/Gallery13.JPG', aspect: "tall" },
  { src: '/images/Gallery9.JPG', aspect: "tall" },
  { src: '/images/Gallery7.JPG', aspect: "wide" },
  { src: '/images/Gallery12.JPG', aspect: "wide" },
  { src: '/images/Gallery10.JPG', aspect: "wide" },
  { src: '/images/Gallery11.JPG', aspect: "wide" },
  { src: '/images/Gallery14.JPG', aspect: "wide" },
  { src: '/images/Gallery3.JPG', aspect: "wide" },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { language } = useLanguage();
  const galleryText = {
    en: {
      title: "Gallery",
    },
    es: {
      title: "Galería",
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0, y: -20}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <section className=" relative w-full min-h-screen bg-white pt-40 pb-20 px-6">
        <img
          src='/images/bg-pastel.png'
          className='absolute inset-0 w-full h-full object-cover opacity-80 z-0'
        />
        <div className='relative z-10'>
          <h2 className=" relative text-4xl text-center font-serif font-bold text-mauve mb-10" data-aos="fade-down">
            {galleryText[language].title}
          </h2>
          {/* Image Grid */}
          <div className='max-w-6xl mx-auto bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md'>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {images.map((image, i) => (
                <img
                  loading='lazy'
                  key={i}
                  src={image.src}
                  alt={`Gallery ${i + 1}`}
                  className="rounded-lg shadow-md cursor-pointer hover:opacity-80 transition"
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={images}
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

  