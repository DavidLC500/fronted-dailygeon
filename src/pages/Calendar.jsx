/**
 * Calendar.jsx
 * Vista de calendario: rejilla mensual con puntos por dia y la lista de
 * misiones del dia seleccionado. Trabaja sobre la lista de misiones (sin
 * llamadas extra mas alla de cargarlas).
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api/client.js';
import AppHeader from '../components/layout/AppHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Loader from '../components/ui/Loader.jsx';
import Icon from '../components/ui/Icon.jsx';
import CalendarGrid from '../components/calendar/CalendarGrid.jsx';
import styles from './Calendar.module.css';

const Calendar = () => {
  const { t, i18n } = useTranslation();
  const { data, loading } = useApi(() => api.get('/tasks'));
  const [selected, setSelected] = useState(new Date().toISOString().slice(0, 10));

  const tasks = data?.tasks || [];
  const dayTasks = tasks.filter((x) => x.dueDate.slice(0, 10) === selected);
  const locale = i18n.resolvedLanguage === 'en' ? 'en-GB' : 'es-ES';
  const dayLabel = new Date(`${selected}T00:00`)
    .toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className={styles.page}>
      <AppHeader title={t('calendar.title')} />

      {loading ? (
        <Loader inline />
      ) : (
        <div className={styles.dashboard}>
          <div className={styles.colMain}>
            <CalendarGrid tasks={tasks} selected={selected} onSelect={setSelected} />
            <p className={styles.legend}>
              <span className={styles.legendDot}>
                <Icon name="plain-circle" style={{ color: 'var(--color-secondary)' }} /> {t('calendar.legendDone')}
              </span>
              {' · '}
              <span className={styles.legendDot}>
                <Icon name="plain-circle" style={{ color: 'var(--color-accent)' }} /> {t('calendar.legendPending')}
              </span>
            </p>
          </div>

          <div className={styles.colSide}>
            <h2 className={styles.dayTitle}>{dayLabel}</h2>
            {dayTasks.length === 0 ? (
              <p className={styles.empty}>{t('calendar.noTasks')}</p>
            ) : (
              <Card>
                <ul className={styles.list}>
                  {dayTasks.map((task) => (
                    <li key={task._id} className={`${styles.item} ${task.completed ? styles.done : ''}`}>
                      <span>{task.completed ? '✓' : '○'} {task.title}</span>
                      <span className={styles.xp}>+{task.xpReward} XP</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
