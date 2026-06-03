/**
 * PriorityBadge.jsx
 * Etiqueta de prioridad de una mision, coloreada segun su nivel.
 * El texto se traduce; el color viene de taskMeta.
 */

import { useTranslation } from 'react-i18next';
import { PRIORITY_COLOR } from '../../utils/taskMeta.js';
import styles from './PriorityBadge.module.css';

const PriorityBadge = ({ priority }) => {
  const { t } = useTranslation();
  const color = PRIORITY_COLOR[priority];

  return (
    <span className={styles.badge} style={{ color, borderColor: color }}>
      {t(`task.priorities.${priority}`)}
    </span>
  );
};

export default PriorityBadge;
