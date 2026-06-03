/**
 * Boss.jsx
 * Pantalla del jefe semanal: ficha del jefe actual (se crea solo si no existe)
 * y el historial de jefes anteriores. El jefe pierde vida al completar misiones.
 */

import { useTranslation } from 'react-i18next';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api/client.js';
import AppHeader from '../components/layout/AppHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Loader from '../components/ui/Loader.jsx';
import BossCard from '../components/boss/BossCard.jsx';
import styles from './Boss.module.css';

/** Dias que quedan de la semana actual (lunes=7 ... domingo=1) */
const daysLeftInWeek = () => 7 - ((new Date().getDay() + 6) % 7);

const Boss = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(() => api.get('/bosses/my-run'));
  const { data: histData } = useApi(() => api.get('/bosses/history'));

  const history = histData?.history || [];

  return (
    <div className={styles.page}>
      <AppHeader title={t('boss.title')} />

      {loading ? (
        <Loader inline />
      ) : error ? (
        <p className={styles.error}>{t('common.error')}: {error}</p>
      ) : (
        <>
          <BossCard run={data.run} daysLeft={daysLeftInWeek()} />

          <h2 className={styles.section}>{t('boss.history')}</h2>
          {history.length === 0 ? (
            <p className={styles.empty}>{t('boss.noHistory')}</p>
          ) : (
            <Card>
              <ul className={styles.list}>
                {history.map((run) => (
                  <li key={run._id} className={styles.item}>
                    <span className={styles.emoji}>{run.boss.emoji}</span>
                    <span className={styles.name}>{run.boss.name}</span>
                    <span className={styles.status}>{t(`boss.status.${run.status}`)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default Boss;
