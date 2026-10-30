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
| `actions` | `SidebarAction[]` | Botones inferiores (columna colapsado, fila expandido). Cada uno: `id`, `label`, `icon`, `onClick?`. |
| `activeId` / `defaultActiveId` | `string` | Ítem activo, controlado o no controlado. |
| `onSelect` | `(id) => void` | Se llama al elegir un ítem. |
| `showSearch` | `boolean` | Muestra el buscador (por defecto `true`). |
| `searchPlaceholder` / `onSearch` | | Texto y callback del buscador. |
| `mobileMenuLabel` | `string` | Texto accesible del botón de menú en móvil. |
| `className` | `string` | Clases extra para el `<aside>`. |

Si un ítem tiene `href`, se renderiza como `<a>` (útil con tu router); si no, como `<button>`.

## Personalización

- **Colores y sombras:** variables `--sb-*` en `sidebar.css`, para claro y `[data-theme='dark']`.
- **Tema:** `useTheme()` guarda la elección y pone `data-theme` en `<html>`.
- **Medidas:** 84 px / 264 px en `Sidebar.tsx`; altura de ítem 56 px.

## Comportamiento

- Escritorio (≥ 768 px): hover o foco por teclado expande el sidebar.
- Móvil (< 768 px): botón de menú que abre un cajón; se cierra con Escape, con el fondo o al elegir un ítem.
- Respeta `prefers-reduced-motion`.
- Si la pantalla es baja, la navegación hace scroll y los botones de abajo siguen visibles.

## Licencia

MIT
