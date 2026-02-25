import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const [ isOpen, setIsOpen ] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    const navLabels = {
        en: {
            home: "Home",
            about: "About",
            attire: "Attire",
            gallery: "Gallery",
            gifts: "Gifts",
            location: "Location",
            rsvp: "RSVP",
        },
        es: {
            home: "Inicio",
            about: "Padrinos",
            attire: "Código de Vestimenta",
            gallery: "Galería",
            gifts: "Regalos",
            location: "Ubicación",
            rsvp: "Confirmar asistencia",
        },
    };

    // Prevent scrolling the background when Mobile Menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);
    
    return (
        <nav className='absolute top-4 left-0 w-full z-50 bg-mauve/70 text-white shadow-md'>
            <div className='w-full px-4 py-4 md:px-6 flex items-center justify-between'>
            
               {/* Logo */}
                <div className='text-3xl font-serif font-semibold tracking-wide cutout-text bg-white'>
                    <Link to="/">F & B</Link>
                </div>

                {/* Desktop Nav */}
                <ul className='hidden md:flex gap-8 text-sm font-semibold tracking-wide uppercase'>
                    <li><Link to='/' className='text-white hover:text-peach transition-colors'>{navLabels[language].home}</Link></li>
                    <li><Link to='/rsvp' className='text-white hover:text-peach transition-colors'>{navLabels[language].rsvp}</Link></li>
                    <li><Link to='/gallery' className='text-white hover:text-peach transition-colors'>{navLabels[language].gallery}</Link></li>
                    <li><Link to='/about' className='text-white hover:text-peach transition-colors'>{navLabels[language].about}</Link></li>
                    <li><Link to='/gifts' className='text-white hover:text-peach transition-colors'>{navLabels[language].gifts}</Link></li>
                    <li><Link to='/location' className='text-white hover:text-peach transition-colors'>{navLabels[language].location}</Link></li>
                    <li><Link to='/attire' className='text-white hover:text-peach transition-colors'>{navLabels[language].attire}</Link></li>
                    <button
                        onClick={toggleLanguage}
                        className='rounded-full border shadow-sm px-1 py-1 flex items-center gap-2 bg-white/50 transition-colors duration-300'
                    >
                        <span className={language === 'en' ? 'bg-sage rounded-full px-3 text-black' : 'bg-gray-700 rounded-full px-3 text-white'}>EN</span> <span className='text-black '>|</span> <span className={language === 'es' ? 'bg-sage px-3 rounded-full text-black' : 'bg-gray-700 px-3 rounded-full text-white'}>ES</span>
                    </button>
                </ul>

                

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden text-white text-3xl focus:outline-none'
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label='Toggle navigation'
                >
                    {isOpen ? ' ' : '☰'}
                </button>
            </div>

            
            
            {/*Mobile Menu */}
            <div className={`md:hidden fixed inset-0 bg-mauve/90 z-40 flex flex-col 
                items-center justify-center transition-opacity duration-300 ease-in-out
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >

                <button
                    onClick={() => setIsOpen(false)}
                    className='absolute top-4 right-4 text-white text-3xl'
                    aria-label="Close navigation"
                >
                    ✕
                </button>

                <ul className='flex flex-col gap-6 text-lg text-white font-medium'>
                    <li><Link to='/' onClick={() => setIsOpen(false)}>{navLabels[language].home}</Link></li>
                    <li><Link to='/rsvp' onClick={() => setIsOpen(false)}>{navLabels[language].rsvp}</Link></li>
                    <li><Link to='/gallery' onClick={() => setIsOpen(false)}>{navLabels[language].gallery}</Link></li>
                    <li><Link to='/about' onClick={() => setIsOpen(false)}>{navLabels[language].about}</Link></li>
                    <li><Link to='/gifts' onClick={() => setIsOpen(false)}>{navLabels[language].gifts}</Link></li>
                    <li><Link to='/location' onClick={() => setIsOpen(false)}>{navLabels[language].location}</Link></li>
                    <li><Link to='/attire' onClick={() => setIsOpen(false)}>{navLabels[language].attire}</Link></li>
                    <li>
                        <button 
                            onClick={toggleLanguage}
                            className='rounded-full border shadow-sm px-1 py-1 flex items-center gap-2 bg-white/50 transition-colors duration-300'
                        >
                            <span className={language === 'en' ? 'bg-sage rounded-full px-3 text-black' : 'bg-gray-700 rounded-full px-3 text-white'}>EN</span> <span className='text-black '>|</span> <span className={language === 'es' ? 'bg-sage px-3 rounded-full text-black' : 'bg-gray-700 px-3 rounded-full text-white'}>ES</span>
                        </button>
                    </li>
                </ul>
            </div>            
        </nav>
    );
}
