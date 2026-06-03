/**
 * TaskCard.jsx
 * Tarjeta de mision: barra de categoria, icono, titulo, prioridad,
 * descripcion, pie con dificultad/XP/fecha, acciones (editar/eliminar)
 * y boton de completar. Las completadas se muestran atenuadas.
 */

import { useTranslation } from 'react-i18next';
import PriorityBadge from './PriorityBadge.jsx';
import {
  CATEGORY_ICON, CATEGORY_COLOR, DIFFICULTY_ICON, DIFFICULTY_COLOR,
} from '../../utils/taskMeta.js';
import styles from './TaskCard.module.css';

const TaskCard = ({ task, onComplete, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === 'en' ? 'en-GB' : 'es-ES';
  const due = new Date(task.dueDate).toLocaleDateString(locale);

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.bar} style={{ backgroundColor: CATEGORY_COLOR[task.category] }} />

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.icon}>{CATEGORY_ICON[task.category]}</span>
          <span className={styles.title}>{task.title}</span>
          <PriorityBadge priority={task.priority} />
        </div>

        {task.description && <p className={styles.desc}>{task.description}</p>}

        <div className={styles.footer}>
          <span style={{ color: DIFFICULTY_COLOR[task.difficulty] }}>
            {DIFFICULTY_ICON[task.difficulty]} {t(`task.difficulties.${task.difficulty}`)}
          </span>
          <span className={styles.xp}>+{task.xpReward} XP</span>
          <span className={styles.date}>{due}</span>
          {task.isDaily && <span className={styles.daily}>🔄</span>}
        </div>

        {!task.completed && (
          <div className={styles.actions}>
            <button type="button" className={styles.action} onClick={() => onEdit(task)} aria-label="edit">✏️</button>
            <button type="button" className={styles.action} onClick={() => onDelete(task)} aria-label="delete">🗑️</button>
          </div>
        )}
      </div>

      <button
        type="button"
        className={`${styles.check} ${task.completed ? styles.checkDone : ''}`}
        onClick={() => onComplete(task)}
        disabled={task.completed}
        aria-label={t('task.complete')}
      >
        {task.completed ? '✓' : '○'}
      </button>
    </div>
  );
};

export default TaskCard;
