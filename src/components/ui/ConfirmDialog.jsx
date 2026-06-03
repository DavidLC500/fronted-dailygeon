/**
 * ConfirmDialog.jsx
 * Dialogo de confirmacion reutilizable (sustituye al window.confirm nativo).
 * Reutiliza el Modal accesible y muestra acciones cancelar / confirmar.
 */

import { useTranslation } from 'react-i18next';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import styles from './ConfirmDialog.module.css';

const ConfirmDialog = ({ open, title, message, confirmLabel, onConfirm, onCancel, loading }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button variant="secondary" onClick={onConfirm} loading={loading}>
          {confirmLabel || t('common.delete')}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
