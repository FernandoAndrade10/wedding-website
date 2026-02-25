import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
    const { language } = useLanguage();
    const notFoundText = {
        en: {
            p1: "Oops! The page you’re looking for doesn’t exist.",
            home: "Back to Home",
        },
        es: {
            p1: "¡Ups! La página que buscas no existe.",
            home: "Volver al Inicio",
        }
    }
    return (
        <section className="min-h-screen flex items-center justify-center bg-white relative px-6">
            <img 
                src="/images/bg-pastel.png"
                className="w-full h-full absolute inset-0 bg-cover opacity-80 z-0"
            />

            <div className="relative z-10 text-center max-w-md mx-auto">
                <h1 className="text-6xl font-bold text-peach font-serif mb-4">
                    404
                </h1>
                <p className="text-xl text-mauve mb-6">
                    {notFoundText[language].p1}
                </p>
                <Link
                    to="/"
                    className="inline-block bg-peach text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-peach/80 transition"
                >
                    {notFoundText[language].home}
                </Link>
            </div>
        </section>
    );
}