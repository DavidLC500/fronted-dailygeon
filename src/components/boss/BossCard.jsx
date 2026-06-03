/**
 * BossCard.jsx
 * Ficha del jefe semanal: emoji, nombre, estado, barra de HP (si esta activo),
 * dias restantes y descripcion. El color de la barra cambia segun la vida.
 */

import { useTranslation } from 'react-i18next';
import Card from '../ui/Card.jsx';
import StatBar from '../ui/StatBar.jsx';
import styles from './BossCard.module.css';

/** Color de la barra de HP segun el porcentaje restante */
const hpColor = (pct) => {
  if (pct > 60) return 'var(--color-success)';
  if (pct > 30) return 'var(--color-secondary)';
  return 'var(--color-accent)';
};

const BossCard = ({ run, daysLeft }) => {
  const { t } = useTranslation();
  const pct = run.maxHP > 0 ? (run.currentHP / run.maxHP) * 100 : 0;

  return (
    <Card className={styles.card}>
      <span className={styles.emoji}>{run.boss.emoji}</span>
      <h2 className={styles.name}>{run.boss.name}</h2>
      <span className={styles.status}>{t(`boss.status.${run.status}`)}</span>

      {run.status === 'active' && (
        <>
          <StatBar percent={pct} color={hpColor(pct)} height={16} />
          <p className={styles.hp}>{run.currentHP} / {run.maxHP} HP</p>
          <p className={styles.days}>{t('boss.daysLeft', { days: daysLeft })}</p>
        </>
      )}
      {run.status === 'defeated' && (
        <p className={styles.reward}>{t('boss.reward', { xp: run.boss.rewardXP })}</p>
      )}

      <p className={styles.desc}>{run.boss.description}</p>
    </Card>
  );
};

export default BossCard;
