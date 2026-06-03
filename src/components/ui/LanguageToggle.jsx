/**
 * LanguageToggle.jsx
 * Boton para cambiar el idioma de la app entre espanol e ingles.
 * El idioma elegido se persiste automaticamente en localStorage.
 */

import { useTranslation } from 'react-i18next';
import styles from './LanguageToggle.module.css';

const LANGUAGES = ['es', 'en'];

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;

  return (
    <div className={styles.toggle}>
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`${styles.btn} ${current === lng ? styles.active : ''}`}
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
