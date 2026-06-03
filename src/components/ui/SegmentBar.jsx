/**
 * SegmentBar.jsx
 * Barra segmentada reutilizable: se divide en `segments` celdas y rellena
 * tantas como `value` (con tope en `segments`). Aunque value siga creciendo,
 * nunca se pintan mas celdas que las disponibles.
 */

import styles from './SegmentBar.module.css';

const SegmentBar = ({ value, segments = 10, color = 'var(--color-secondary)' }) => {
  const filled = Math.min(Math.max(value, 0), segments);

  return (
    <div className={styles.bar}>
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className={styles.seg}
          style={i < filled ? { backgroundColor: color } : undefined}
        />
      ))}
    </div>
  );
};

export default SegmentBar;
