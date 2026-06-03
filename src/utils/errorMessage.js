/**
 * errorMessage.js
 * Traduce un error de la API a un mensaje legible segun el idioma activo.
 * Usa el codigo estable del backend (err.code) para buscar en 'errors.*';
 * si no hay traduccion, cae al mensaje del backend o a un texto generico.
 *
 * Uso: toast.error(errorMessage(t, err));
 */

export const errorMessage = (t, err) =>
  t(`errors.${err?.code || 'default'}`, {
    defaultValue: err?.message || t('errors.default'),
  });
