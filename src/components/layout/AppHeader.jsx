/**
 * AppHeader.jsx
 * Cabecera de las pantallas internas: titulo de seccion, selector de idioma,
 * nombre de usuario y boton de salir. Reutilizada por las paginas protegidas.
 */

import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth.js';
import Button from '../ui/Button.jsx';
import LanguageToggle from '../ui/LanguageToggle.jsx';
import styles from './AppHeader.module.css';

const AppHeader = ({ title }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.right}>
        <LanguageToggle />
        <span className={styles.username}>{user?.username}</span>
        <Button variant="ghost" onClick={logout}>{t('common.logout')}</Button>
      </div>
    </header>
  );
};

export default AppHeader;
