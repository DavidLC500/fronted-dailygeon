/**
 * LevelUpModal.jsx
 * Celebracion al subir de nivel: muestra el nuevo nivel a gran tamano.
 * Se abre cuando level no es null (lo controla la pantalla que completa
 * la mision). Refuerza la mecanica de progresion del juego.
 */

import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal.jsx';
import styles from './LevelUpModal.module.css';

const LevelUpModal = ({ level, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal open={level != null} onClose={onClose} title={t('character.leveledUp')}>
      <div className={styles.body}>
        <span className={styles.star}>⭐</span>
        <span className={styles.level}>{t('character.levelUp', { level })}</span>
      </div>
    </Modal>
  );
};

export default LevelUpModal;
