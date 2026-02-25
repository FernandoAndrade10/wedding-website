import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [ language, setLanguage ] = useState('en');

    function changeLanguage(newLanguage) {
        setLanguage(newLanguage);
    }

    function toggleLanguage() {
        if (language === 'en')
            setLanguage('es');
        else
            setLanguage('en');
    }

    const contextLanguage = {
        language,
        changeLanguage,
        toggleLanguage,
    };

    return (
        <LanguageContext.Provider value={contextLanguage}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}