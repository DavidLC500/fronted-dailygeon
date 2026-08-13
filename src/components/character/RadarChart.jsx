/**
 * RadarChart.jsx
 * Grafico de radar de actividad por categoria (misiones completadas).
 * Cada eje es una categoria y su valor se limita a 10: aunque se completen
 * mas, el poligono no crece mas alla del anillo exterior. SVG puro, sin libs.
 */

import { CATEGORIES, CATEGORY_ICON } from '../../utils/taskMeta.js';
import styles from './RadarChart.module.css';

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 34;
const MAX = 10;   // tope visual
const RINGS = 5;

const RadarChart = ({ tasks }) => {
  const n = CATEGORIES.length;
  const values = CATEGORIES.map((c) =>
    Math.min(tasks.filter((x) => x.category === c && x.completed).length, MAX));

  // Angulo de cada eje (empezando arriba) y coordenada a un radio dado
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const coord = (i, r) => [CENTER + r * Math.cos(angle(i)), CENTER + r * Math.sin(angle(i))];

  const ringPoints = (r) => CATEGORIES.map((_, i) => coord(i, r).join(',')).join(' ');
  const dataPoints = values.map((v, i) => coord(i, (v / MAX) * RADIUS).join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.svg} role="img" aria-label="radar">
      {/* Anillos de fondo */}
      {Array.from({ length: RINGS }).map((_, r) => (
        <polygon key={r} points={ringPoints((RADIUS * (r + 1)) / RINGS)} className={styles.ring} />
      ))}
      {/* Ejes */}
      {CATEGORIES.map((c, i) => {
        const [x, y] = coord(i, RADIUS);
        return <line key={c} x1={CENTER} y1={CENTER} x2={x} y2={y} className={styles.axis} />;
      })}
      {/* Poligono de datos */}
      <polygon points={dataPoints} className={styles.data} />
      {/* Iconos de categoria en cada vertice */}
      {CATEGORIES.map((c, i) => {
        const [x, y] = coord(i, RADIUS + 16);
        const size = 18;
        return (
          <image
            key={c}
            href={`/icons/${CATEGORY_ICON[c]}.svg`}
            x={x - size / 2}
            y={y - size / 2}
            width={size}
            height={size}
            className={styles.icon}
          />
        );
      })}
    </svg>
  );
};

export default RadarChart;
