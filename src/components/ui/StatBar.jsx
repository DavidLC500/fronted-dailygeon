/**
 * StatBar.jsx
 * Barra de progreso reutilizable (XP, HP...). El relleno es proporcional
 * a percent (0-100, se recorta al rango). Color y alto configurables.
 */

import styles from './StatBar.module.css';

const StatBar = ({ percent, color = 'var(--color-secondary)', height = 12 }) => {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={styles.track} style={{ height }}>
      <div className={styles.fill} style={{ width: `${clamped}%`, backgroundColor: color }} />
    </div>
  );
};

export default StatBar;
