/**
 * CalendarGrid.jsx
 * Rejilla mensual de misiones. Cada dia muestra puntos segun tenga misiones
 * completadas (dorado) o pendientes (rojo). Navegacion entre meses y seleccion
 * de dia (controlada por el padre via selected/onSelect). Nombres de mes y
 * dias de la semana segun el idioma activo (Intl).
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CalendarGrid.module.css';

const CalendarGrid = ({ tasks, selected, onSelect }) => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === 'en' ? 'en-GB' : 'es-ES';
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const monthLabel = new Date(cursor.y, cursor.m, 1)
    .toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const offset = (new Date(cursor.y, cursor.m, 1).getDay() + 6) % 7; // lunes = 0
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const todayKey = new Date().toISOString().slice(0, 10);

  // Agrupa las misiones por fecha (YYYY-MM-DD)
  const byDate = {};
  tasks.forEach((t) => {
    const key = t.dueDate.slice(0, 10);
    byDate[key] = byDate[key] || { completed: 0, pending: 0 };
    byDate[key][t.completed ? 'completed' : 'pending'] += 1;
  });

  // Cabecera de dias de la semana (lunes primero)
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 1 + i).toLocaleDateString(locale, { weekday: 'narrow' }));

  const cells = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${cursor.y}-${String(cursor.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ d, key, info: byDate[key] });
  }

  const prev = () => setCursor((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 }));
  const next = () => setCursor((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button type="button" className={styles.nav} onClick={prev} aria-label="prev">◀</button>
        <span className={styles.month}>{monthLabel}</span>
        <button type="button" className={styles.nav} onClick={next} aria-label="next">▶</button>
      </div>

      <div className={styles.grid}>
        {weekdays.map((w, i) => (
          <span key={`wd-${i}`} className={styles.weekday}>{w}</span>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <span key={`b-${i}`} />;
          const isSelected = selected === cell.key;
          const isToday = cell.key === todayKey;
          return (
            <button
              type="button"
              key={cell.key}
              className={`${styles.day} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
              onClick={() => onSelect(cell.key)}
            >
              <span className={styles.dayNum}>{cell.d}</span>
              <span className={styles.dots}>
                {cell.info?.completed > 0 && <span className={styles.dotDone} />}
                {cell.info?.pending > 0 && <span className={styles.dotPending} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
