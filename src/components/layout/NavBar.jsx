/**
 * NavBar.jsx
 * Barra de navegacion inferior con las secciones principales de la app.
 * El enlace activo se resalta automaticamente (NavLink).
 */

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NavBar.module.css';

/** Secciones de la app (icono + clave de traduccion + ruta) */
const ITEMS = [
  { to: '/', icon: '⚔️', key: 'dungeon', end: true },
  { to: '/calendar', icon: '📅', key: 'calendar' },
  { to: '/boss', icon: '👹', key: 'boss' },
  { to: '/character', icon: '🧙', key: 'character' },
  { to: '/settings', icon: '⚙️', key: 'settings' },
];

const NavBar = () => {
  const { t } = useTranslation();
  const linkClass = ({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`;

  return (
    <nav className={styles.nav}>
      {ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
          <span className={styles.icon}>{item.icon}</span>
          {t(`nav.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
