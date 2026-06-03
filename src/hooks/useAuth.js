/**
 * useAuth.js
 * Hook de acceso al contexto de autenticacion.
 * Evita repetir useContext(AuthContext) en cada componente.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/auth-context.js';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
