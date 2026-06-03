/**
 * App.jsx
 * Define el arbol de rutas de la aplicacion.
 * Rutas publicas (login/registro) y rutas protegidas que requieren sesion.
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateCharacter from './pages/CreateCharacter.jsx';
import Dungeon from './pages/Dungeon.jsx';

const App = () => (
  <Routes>
    {/* Publicas */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protegidas */}
    <Route element={<ProtectedRoute />}>
      <Route path="/create-character" element={<CreateCharacter />} />
      <Route path="/" element={<Dungeon />} />
    </Route>

    {/* Cualquier otra ruta vuelve al inicio */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
