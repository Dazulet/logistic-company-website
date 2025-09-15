// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Передает i18n в react-i18next
  .init({
    resources,
    fallbackLng: 'ru', // Язык по умолчанию, если выбранный язык недоступен
    debug: true, // Включите для отладки в консоли
    interpolation: {
      escapeValue: false // React уже защищает от XSS
    }
  });

export default i18n;