/**
 * AuthContext.jsx
 * Estado global de autenticacion. Guarda el usuario logueado, restaura la
 * sesion al cargar la app (si hay token) y expone login/register/logout.
 */

import { useState, useEffect, useCallback } from 'react';
import { api, setToken, clearToken, getToken } from '../api/client.js';
import { AuthContext } from './auth-context.js';

export const AuthProvider = ({ children }) => {
  /** Usuario autenticado (con su personaje) o null */
  const [user, setUser] = useState(null);
  /** true mientras se comprueba la sesion guardada al arrancar */
  const [loading, setLoading] = useState(true);

  // Al cargar la app: si hay token, recupera el usuario actual
  useEffect(() => {
    const restore = async () => {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user } = await api.get('/auth/me');
        setUser(user);
      } catch {
        clearToken(); // token invalido o expirado
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  /** Inicia sesion, guarda el token y carga el usuario con su personaje poblado */
  const login = useCallback(async (email, password) => {
    const { token } = await api.post('/auth/login', { email, password });
    setToken(token);
    // /me devuelve el usuario con el personaje poblado (login solo da el id)
    const { user } = await api.get('/auth/me');
    setUser(user);
    return user;
  }, []);

  /** Registra una cuenta nueva y la deja logueada */
  const register = useCallback(async (username, email, password) => {
    const { token } = await api.post('/auth/register', { username, email, password });
    setToken(token);
    const { user } = await api.get('/auth/me');
    setUser(user);
    return user;
  }, []);

  /** Cierra sesion */
  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  /** Recarga los datos del usuario (p. ej. tras crear/editar personaje) */
  const refreshUser = useCallback(async () => {
    const { user } = await api.get('/auth/me');
    setUser(user);
    return user;
  }, []);

  const value = { user, loading, login, register, logout, refreshUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
