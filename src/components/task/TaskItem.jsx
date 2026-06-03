/**
 * TaskItem.jsx
 * Fila de mision: estado, titulo y recompensa de XP.
 * Las misiones completadas se muestran atenuadas.
 * (En el siguiente bloque se ampliara con prioridad, categoria y completar.)
 */

import styles from './TaskItem.module.css';

const TaskItem = ({ task }) => (
  <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
    <span className={styles.status}>{task.completed ? '✓' : '○'}</span>
    <span className={styles.title}>{task.title}</span>
    <span className={styles.xp}>+{task.xpReward} XP</span>
  </li>
);

export default TaskItem;
