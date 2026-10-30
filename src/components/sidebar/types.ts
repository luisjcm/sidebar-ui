import type { LucideIcon } from 'lucide-react'

export interface SidebarUser {
  name: string
  role: string
  /** URL de la foto. Si no se pasa, se muestran las iniciales. */
  avatarSrc?: string
}

export interface SidebarNavItem {
  id: string
  label: string
  icon: LucideIcon
  /** Contador/etiqueta que aparece como "badge" azul. */
  badge?: number | string
  /** Si se define, el item se renderiza como <a>. */
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
  icon: LucideIcon
  onClick?: () => void
}
