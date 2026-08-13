/**
 * Icon.jsx
 * Icono SVG (game-icons.net, CC-BY) mostrado como mascara CSS para heredar
 * el color de texto del contexto, igual que hacia el emoji al que sustituye.
 * Se dimensiona en `em` para encajar en cualquier font-size existente.
 */

import styles from './Icon.module.css';

const Icon = ({ name, className = '', label, style }) => (
  <span
    className={`${styles.icon} ${className}`}
    style={{ WebkitMaskImage: `url(/icons/${name}.svg)`, maskImage: `url(/icons/${name}.svg)`, ...style }}
    role={label ? 'img' : 'presentation'}
    aria-label={label}
  />
);

export default Icon;
