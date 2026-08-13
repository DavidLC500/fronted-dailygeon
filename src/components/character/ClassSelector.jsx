/**
 * ClassSelector.jsx
 * Selector de clase del personaje en forma de rejilla de botones.
 * El boton activo se resalta. Controlado por value/onChange.
 * Las etiquetas se traducen segun el idioma activo.
 */

import { useTranslation } from 'react-i18next';
import Icon from '../ui/Icon.jsx';
import styles from './ClassSelector.module.css';

/** Clases disponibles con su icono (la etiqueta viene de i18n) */
const CLASSES = [
  { value: 'warrior', icon: 'broadsword' },
  { value: 'mage', icon: 'wizard-face' },
  { value: 'rogue', icon: 'daggers' },
  { value: 'cleric', icon: 'sparkles' },
];

const ClassSelector = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.grid}>
      {CLASSES.map((c) => (
        <button
          type="button"
          key={c.value}
          onClick={() => onChange(c.value)}
          className={`${styles.option} ${value === c.value ? styles.active : ''}`}
        >
          <Icon name={c.icon} /> {t(`character.classes.${c.value}`)}
        </button>
      ))}
    </div>
  );
};

export default ClassSelector;
