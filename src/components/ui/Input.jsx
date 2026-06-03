/**
 * Input.jsx
 * Campo de formulario reutilizable con etiqueta opcional.
 * Reenvia el resto de props al <input> nativo (value, onChange, type...).
 */

import styles from './Input.module.css';

const Input = ({ label, id, ...props }) => (
  <div className={styles.field}>
    {label && <label className={styles.label} htmlFor={id}>{label}</label>}
    <input id={id} className={styles.input} {...props} />
  </div>
);

export default Input;
