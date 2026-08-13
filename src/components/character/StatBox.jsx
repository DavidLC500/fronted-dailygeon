/**
 * StatBox.jsx
 * Cajita de estadistica del perfil: icono, valor y etiqueta.
 */

import Icon from '../ui/Icon.jsx';
import styles from './StatBox.module.css';

const StatBox = ({ icon, value, label, color }) => (
  <div className={styles.box}>
    <span className={styles.icon}><Icon name={icon} /></span>
    <span className={styles.value} style={color ? { color } : undefined}>{value}</span>
    <span className={styles.label}>{label}</span>
  </div>
);

export default StatBox;
