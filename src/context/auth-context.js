/**
 * auth-context.js
 * Define el objeto de contexto de autenticacion por separado para no mezclar
 * la exportacion del contexto con la del componente Provider (Fast Refresh).
 */

import { createContext } from 'react';

export const AuthContext = createContext(null);
