/**
 * TaskForm.jsx
 * Formulario reutilizable de mision, usado tanto para crear como para editar.
 * Precarga los valores de `initial` (si se pasa) y entrega el formulario
 * completo via onSubmit. Las etiquetas y opciones se traducen.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import OptionSelector from '../ui/OptionSelector.jsx';
import {
  PRIORITIES, CATEGORIES, DIFFICULTIES,
  PRIORITY_COLOR, CATEGORY_COLOR, DIFFICULTY_COLOR, CATEGORY_ICON, DIFFICULTY_XP,
} from '../../utils/taskMeta.js';
import styles from './TaskForm.module.css';

/** Fecha de hoy en formato YYYY-MM-DD para el input date */
const today = () => new Date().toISOString().slice(0, 10);

const TaskForm = ({ initial, onSubmit, loading, submitLabel }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    dueDate: initial?.dueDate ? initial.dueDate.slice(0, 10) : today(),
    priority: initial?.priority || 'medium',
    category: initial?.category || 'general',
    difficulty: initial?.difficulty || 'normal',
    isDaily: initial?.isDaily || false,
  });

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="title" label={t('task.titleLabel')} placeholder={t('task.titlePlaceholder')}
        value={form.title} onChange={(e) => set('title', e.target.value)} required maxLength={100}
      />
      <Input
        id="desc" label={t('task.description')} placeholder={t('task.descriptionPlaceholder')}
        value={form.description} onChange={(e) => set('description', e.target.value)} maxLength={500}
      />
      <Input
        id="due" type="date" label={t('task.dueDate')}
        value={form.dueDate} onChange={(e) => set('dueDate', e.target.value)} required
      />

      <OptionSelector
        label={t('task.priority')} options={PRIORITIES} selected={form.priority}
        onSelect={(v) => set('priority', v)}
        getColor={(p) => PRIORITY_COLOR[p]} getLabel={(p) => t(`task.priorities.${p}`)}
      />
      <OptionSelector
        label={t('task.category')} options={CATEGORIES} selected={form.category}
        onSelect={(v) => set('category', v)}
        getColor={(c) => CATEGORY_COLOR[c]}
        getLabel={(c) => <><Icon name={CATEGORY_ICON[c]} />{t(`task.categories.${c}`)}</>}
      />
      <OptionSelector
        label={t('task.difficulty')} options={DIFFICULTIES} selected={form.difficulty}
        onSelect={(v) => set('difficulty', v)}
        getColor={(d) => DIFFICULTY_COLOR[d]} getLabel={(d) => `${t(`task.difficulties.${d}`)} (+${DIFFICULTY_XP[d]})`}
      />

      <label className={styles.switch}>
        <span className={styles.dailyLabel}><Icon name="cycle" />{t('task.daily')}</span>
        <input
          type="checkbox" checked={form.isDaily}
          onChange={(e) => set('isDaily', e.target.checked)}
        />
      </label>

      <Button type="submit" variant="secondary" fullWidth loading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
};

export default TaskForm;
