/**
 * client.js
 * Cliente HTTP centralizado para hablar con la API de Dailygeon.
 * Anade automaticamente el token JWT (si existe) y normaliza los errores
 * para que las pantallas reciban siempre un Error con mensaje legible.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const TOKEN_KEY = 'dailygeon_token';

/** Lee el token guardado en localStorage */
export const getToken = () => localStorage.getItem(TOKEN_KEY);
/** Guarda el token de sesion */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
/** Elimina el token (logout) */
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Realiza una peticion a la API.
 * Lanza un Error con el mensaje del backend si la respuesta no es 2xx.
 */
const request = async (method, path, body) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  // 204 No Content u otras respuestas sin cuerpo
  const data = res.status !== 204 ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    // Adjunta el codigo estable del backend para que el frontend lo traduzca
    const error = new Error(data?.message || `Error ${res.status}`);
    error.code = data?.code;
    error.status = res.status;
    throw error;
  }
  return data;
};

/** Atajos por verbo HTTP */
export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  patch: (path, body) => request('PATCH', path, body),
  del: (path) => request('DELETE', path),
};
