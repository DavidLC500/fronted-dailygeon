/**
 * i18n.js
 * Configuracion de internacionalizacion con i18next + react-i18next.
 * Carga los mensajes de /locales, detecta el idioma del navegador y lo
 * persiste en localStorage. Idioma por defecto: español.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './locales/es.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: { escapeValue: false }, // React ya escapa por seguridad
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Mantiene el atributo lang del <html> sincronizado con el idioma (a11y/SEO)
const syncHtmlLang = (lng) => {
  document.documentElement.lang = lng;
};
syncHtmlLang(i18n.resolvedLanguage || 'es');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
