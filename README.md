# Dailygeon — Frontend

Interfaz web de **Dailygeon**, una aplicación que convierte tus tareas diarias en una aventura RPG con estética pixel: creas misiones, las completas para ganar XP, subes de nivel y debilitas al jefe semanal.

Este repositorio contiene únicamente el **frontend**. La API está en su propio repositorio.

## Tecnologías

- **React** + **Vite**
- **React Router** (enrutado y rutas protegidas)
- **react-i18next** (internacionalización español / inglés)
- **react-hot-toast** (notificaciones)
- **CSS Modules** + variables CSS (design system propio)

## Arquitectura

Arquitectura componentizada: la UI repetida vive en componentes reutilizables y las páginas solo orquestan. Sin estilos en línea (salvo los que dependen de un dato) ni textos hardcodeados (todo pasa por i18n).

```
src/
├── main.jsx / App.jsx     # Entrada y árbol de rutas
├── styles/                # variables.css (tema) + global.css
├── api/client.js          # Cliente HTTP con token JWT automático
├── context/               # AuthContext (sesión)
├── hooks/                 # useAuth, useApi (useReducer), useTasks
├── components/
│   ├── ui/                # Button, Input, Card, Modal, StatBar,
│   │                      # OptionSelector, Loader, LanguageToggle, ConfirmDialog
│   ├── task/              # TaskCard, TaskForm, PriorityBadge
│   ├── character/         # StatBox, ClassSelector, LevelUpModal
│   ├── calendar/          # CalendarGrid
│   ├── boss/              # BossCard
│   └── layout/            # AppHeader, NavBar, AppLayout
├── pages/                 # Login, Register, CreateCharacter, Dungeon,
│                          # Calendar, Boss, Character, Settings
├── locales/               # es.json / en.json (textos)
└── utils/                 # taskMeta, errorMessage
```

### Decisiones técnicas

- **Estado de sesión** con Context + custom hooks (`useAuth`).
- **Hooks avanzados**: `useApi` y `useTasks` usan `useReducer` para gestionar los estados de carga/error/datos.
- **i18n** con ficheros JSON por idioma; el idioma se detecta del navegador y se guarda en `localStorage`. Los errores del backend llegan como código (`INVALID_CREDENTIALS`...) y se traducen en el cliente.
- **Accesibilidad**: foco visible, Modal con Escape y gestión de foco, targets táctiles de 44px, `lang` sincronizado con el idioma.

## Flujo de usuario

1. **Registro / Login**.
2. **Crear personaje** (nombre + clase).
3. **Dungeon**: crear, editar, completar y borrar misiones. Completar otorga XP (y puede subir de nivel).
4. **Calendario**: ver las misiones por día.
5. **Jefe semanal**: el jefe pierde vida al completar misiones.
6. **Personaje**: nivel, barra de XP y estadísticas.
7. **Ajustes**: idioma y datos de la cuenta.

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el .env a partir del ejemplo
cp .env.example .env   # apunta VITE_API_URL a tu backend

# 3. Arrancar en desarrollo (necesita el backend en marcha)
npm run dev
```

Abre `http://localhost:5173`. Usuario de prueba (con el seed del backend): `aria@dailygeon.com` / `password123`.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API (ej. `http://localhost:4000/api`) |

## Despliegue (Vercel)

El repositorio incluye `vercel.json` (reescrituras para que el enrutado del lado del cliente funcione). En Vercel:

1. Importar el repositorio.
2. Framework: **Vite** · Build: `npm run build` · Output: `dist`.
3. Añadir la variable `VITE_API_URL` con la URL del backend desplegado.
