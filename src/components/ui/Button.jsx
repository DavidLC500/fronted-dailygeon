/**
 * Button.jsx
 * Boton reutilizable con variantes de color y estado de carga.
 * variant: 'primary' (morado) | 'secondary' (dorado) | 'ghost' (solo borde).
 */

import styles from './Button.module.css';

const Button = ({
  children, variant = 'primary', fullWidth = false,
  loading = false, disabled = false, className = '', ...props
}) => (
  <button
    className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? '...' : children}
  </button>
);

export default Button;
