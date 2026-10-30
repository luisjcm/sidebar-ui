# sidebar-ui

Sidebar colapsable para **React + Tailwind CSS v4**. Está colapsado (solo íconos, 84 px) y se expande
al pasar el mouse o al navegar con teclado (264 px). Incluye tema claro/oscuro, buscador opcional,
badges, botones de acción y un cajón lateral en móvil.

Inspirado en un diseño de [Snake Code](https://snakecode.io), reescrito desde cero con React y Tailwind.

## Probarlo

```bash
npm install
npm run dev
```

Requiere Node 20 o superior.

## Usarlo en otro proyecto

1. Instala las dependencias:
   ```bash
   npm i lucide-react @fontsource-variable/ibm-plex-sans @fontsource/ibm-plex-mono
   ```
2. Copia la carpeta `src/components/sidebar/` a tu proyecto (y `src/hooks/useTheme.ts` si quieres el tema).
3. En tu CSS principal, **después** de `@import 'tailwindcss'`:
   ```css
   @import './components/sidebar/sidebar.css';

   @theme {
     --font-sans: 'IBM Plex Sans Variable', ui-sans-serif, system-ui, sans-serif;
     --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
   }
   ```
4. Importa las fuentes en tu entrada (ver `src/main.tsx`).
5. Úsalo:
   ```tsx
   import { Sidebar } from './components/sidebar'

   <Sidebar user={{ name: 'Tu Nombre', role: 'Developer' }} groups={groups} actions={actions} />
   ```
   El contenido de tu página necesita `md:pl-[132px]` (24 + 84 + 24) para no quedar debajo del sidebar.

> Funciona con Tailwind **v4**. En v3 hay que adaptar la sintaxis `bg-(--variable)` y la variante `sb-open`.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `user` | `{ name, role, avatarSrc? }` | Perfil de la parte superior. Sin `avatarSrc` muestra las iniciales. |
| `groups` | `SidebarNavGroup[]` | Grupos de ítems; entre grupos se dibuja una línea. Cada ítem: `id`, `label`, `icon`, `badge?`, `href?`. |
| `actions` | `SidebarAction[]` | Botones inferiores (columna colapsado, fila expandido). Cada uno: `id`, `label`, `icon`, `onClick?`, `href?`, `download?`. Con `href` se renderiza como enlace (los `http(s)` abren en pestaña nueva). |
| `activeId` / `defaultActiveId` | `string` | Ítem activo, controlado o no controlado. |
| `onSelect` | `(id) => void` | Se llama al elegir un ítem. |
| `linkComponent` | `ElementType` | Componente de enlace para ítems con `href`, p. ej. `Link` de react-router (recibe `to`). Sin él se usa `<a href>`. |
| `showSearch` | `boolean` | Muestra el buscador (por defecto `true`). |
| `showChevron` | `boolean` | Muestra la flecha junto al perfil (por defecto `true`). |
| `searchPlaceholder` / `onSearch` | | Texto y callback del buscador. |
| `mobileMenuLabel` | `string` | Texto accesible del botón de menú en móvil. |
| `className` | `string` | Clases extra para el `<aside>`. |

Si un ítem tiene `href`, se renderiza como enlace; si no, como `<button>`. Los íconos pueden ser de
`lucide-react`, `react-icons` o cualquier componente que acepte `className`.

### Con React Router

```tsx
import { Link, useLocation } from 'react-router-dom'

<Sidebar
  user={user}
  groups={groups}            // ítems con href: '/', '/proyectos'...
  activeId={activeIdFromPath(useLocation().pathname)}
  linkComponent={Link}
  showSearch={false}
/>
```

## Personalización

- **Colores y sombras:** variables `--sb-*` en `sidebar.css`, para claro y `[data-theme='dark']`.
- **Tema:** `useTheme(fallback)` guarda la elección y pone `data-theme` en `<html>`. `fallback` es el tema
  inicial: `'dark'`, `'light'` o `'system'` (por defecto).
- **Usar la paleta de tu web:** redefine las variables `--sb-*` apuntando a tus tokens, por ejemplo
  `html[data-theme] { --sb-surface: var(--color-brand-surface); }` (así lo hace [portafolio-v2](https://github.com/luisjcm/portafolio-v2)).
- **Medidas:** 84 px / 264 px en `Sidebar.tsx`; altura de ítem 56 px.

## Comportamiento

- Escritorio (≥ 768 px): hover o foco por teclado expande el sidebar.
- Móvil (< 768 px): botón de menú que abre un cajón; se cierra con Escape, con el fondo o al elegir un ítem.
- Respeta `prefers-reduced-motion`.
- Si la pantalla es baja, la navegación hace scroll y los botones de abajo siguen visibles.

## Licencia

MIT
