import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Confirmation() {
    const { language } = useLanguage();
    const rsvpText = {
        en: {
            confirmationMessage: "RSVP Confirmed!",
            p1: "Thank you for letting us know. We can't wait to celebrate with you!",
            home: "Return to Home",            
        },
        es: {
            confirmationMessage: "¡RSVP Confirmado!",
            p1: "Gracias por hacérnoslo saber. ¡Estamos muy emocionados de celebrar contigo!",
            home: "Regresar al Inicio",  
        }
    }
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight});
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        const timer = setTimeout(() => setShowConfetti(false), 5000);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);
    
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white text-center px-4 overflow-hidden">
            <img 
                src="/images/bg-pastel.png"
                alt="Background pastel"
                className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
            />
            <Confetti 
                width={dimensions.width} 
                height={dimensions.height}
                numberOfPieces={showConfetti ? 200 : 0}
            />
            <FaCheckCircle className="relative text-sage text-5xl mb-4" />
            <h1 className="relative text-4xl font-bold text-mauve mb-4">
                {rsvpText[language].confirmationMessage}
            </h1>
            <p className="relative text-lg text-gray-700 mb-4">
                {rsvpText[language].p1}
            </p>
            <Link 
            to="/"
            className="relative bg-sage text-white font-medium px-6 py-2 rounded-md shadow hover:bg-sage/80 transition"
            >
                {rsvpText[language].home}
            </Link>
        </div>
    );
}