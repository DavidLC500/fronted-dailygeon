/**
 * Settings.jsx
 * Ajustes de la cuenta: idioma, datos del usuario y cierre de sesion.
 */

import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth.js';
import AppHeader from '../components/layout/AppHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import LanguageToggle from '../components/ui/LanguageToggle.jsx';
import styles from './Settings.module.css';

const Settings = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className={styles.page}>
      <AppHeader title={t('settings.title')} />

      <Card className={styles.section}>
        <h2 className={styles.label}>{t('settings.language')}</h2>
        <LanguageToggle />
      </Card>

      <Card className={styles.section}>
        <h2 className={styles.label}>{t('settings.account')}</h2>
        <p className={styles.row}>
          <span>{t('settings.username')}</span>
          <strong>{user.username}</strong>
        </p>
        <p className={styles.row}>
          <span>{t('settings.email')}</span>
          <strong>{user.email}</strong>
        </p>
      </Card>

      <Button variant="ghost" fullWidth onClick={logout}>{t('common.logout')}</Button>
    </div>
  );
};

export default Settings;
