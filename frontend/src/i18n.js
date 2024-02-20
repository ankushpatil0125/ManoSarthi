import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from "i18next-http-backend"
import i18next from 'i18next';
import global_en from "./translation/en/global.json"
import global_hi from "./translation/hi/global.json"
i18next
// .use(LanguageDetector)
   .use(initReactI18next)
// .use(Backend)
  .init({
    interpolation:{escapeValue:false},
    lng:"en",
    fallbackLng: 'en',
    resources:{
      en:{
        global:global_en
      },
      hi:{
        global:global_hi
      }
    },
    debug: true,
    returnObjects:true,


  });

 
export default i18n;


