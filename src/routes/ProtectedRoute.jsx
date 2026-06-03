/**
 * ProtectedRoute.jsx
 * Protege rutas que requieren sesion. Si el usuario no esta logueado,
 * lo redirige al login. Mientras se restaura la sesion muestra un cargando.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/ui/Loader.jsx';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return <Loader text={t('common.loadingSession')} />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
