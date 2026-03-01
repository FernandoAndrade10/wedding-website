import { useEffect, useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-toastify';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('FILE_READ_FAILED'));
    reader.readAsDataURL(file);
  });
}

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [guestUploads, setGuestUploads] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { language } = useLanguage();
  const galleryText = {
    en: {
      title: "Gallery",
      subtitle: "A peek into our favorite memories so far ✨",
      uploadTitle: "Share your wedding-day photos",
      uploadDesc: "On wedding day, guests can upload pictures here so everyone can relive the memories.",
      yourName: "Your name",
      yourNamePlaceholder: "Enter your name",
      choosePhoto: "Choose a photo",
      uploadBtn: "Upload photo",
      uploadedBy: "Uploaded by",
      uploadSuccess: "Photo uploaded! Thank you for sharing 💕",
      uploadErrors: {
        nameRequired: "Please enter your name.",
        fileRequired: "Please choose a photo first.",
        fileType: "Only JPG, PNG, HEIC, or WEBP images are allowed.",
        fileSize: "Please use an image smaller than 5MB.",
        general: "Upload failed. Please try again.",
      },
    },
    es: {
      title: "Galería",
      subtitle: "Un vistazo a nuestros recuerdos favoritos hasta ahora ✨",
      uploadTitle: "Comparte tus fotos del día de la boda",
      uploadDesc: "El día de la boda, los invitados pueden subir fotos aquí para que todos revivamos esos momentos.",
      yourName: "Tu nombre",
      yourNamePlaceholder: "Escribe tu nombre",
      choosePhoto: "Elige una foto",
      uploadBtn: "Subir foto",
      uploadedBy: "Subido por",
      uploadSuccess: "¡Foto subida! Gracias por compartir 💕",
      uploadErrors: {
        nameRequired: "Por favor escribe tu nombre.",
        fileRequired: "Por favor elige una foto primero.",
        fileType: "Solo se permiten imágenes JPG, PNG, HEIC o WEBP.",
        fileSize: "Por favor usa una imagen menor a 5MB.",
        general: "No se pudo subir la foto. Inténtalo de nuevo.",
      },
    }
  };

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadGuestUploads = async () => {
      if (!API_URL) return;

      try {
        const res = await fetch(`${API_URL}/api/gallery-uploads`);
        if (!res.ok) return;

        const data = await res.json();
        setGuestUploads(Array.isArray(data.uploads) ? data.uploads : []);
      } catch {
        // Keep gallery usable even if upload API is unavailable.
      }
    };

    loadGuestUploads();
  }, [API_URL]);

  const allSlides = useMemo(() => {
    const uploadedSlides = guestUploads.map((upload) => ({
      src: upload.imageDataUrl,
      guestName: upload.guestName,
      uploaded: true,
    }));

    return [...uploadedSlides, ...staticImages];
  }, [guestUploads]);

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!guestName.trim()) {
      toast.error(galleryText[language].uploadErrors.nameRequired);
      return;
    }

    if (!selectedFile) {
      toast.error(galleryText[language].uploadErrors.fileRequired);
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(selectedFile.type)) {
      toast.error(galleryText[language].uploadErrors.fileType);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error(galleryText[language].uploadErrors.fileSize);
      return;
    }

    if (!API_URL) {
      toast.error(galleryText[language].uploadErrors.general);
      return;
    }

    setIsSubmitting(true);

    try {
      const imageDataUrl = await fileToDataUrl(selectedFile);

      const res = await fetch(`${API_URL}/api/gallery-uploads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName.trim(),
          imageDataUrl,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.upload) {
        throw new Error('UPLOAD_FAILED');
      }

      setGuestUploads((prev) => [data.upload, ...prev]);
      setGuestName('');
      setSelectedFile(null);
      event.target.reset();
      toast.success(galleryText[language].uploadSuccess);
    } catch {
      toast.error(galleryText[language].uploadErrors.general);
    } finally {
      setIsSubmitting(false);
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

          <div className="max-w-3xl mx-auto mb-10 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-peach/30" data-aos="fade-up">
            <h3 className="text-2xl font-serif font-bold text-mauve mb-2">{galleryText[language].uploadTitle}</h3>
            <p className="text-gray-700 mb-4">{galleryText[language].uploadDesc}</p>

            <form onSubmit={handleUpload} className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <label className="flex flex-col text-sm text-gray-700">
                {galleryText[language].yourName}
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={galleryText[language].yourNamePlaceholder}
                  className="mt-1 rounded-md border border-gray-300 px-3 py-2 bg-white"
                  maxLength={80}
                />
              </label>

              <label className="flex flex-col text-sm text-gray-700">
                {galleryText[language].choosePhoto}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="mt-1 rounded-md border border-gray-300 px-3 py-2 bg-white"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-mauve text-white px-4 py-2 font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {galleryText[language].uploadBtn}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {allSlides.map((image, i) => (
                <button
                  type="button"
                  key={`${image.src}-${i}`}
                  className="text-left group"
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                >
                  <img
                    loading='lazy'
                    src={image.src}
                    alt={`Gallery ${i + 1}`}
                    className="rounded-lg shadow-md cursor-pointer group-hover:opacity-80 transition"
                  />
                  {image.uploaded && (
                    <p className="mt-2 text-xs text-gray-700">
                      {galleryText[language].uploadedBy}: <span className="font-semibold">{image.guestName}</span>
                    </p>
                  )}
                </button>
              ))}
          </div>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={allSlides}
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