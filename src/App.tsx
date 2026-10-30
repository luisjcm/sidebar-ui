import {
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  Network,
  Pin,
  Plus,
  Settings,
  Sun,
  Ticket,
  User,
  UserPen,
  Users,
} from 'lucide-react'
import { Sidebar, type SidebarAction, type SidebarNavGroup } from './components/sidebar'
import { useTheme } from './hooks/useTheme'

const groups: SidebarNavGroup[] = [
  {
    id: 'main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'support', label: 'Support', icon: User },
      { id: 'customers', label: 'Customers', icon: Users },
      { id: 'tickets', label: 'Tickets', icon: Ticket },
    ],
  },
  {
    id: 'work',
    items: [
      { id: 'tasks', label: 'Tasks', icon: Pin, badge: 2 },
      { id: 'projects', label: 'Projects', icon: Network },
      { id: 'application', label: 'Application', icon: Mail },
      { id: 'users', label: 'User Management', icon: UserPen },
    ],
  },
]

export default function App() {
  const { theme, toggle } = useTheme()

  const actions: SidebarAction[] = [
    {
      id: 'theme',
      label: theme === 'dark' ? 'Tema claro' : 'Tema oscuro',
      icon: theme === 'dark' ? Sun : Moon,
      onClick: toggle,
    },
    { id: 'settings', label: 'Ajustes', icon: Settings },
    { id: 'add', label: 'Nuevo', icon: Plus },
    { id: 'logout', label: 'Salir', icon: LogOut },
  ]

  return (
    <div className="min-h-screen bg-(--sb-page) bg-[linear-gradient(120deg,var(--sb-sheen),transparent_55%)] font-sans text-(--sb-text) transition-colors duration-300">
      <Sidebar user={{ name: 'Ananya Sharma', role: 'Admin' }} groups={groups} actions={actions} />

      {/* Lienzo en blanco: en escritorio deja 132px a la izquierda (24 + 84 + 24) */}
      <main className="min-h-screen pt-20 md:pt-0 md:pl-[132px]" />
    </div>
  )
}
