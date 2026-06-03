/**
 * App.jsx
 * Define el arbol de rutas de la aplicacion.
 * Rutas publicas (login/registro) y rutas protegidas. Las pantallas internas
 * comparten AppLayout (con navegacion); la creacion de personaje va aparte.
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateCharacter from './pages/CreateCharacter.jsx';
import Dungeon from './pages/Dungeon.jsx';
import Calendar from './pages/Calendar.jsx';
import Boss from './pages/Boss.jsx';
import Character from './pages/Character.jsx';
import Settings from './pages/Settings.jsx';

const App = () => (
  <Routes>
    {/* Publicas */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protegidas */}
    <Route element={<ProtectedRoute />}>
      <Route path="/create-character" element={<CreateCharacter />} />
      {/* Pantallas internas con navegacion */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dungeon />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/boss" element={<Boss />} />
        <Route path="/character" element={<Character />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Route>

    {/* Cualquier otra ruta vuelve al inicio */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
