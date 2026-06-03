/**
 * CreateCharacter.jsx
 * Creacion del personaje tras el registro: nombre y clase.
 * Al crear, refresca el usuario y entra al dungeon.
 * Si el usuario ya tiene personaje, redirige al dungeon.
 */

import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';
import { api } from '../api/client.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import LanguageToggle from '../components/ui/LanguageToggle.jsx';
import ClassSelector from '../components/character/ClassSelector.jsx';
import styles from './Auth.module.css';

const CreateCharacter = () => {
  const { user, refreshUser } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [charClass, setCharClass] = useState('warrior');
  const [loading, setLoading] = useState(false);

  // Si ya tiene personaje, no tiene sentido esta pantalla
  if (user?.character) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/characters', { name, class: charClass });
      await refreshUser();
      toast.success(t('character.created'));
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
        <h1 className={styles.title}>{t('character.title')}</h1>
        <p className={styles.subtitle}>{t('character.subtitle')}</p>
        <form onSubmit={handleSubmit}>
          <Input
            id="name" label={t('character.name')}
            placeholder={t('character.namePlaceholder')}
            value={name} onChange={(e) => setName(e.target.value)} required minLength={2}
          />
          <ClassSelector value={charClass} onChange={setCharClass} />
          <Button type="submit" variant="secondary" loading={loading} fullWidth>
            {t('character.start')}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateCharacter;
