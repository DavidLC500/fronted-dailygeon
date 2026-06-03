/**
 * CategoryStats.jsx
 * Visor de actividad por categoria: una barra por categoria con el numero
 * de misiones completadas, proporcional al maximo. Inspirado en el resumen
 * de actividad del Dailygeon original.
 */

import { useTranslation } from 'react-i18next';
import StatBar from '../ui/StatBar.jsx';
import { CATEGORIES, CATEGORY_ICON, CATEGORY_COLOR } from '../../utils/taskMeta.js';
import styles from './CategoryStats.module.css';

const CategoryStats = ({ tasks }) => {
  const { t } = useTranslation();

  // Misiones completadas por categoria
  const rows = CATEGORIES.map((cat) => ({
    cat,
    count: tasks.filter((x) => x.category === cat && x.completed).length,
  }));
  const max = Math.max(...rows.map((r) => r.count), 1);

  return (
    <div className={styles.wrap}>
      {rows.map(({ cat, count }) => (
        <div key={cat} className={styles.row}>
          <span className={styles.label}>{CATEGORY_ICON[cat]} {t(`task.categories.${cat}`)}</span>
          <div className={styles.barWrap}>
            <StatBar percent={(count / max) * 100} color={CATEGORY_COLOR[cat]} />
          </div>
          <span className={styles.count}>{count}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryStats;
