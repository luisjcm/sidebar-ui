import type { ComponentType } from 'react'

/**
 * Cualquier componente de ícono que acepte className (lucide-react, react-icons, SVG propios...).
 */
export type SidebarIcon = ComponentType<{
  className?: string
  strokeWidth?: number | string
  'aria-hidden'?: boolean | 'true' | 'false'
}>

export interface SidebarUser {
  name: string
  role: string
  /** URL de la foto. Si no se pasa, se muestran las iniciales. */
  avatarSrc?: string
}

export interface SidebarNavItem {
  id: string
  label: string
  icon: SidebarIcon
  /** Contador/etiqueta que aparece como "badge" azul. */
  badge?: number | string
  /**
   * Destino del ítem. Se renderiza como <a href>, o con `linkComponent` (p. ej. el `Link` de
   * react-router) como <Link to>. Sin `href` el ítem es un <button>.
   */
  href?: string
}

/** Cada grupo se separa visualmente del siguiente con una línea fina. */
export interface SidebarNavGroup {
  id: string
  items: SidebarNavItem[]
}

export interface SidebarAction {
  id: string
  label: string
  icon: SidebarIcon
  onClick?: () => void
  /** Si se define, la acción es un enlace <a>. Los http(s) se abren en pestaña nueva. */
  href?: string
  /** Con `href`: descarga el archivo (true o nombre del archivo). */
  download?: boolean | string
}
