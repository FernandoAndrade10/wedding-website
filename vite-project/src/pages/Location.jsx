import { FaHotel, FaParking } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

export default function Location() {
  const { language } = useLanguage();
  const locationText = {
    en: {
      ceremony: "Ceremony",
      copyAddress: "Copy Address",
      getDirections: "Get Directions",
      reception: "Reception",
    },
    es: {
      ceremony: "Ceremonia",
      copyAddress: "Copiar dirección",
      getDirections: "Obtener indicaciones",
      reception: "Recepción",
    },
  }
  const address = "15900 Old Valley Blvd, La Puente, CA 91744";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast.success("Copied!");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <section className="min-h-screen bg-white text-mauve px-6 pt-40 pb-24 text-center overflow-hidden relative">
        <img
          src="/images/bg-pastel.png"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />
      
        <div className="max-w-3xl mx-auto">
      
        {/* CEREMONY */}
          <h1 className="text-4xl md:text-5xl mb-4 font-bold font-serif relative" data-aos="fade-down">
            {locationText[language].ceremony}
          </h1>
          <div className="w-20 h-1 bg-peach mx-auto rounded-full mb-8 relative" data-aos="fade-down" data-aos-delay="100" />
          {/* Address */}
          <p className="relative text-gray-700 leading-relaxed mb-6" data-aos="fade-up" data-aos-delay="200">
            <strong>St. Helen Catholic Church</strong><br />
            3170 Firestone Blvd.<br />
            South Gate, CA 90280
          </p>
          {/* Buttons */}
          <div className="relative flex justify-center gap-4 mb-10 flex-wrap" data-aos="zoom-in" data-aos-delay="300">
            <button
              onClick={handleCopy}
              className="bg-peach text-white px-5 py-2 rounded-md shadow-md hover:bg-peach/90 transition hover:shadow-lg"
            >
              {locationText[language].copyAddress}
            </button>

            <a
              href="https://www.google.com/maps/place/3170+Firestone+Blvd,+South+Gate,+CA+90280/@33.9545564,-118.216299,17z/data=!3m1!4b1!4m6!3m5!1s0x80c2c9565bc852ff:0x4d33f2a1f1fe787d!8m2!3d33.954552!4d-118.2137241!16s%2Fg%2F11bw41s5yw?entry=tts"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-mauve text-white px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-mauve/90 transition"
            >
              {locationText[language].getDirections}
            </a>
          </div>
          {/* Embedded Church Map */}
          <div className=" relative rounded-xl overflow-hidden shadow-md mb-12" data-aos="fade-up" data-aos-delay="400">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.4779840546507!2d-118.2137241!3d33.95455200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c9565bc852ff%3A0x4d33f2a1f1fe787d!2s3170%20Firestone%20Blvd%2C%20South%20Gate%2C%20CA%2090280!5e0!3m2!1sen!2sus!4v1761444115508!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        {/* RECEPTION */}
          <h1 className="text-4xl md:text-5xl mb-4 font-bold font-serif relative" data-aos="fade-down">
            {locationText[language].reception}
          </h1>
          <div className="w-20 h-1 bg-peach mx-auto rounded-full mb-8 relative" data-aos="fade-down" data-aos-delay="100"/>
          {/* Address */}
          <p className="relative text-gray-700 leading-relaxed mb-6" data-aos="fade-up" data-aos-delay="200">
            <strong>SGV Event Center - Louisiana Room</strong><br />
            15900 Old Valley Blvd<br />
            La Puente, CA 91744
          </p>
          {/* Copy Buttons */}
          <div className="relative flex justify-center gap-4 mb-10 flex-wrap" data-aos="zoom-in" data-aos-delay="300">
            <button
              onClick={handleCopy}
              className="bg-peach text-white px-5 py-2 rounded-md shadow-md hover:bg-peach/90 transition hover:shadow-lg"
            >
              {locationText[language].copyAddress}
            </button>
            <a
              href="https://www.google.com/maps/place/15900+Old+Valley+Blvd,+La+Puente,+CA+91744/@34.0184405,-117.9548781,17z/data=!3m1!4b1!4m6!3m5!1s0x80c2d675beca104d:0x45b13559657258c5!8m2!3d34.0184405!4d-117.9523032!16s%2Fg%2F11bw49dg8w?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-mauve text-white px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-mauve/90 transition"
            >
              {locationText[language].getDirections}
            </a>
          </div>
      
          {/* Embedded Google Map */}
          <div className=" relative rounded-xl overflow-hidden shadow-md mb-8" data-aos="fade-up" data-aos-delay="400">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.991058201181!2d-117.954878124285!3d34.0184404731697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d675beca104d%3A0x45b13559657258c5!2s15900%20Old%20Valley%20Blvd%2C%20La%20Puente%2C%20CA%2091744!5e0!3m2!1sen!2sus!4v1749253912755!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Extra Details */}
          <div className="relative mt-12 text-left text-gray-700 space-y-10 max-w-3xl mx-auto">
            {/* Parking Info */}
            <div data-aos="fade-up" data-aos-delay="500" data-aos-once="true">
              <div className="flex items-center gap-2 mb-2">
                <span aria-hidden="true">
                  <FaParking className="text-sage w-6 h-6"/>
                </span>
                <h2 className="text-2xl font-semibold text-mauve">
                  Parking & Transportation
                </h2>
              </div>
              <p>
                Complimentary valet parking will be available at the venue.
                Guests may also use rideshare apps (Uber, Lyft) for convenience.
                If carpooling, please plan to arrive early to avoid delays.
              </p>
            </div>
            {/* Hotels */}
            <div data-aos="fade-up" data-aos-delay="600" data-aos-once="true">
              <div className="flex items-center gap-2 mb-2">
                <span aria-hidden="true">
                  <FaHotel className="text-sage w-6 h-6" />
                </span>
                <h2 className="text-2xl font-semibold text-mauve">Nearby Hotels</h2>
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li><span className="font-medium">The Langham Huntington</span> – 1401 S Oak Knoll Ave, Pasadena, CA</li>
                <li><span className="font-medium">Courtyard by Marriott Pasadena</span> – 180 N Fair Oaks Ave, Pasadena, CA</li>
                <li><span className="font-medium">Hyatt Place Pasadena</span> – 399 E Green St, Pasadena, CA</li>
              </ul>
              <p className="mt-2 text-sm text-gray-500">
                *Hotels are listed for planning purposes and subject to change based on final venue location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
} 
  