/**
 * Dungeon.jsx
 * Pantalla principal: lista de misiones del jugador.
 * (Version inicial: cabecera + recuento + lista. El crear/editar/completar
 * mision se construye en el siguiente bloque.)
 */

import { useTranslation } from 'react-i18next';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api/client.js';
import AppHeader from '../components/layout/AppHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Loader from '../components/ui/Loader.jsx';
import TaskItem from '../components/task/TaskItem.jsx';
import styles from './Dungeon.module.css';

const Dungeon = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(() => api.get('/tasks'));

  return (
    <div className={styles.page}>
      <AppHeader title={t('dungeon.title')} />

      {loading && <Loader inline text={t('common.loading')} />}
      {error && <Card className={styles.error}>{t('common.error')}: {error}</Card>}
      {data && (
        <Card>
          <p className={styles.count}>{t('dungeon.tasksCount', { count: data.tasks.length })}</p>
          <ul className={styles.list}>
            {data.tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default Dungeon;
