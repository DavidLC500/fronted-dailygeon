/**
 * Character.jsx
 * Perfil del personaje: avatar, nombre editable, nivel con barra de XP y
 * estadisticas de misiones (calculadas a partir de la lista de tareas).
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api/client.js';
import { errorMessage } from '../utils/errorMessage.js';
import AppHeader from '../components/layout/AppHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Loader from '../components/ui/Loader.jsx';
import StatBar from '../components/ui/StatBar.jsx';
import StatBox from '../components/character/StatBox.jsx';
import CategoryStats from '../components/character/CategoryStats.jsx';
import styles from './Character.module.css';

/** Icono por clase del personaje */
const CLASS_ICON = { warrior: '⚔️', mage: '🧙', rogue: '🗡️', cleric: '✨' };

const Character = () => {
  const { t } = useTranslation();
  const { user, refreshUser } = useAuth();
  const character = user.character;
  const { data, loading } = useApi(() => api.get('/tasks'));

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(character.name);
  const [saving, setSaving] = useState(false);

  const xpPercent = character.maxXP > 0 ? (character.currentXP / character.maxXP) * 100 : 0;

  const saveName = async () => {
    setSaving(true);
    try {
      await api.patch('/characters/me', { name });
      await refreshUser();
      setEditing(false);
      toast.success(t('character.nameUpdated'));
    } catch (err) {
      toast.error(errorMessage(t, err));
    } finally {
      setSaving(false);
    }
  };

  // Estadisticas derivadas de las misiones
  const tasks = data?.tasks || [];
  const total = tasks.length;
  const completed = tasks.filter((x) => x.completed).length;
  const pending = total - completed;
  const completion = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.page}>
      <AppHeader title={t('character.profileTitle')} />

      <Card className={styles.hero}>
        <div className={styles.avatar} style={{ backgroundColor: character.avatarColor }}>
          {CLASS_ICON[character.class]}
        </div>
        {editing ? (
          <div className={styles.nameEdit}>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} />
            <Button variant="secondary" onClick={saveName} loading={saving}>✓</Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>✕</Button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.nameBtn}
            onClick={() => { setName(character.name); setEditing(true); }}
          >
            {character.name} ✏️
          </button>
        )}
        <p className={styles.class}>{t(`character.classes.${character.class}`)}</p>
      </Card>

      <Card>
        <div className={styles.levelRow}>
          <div className={styles.levelBadge}>
            <span className={styles.levelNum}>{character.level}</span>
            <span className={styles.levelLbl}>{t('character.level')}</span>
          </div>
          <div className={styles.xpInfo}>
            <StatBar percent={xpPercent} />
            <p className={styles.xpText}>{character.currentXP} / {character.maxXP} XP</p>
          </div>
        </div>
      </Card>

      <h2 className={styles.section}>{t('character.stats')}</h2>
      {loading ? (
        <Loader inline />
      ) : (
        <>
          <div className={styles.grid}>
            <StatBox icon="📋" value={total} label={t('character.total')} />
            <StatBox icon="✅" value={completed} label={t('character.completedStat')} color="var(--color-success)" />
            <StatBox icon="⏳" value={pending} label={t('character.pending')} color="var(--color-primary)" />
            <StatBox icon="📈" value={`${completion}%`} label={t('character.completion')} color="var(--color-secondary)" />
          </div>

          <h2 className={styles.section}>{t('character.activity')}</h2>
          <Card>
            <CategoryStats tasks={tasks} />
          </Card>
        </>
      )}
    </div>
  );
};

export default Character;
