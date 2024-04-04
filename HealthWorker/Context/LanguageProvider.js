// LanguageProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n";


const LanguageContext = createContext();

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageToggle = () => {
    const newLanguage = selectedLanguage === "en" ? "hi" : "en";
    setSelectedLanguage(newLanguage);
    i18n.locale = newLanguage;
  };
  useEffect(() => {
    
    console.log("Selected language:", selectedLanguage);
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, handleLanguageToggle }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
