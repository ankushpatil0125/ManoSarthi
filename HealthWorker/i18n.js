import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

export const translations = {
  en: {
    Login: "Login",
    "Enter Your Username": "Enter Your Username",
    "Enter Your Password": "Enter Your Password",
    "Forgot Password?": "Forgot Password?",
    "Login Successful": "Login Successful",
    "Login Failure": "Login Failure",
    "Register Patient": "Register Patient",
    "Missed Followup": "Missed Followup",
    "Sync Data": "Sync Data",
    "Follow-up Schedule":"Follow-up Schedule",
    "Name":"Name",
    "Address":"Address",
    "Status":"Status"
    // Add more key-value pairs for English here
  },
  hi: {
    Login: "लॉगिन",
    "Enter Your Username": "अपना उपयोगकर्ता नाम दर्ज करें",
    "Enter Your Password": "अपना पासवर्ड दर्ज करें",
    "Forgot Password?": "पासवर्ड भूल गए?",
    "Login Successful": "लॉगिन सफल",
    "Login Failure": "लॉगिन विफल",
    "Register Patient": "रोगी का पंजीकरण",
    "Missed Followup": "फॉलोअप छूट गया",
    "Sync Data": "डेटा सिंक्रनाइज़ करें",
    "Follow-up Schedule":"फॉलो-अप अनुसूची",
    "Name":"नाम",
    "Address":"पता",
    "Status":"स्थिति"
    // Add more key-value pairs for Hindi here
  },
};

const i18n = new I18n(translations);

// Get the first locale detected
const locale = Localization.getLocales()[0];
I18n.translations = translations;
I18n.locale = locale.languageCode;
I18n.enableFallback = true; // Enable fallback mechanism

// console.log("Locale:", locale);
// console.log("Translations:", translations);
// console.log("Translated 'Login':", i18n.t("Login"));

export default i18n;
