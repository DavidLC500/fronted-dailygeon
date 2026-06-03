/**
 * main.jsx
 * Punto de entrada de la app React. Monta los proveedores globales:
 * enrutador, contexto de autenticacion y notificaciones (toasts).
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx';

import './i18n.js';
import './styles/variables.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{ style: { fontFamily: 'var(--font-body)', fontSize: '13px' } }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
