/**
 * Register.jsx
 * Pantalla de registro. Crea la cuenta y, al tener exito, lleva a la
 * creacion del personaje. Muestra los errores con un toast.
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
import { errorMessage } from '../utils/errorMessage.js';
import styles from './Auth.module.css';

const Register = () => {
  const { register } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      toast.success(t('auth.accountCreated'));
      navigate('/create-character');
    } catch (err) {
      toast.error(errorMessage(t, err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <div className={styles.langRow}><LanguageToggle /></div>
        <h1 className={styles.title}>{t('auth.appName')}</h1>
        <p className={styles.subtitle}>{t('auth.registerSubtitle')}</p>
        <form onSubmit={handleSubmit}>
          <Input
            id="username" label={t('auth.username')}
            placeholder={t('auth.usernamePlaceholder')}
            value={form.username} onChange={update('username')} required minLength={3}
          />
          <Input
            id="email" label={t('common.email')} type="email"
            placeholder={t('auth.emailPlaceholder')}
            value={form.email} onChange={update('email')} required
          />
          <Input
            id="password" label={t('common.password')} type="password"
            placeholder={t('auth.passwordMinPlaceholder')}
            value={form.password} onChange={update('password')} required minLength={6}
          />
          <Button type="submit" variant="secondary" loading={loading} fullWidth>
            {t('auth.register')}
          </Button>
        </form>
        <p className={styles.switch}>
          {t('auth.hasAccount')} <Link to="/login">{t('auth.loginLink')}</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
