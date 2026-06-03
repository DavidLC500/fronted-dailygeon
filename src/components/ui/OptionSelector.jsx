/**
 * OptionSelector.jsx
 * Fila de botones de opcion reutilizable (prioridad, categoria, dificultad).
 * El boton activo se rellena con su color; los inactivos solo lo muestran
 * en el borde y el texto. El color es dinamico (dato), por eso va inline.
 */

import styles from './OptionSelector.module.css';

const OptionSelector = ({ label, options, selected, onSelect, getColor, getLabel }) => (
  <div className={styles.section}>
    <span className={styles.label}>{label}</span>
    <div className={styles.row}>
      {options.map((opt) => {
        const color = getColor ? getColor(opt) : 'var(--color-text-muted)';
        const active = selected === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onSelect(opt)}
            className={styles.option}
            style={{
              borderColor: color,
              backgroundColor: active ? color : 'transparent',
              color: active ? '#000' : color,
            }}
          >
            {getLabel ? getLabel(opt) : opt}
          </button>
        );
      })}
    </div>
  </div>
);

export default OptionSelector;
