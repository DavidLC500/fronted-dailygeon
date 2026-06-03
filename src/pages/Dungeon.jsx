/**
 * Dungeon.jsx
 * Pantalla principal de misiones: lista de TaskCards, crear/editar mision en
 * un modal, completar (otorga XP, celebra subida de nivel y refresca el
 * personaje), eliminar con confirmacion y estado vacio con llamada a la accion.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useTasks } from '../hooks/useTasks.js';
import { useAuth } from '../hooks/useAuth.js';
import { errorMessage } from '../utils/errorMessage.js';
import AppHeader from '../components/layout/AppHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Loader from '../components/ui/Loader.jsx';
import Modal from '../components/ui/Modal.jsx';
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx';
import TaskCard from '../components/task/TaskCard.jsx';
import TaskForm from '../components/task/TaskForm.jsx';
import LevelUpModal from '../components/character/LevelUpModal.jsx';
import styles from './Dungeon.module.css';

const Dungeon = () => {
  const { t } = useTranslation();
  const { refreshUser } = useAuth();
  const { tasks, loading, error, createTask, updateTask, deleteTask, completeTask } = useTasks();
  /** null | { mode: 'create' } | { mode: 'edit', task } */
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  /** Mision pendiente de confirmar borrado */
  const [confirmTask, setConfirmTask] = useState(null);
  const [deleting, setDeleting] = useState(false);
  /** Nuevo nivel a celebrar (null = sin celebracion) */
  const [levelUp, setLevelUp] = useState(null);

  const handleSubmit = async (form) => {
    setSaving(true);
    try {
      if (modal.mode === 'edit') {
        await updateTask(modal.task._id, form);
        toast.success(t('task.toast.updated'));
      } else {
        await createTask(form);
        toast.success(t('task.toast.created'));
      }
      setModal(null);
    } catch (err) {
      toast.error(errorMessage(t, err));
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async (task) => {
    try {
      const result = await completeTask(task._id);
      toast.success(t('task.toast.completed', { xp: result.xpGained }));
      if (result.levelUp) setLevelUp(result.levelUp.newLevel);
      await refreshUser(); // refleja la nueva XP/nivel en el perfil
    } catch (err) {
      toast.error(errorMessage(t, err));
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteTask(confirmTask._id);
      toast.success(t('task.toast.deleted'));
      setConfirmTask(null);
    } catch (err) {
      toast.error(errorMessage(t, err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.page}>
      <AppHeader title={t('dungeon.title')} />

      <div className={styles.toolbar}>
        <p className={styles.count}>{t('dungeon.tasksCount', { count: tasks.length })}</p>
        <Button variant="secondary" onClick={() => setModal({ mode: 'create' })}>
          + {t('task.new')}
        </Button>
      </div>

      {loading ? (
        <Loader inline />
      ) : error ? (
        <p className={styles.error}>{t('common.error')}: {error}</p>
      ) : tasks.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🗺️</span>
          <p className={styles.emptyText}>{t('dungeon.empty')}</p>
          <Button variant="secondary" onClick={() => setModal({ mode: 'create' })}>
            + {t('task.new')}
          </Button>
        </div>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onComplete={handleComplete}
              onEdit={() => setModal({ mode: 'edit', task })}
              onDelete={() => setConfirmTask(task)}
            />
          ))}
        </div>
      )}

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? t('task.edit') : t('task.new')}
      >
        {modal && (
          <TaskForm
            initial={modal.task}
            onSubmit={handleSubmit}
            loading={saving}
            submitLabel={modal.mode === 'edit' ? t('task.save') : t('task.create')}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirmTask}
        title={t('common.delete')}
        message={t('task.confirmDelete')}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTask(null)}
        loading={deleting}
      />

      <LevelUpModal level={levelUp} onClose={() => setLevelUp(null)} />
    </div>
  );
};

export default Dungeon;
