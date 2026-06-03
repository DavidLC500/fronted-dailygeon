/**
 * main.jsx
 * Punto de entrada de la app React. Monta los proveedores globales:
 * enrutador, contexto de autenticacion y notificaciones (toasts).
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AppToaster from './components/ui/AppToaster.jsx';
import App from './App.jsx';

import './i18n.js';
import './styles/variables.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <AppToaster />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
