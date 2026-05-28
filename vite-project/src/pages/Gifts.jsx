// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

export default function Gifts() {
  const { language } = useLanguage();
  const zelleNumber = "(562)206-4185";

  const handleCopyZelle = () => {
    const trimmedNumber = zelleNumber.replace(/\D/g, "");
    navigator.clipboard.writeText(trimmedNumber);
    toast.success("Copied!");
  };
  const giftsText = {
    en: {
      title: "Gifts",
      p1: "Your presence is truly the best gift we could ask for.",
      p2: "If you'd like to bless us with something extra, cash gifts are kindly appreciated to help us start this next chapter 💌",
      p3: "Cash gifts can be given at the wedding",
      p4: "We'll have a card box set up at the reception for your convenience",
      zelleTitle: "Digital Gift",
      zelleBody: "For your convenience, digital contributions can be sent securely via Zelle.",
    },
    es: {
      title: "Regalos",
      p1: "Tu presencia es, sinceramente, el mejor regalo que podríamos recibir.",
      p2: "Si deseas bendecirnos con algo adicional, los obsequios en efectivo se agradecen con cariño para ayudarnos a comenzar este nuevo capítulo. 💌",
      p3: "Los obsequios en efectivo podrán entregarse el día de la boda.",
      p4: "Tendremos una caja para tarjetas en la recepción para tu comodidad.",
      zelleTitle: "Regalo Digital",
      zelleBody: "Para tu comodidad, también puedes enviar tu regalo de forma segura por Zelle.",
    },
  }
    return (
      <motion.div
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: -20}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <section className="relative min-h-[100dvh] pt-40 pb-24 px-6 text-mauve bg-white text-center overflow-hidden">
          <img
            src="/images/bg-pastel.png"
            className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
            alt=""
            aria-hidden="true"
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-aos="fade-down">
              {giftsText[language].title}
            </h1>
            <div className="w-20 h-1 bg-peach mx-auto mb-8 rounded-md" data-aos="fade-down" data-aos-delay="100"/>
            <div>
              <p className="text-gray-700 mb-8 text-lg" data-aos="fade-down" data-aos-delay="200">
                {giftsText[language].p1}<br />
                {giftsText[language].p2}
              </p>
            </div>
            {/* Zelle Gift Options */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg max-w-md border border-peach/30 mx-auto mt-12">
              <div className="flex flex-col items-center justify-center space-y-2" >
                <img
                    src="/images/zelle.png"
                    className="w-16 h-16 object-contain mt-2"
                    data-aos="fade-down"
                    data-aos-delay="260"
                  />
                  <p className="font-semibold text-lg pb-2" data-aos="fade-down" data-aos-delay="300">{giftsText[language].zelleTitle}</p>
                  <p className="text-sm text-gray-600 px-6" data-aos="fade-down" data-aos-delay="340">{giftsText[language].zelleBody}</p>
                  <div className="mb-8 mt-1 w-full px-6" data-aos="fade-down" data-aos-delay="380">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">Send to</p>
                    <p className="text-sm font-medium text-gray-700">{zelleNumber}</p>
                    <button
                      type="button"
                      onClick={handleCopyZelle}
                      className="mt-3 inline-flex items-center rounded-full border border-peach/40 bg-peach/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mauve transition hover:bg-peach/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/60"
                      aria-label="Copy Zelle number"
                    >
                      Copy
                    </button>
                  </div>
              </div>
            </div>
            {/* Cash Gift Options */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg max-w-md border border-peach/30 mx-auto mt-12">
              <div className="flex flex-col items-center justify-center space-y-2" >
                <img 
                  src="/images/cash-icon.png"
                  className="w-16 h-16 object-contain mt-2"
                  data-aos="fade-down"
                  data-aos-delay="300"
                />
                <p className="font-semibold text-lg pb-2" data-aos="fade-down" data-aos-delay="340">{giftsText[language].p3}</p>
                <p className="text-sm text-gray-600 pb-8" data-aos="fade-down" data-aos-delay="380">{giftsText[language].p4}</p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    );
  }