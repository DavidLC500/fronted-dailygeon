/**
 * Login.jsx
 * Pantalla de inicio de sesion. Valida con la API y, si tiene exito,
 * redirige al dungeon. Muestra los errores con un toast.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import LanguageToggle from '../components/ui/LanguageToggle.jsx';
import styles from './Auth.module.css';

const Login = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success(t('auth.welcomeBack'));
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <div className={styles.langRow}><LanguageToggle /></div>
        <h1 className={styles.title}>{t('auth.appName')}</h1>
        <p className={styles.subtitle}>{t('auth.loginSubtitle')}</p>
        <form onSubmit={handleSubmit}>
          <Input
            id="email" label={t('common.email')} type="email"
            placeholder={t('auth.emailPlaceholder')}
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <Input
            id="password" label={t('common.password')} type="password"
            placeholder={t('auth.passwordPlaceholder')}
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          <Button type="submit" variant="secondary" loading={loading} fullWidth>
            {t('auth.login')}
          </Button>
        </form>
        <p className={styles.switch}>
          {t('auth.noAccount')} <Link to="/register">{t('auth.registerLink')}</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
