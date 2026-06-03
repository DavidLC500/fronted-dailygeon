/**
 * Loader.jsx
 * Indicador de carga reutilizable. Por defecto se centra en la pantalla;
 * con la prop inline se muestra en linea dentro de un contenedor.
 * Si no se pasa texto, usa el mensaje de carga traducido.
 */

import { useTranslation } from 'react-i18next';
import styles from './Loader.module.css';

const Loader = ({ text, inline = false }) => {
  const { t } = useTranslation();
  return (
    <div className={inline ? styles.inline : styles.center}>
      <span className={styles.text}>{text ?? t('common.loading')}</span>
    </div>
  );
};

export default Loader;
