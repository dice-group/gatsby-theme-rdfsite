import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import de from '../../locales/de.json';
import en from '../../locales/en.json';

i18n
  .use(LanguageDetector) // auto-detects language from browser
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
  });

window.i18n = i18n;
