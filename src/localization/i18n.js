import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import spanishFile from "./es/es.json";
import englishFile from "./en/en.json";

const resources = {
  es: {
    translation: spanishFile,
  },
  en: {
    translation: englishFile,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",
    fallbackLng: "es",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
