/**
 * taskMeta.js
 * Metadatos compartidos de las misiones: listas de valores, iconos, colores
 * y XP por dificultad. Centralizado para que TaskCard y TaskForm usen la
 * misma fuente de verdad (las etiquetas de texto vienen de i18n).
 */

export const PRIORITIES = ['low', 'medium', 'high', 'critical'];
export const CATEGORIES = ['general', 'work', 'health', 'fitness', 'learning'];
export const DIFFICULTIES = ['easy', 'normal', 'hard', 'legendary'];

/** Iconos por categoria (nombre de icono en public/icons) */
export const CATEGORY_ICON = {
  health: 'heart', work: 'briefcase', learning: 'open-book', fitness: 'weight-lifting-up', general: 'house',
};

/** Iconos por dificultad (nombre de icono en public/icons) */
export const DIFFICULTY_ICON = {
  easy: 'seedling', normal: 'broadsword', hard: 'fire', legendary: 'skull',
};

/** XP que otorga cada dificultad (para mostrar en el formulario) */
export const DIFFICULTY_XP = { easy: 10, normal: 20, hard: 50, legendary: 100 };

/** Color por categoria (variables CSS del tema) */
export const CATEGORY_COLOR = {
  health: 'var(--cat-health)', work: 'var(--cat-work)', learning: 'var(--cat-learning)',
  fitness: 'var(--cat-fitness)', general: 'var(--cat-general)',
};

/** Color por prioridad */
export const PRIORITY_COLOR = {
  low: '#6b7280', medium: '#3b82f6', high: '#f59e0b', critical: '#ef4444',
};

/** Color por dificultad */
export const DIFFICULTY_COLOR = {
  easy: '#22c55e', normal: '#3b82f6', hard: '#f59e0b', legendary: '#a855f7',
};
