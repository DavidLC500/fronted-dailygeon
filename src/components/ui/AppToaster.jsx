/**
 * AppToaster.jsx
 * Contenedor de notificaciones (toasts) con el tema oscuro pixel de la app.
 * Centraliza la configuracion visual de react-hot-toast en un solo sitio.
 */

import { Toaster } from 'react-hot-toast';

const AppToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      style: {
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        border: '2px solid var(--color-border)',
        borderRadius: '0',
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
      },
      success: { iconTheme: { primary: 'var(--color-secondary)', secondary: '#000' } },
      error: { iconTheme: { primary: 'var(--color-accent)', secondary: '#fff' } },
    }}
  />
);

export default AppToaster;
