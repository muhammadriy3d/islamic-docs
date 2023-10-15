import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arTranslation from './locales/ar.json';
import enTranslation from './locales/en.json';

const resources = {
  ar: { translation: arTranslation },
  en: { translation: enTranslation },
};

const userLanguage = localStorage.getItem('userLanguage') || "ar";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage, // Default language
    fallbackLng: userLanguage, // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
