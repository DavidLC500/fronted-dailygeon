/**
 * Modal.jsx
 * Dialogo modal reutilizable y accesible. Se cierra al pulsar el fondo,
 * la X o la tecla Escape. Al abrirse toma el foco y al cerrarse lo devuelve
 * al elemento que lo invoco. No renderiza nada si open es false.
 */

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Modal.module.css';

const Modal = ({ open, onClose, title, children }) => {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const prevFocus = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    // Guarda el foco actual, enfoca el dialogo y escucha Escape
    prevFocus.current = document.activeElement;
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevFocus.current?.focus?.(); // devuelve el foco al cerrar
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 id="modal-title" className={styles.title}>{title}</h3>
          <button className={styles.close} onClick={onClose} aria-label={t('common.close')}>✕</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
