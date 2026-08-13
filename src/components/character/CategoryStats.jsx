/**
 * CategoryStats.jsx
 * Visor de actividad por categoria: una barra segmentada (10 segmentos) por
 * categoria con el numero de misiones completadas. La barra se llena por
 * segmentos y se limita a 10; el contador sigue mostrando el valor real.
 */

import { useTranslation } from 'react-i18next';
import SegmentBar from '../ui/SegmentBar.jsx';
import Icon from '../ui/Icon.jsx';
import { CATEGORIES, CATEGORY_ICON, CATEGORY_COLOR } from '../../utils/taskMeta.js';
import styles from './CategoryStats.module.css';

const CategoryStats = ({ tasks }) => {
  const { t } = useTranslation();

  // Misiones completadas por categoria
  const rows = CATEGORIES.map((cat) => ({
    cat,
    count: tasks.filter((x) => x.category === cat && x.completed).length,
  }));

  return (
    <div className={styles.wrap}>
      {rows.map(({ cat, count }) => (
        <div key={cat} className={styles.row}>
          <span className={styles.label}>
            <Icon name={CATEGORY_ICON[cat]} style={{ color: CATEGORY_COLOR[cat] }} />
            {' '}{t(`task.categories.${cat}`)}
          </span>
          <div className={styles.barWrap}>
            <SegmentBar value={count} segments={10} color={CATEGORY_COLOR[cat]} />
          </div>
          <span className={styles.count}>{count}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryStats;
