/**
 * AppLayout.jsx
 * Estructura de las pantallas internas: contenido + barra de navegacion.
 * Exige que el usuario tenga personaje; si no, lo manda a crearlo.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import NavBar from './NavBar.jsx';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  const { user } = useAuth();

  // Sin personaje no se puede usar la app: redirige a crearlo
  if (!user.character) return <Navigate to="/create-character" replace />;

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};

export default AppLayout;
