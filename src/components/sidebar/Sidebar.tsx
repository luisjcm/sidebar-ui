import { useEffect, useId, useState, type CSSProperties, type ElementType } from 'react'
import { ChevronDown, Menu, Search } from 'lucide-react'
import type { SidebarAction, SidebarNavGroup, SidebarNavItem, SidebarUser } from './types'

export interface SidebarProps {
  user: SidebarUser
  groups: SidebarNavGroup[]
  /** Botones inferiores. Colapsado: columna · Expandido: fila. */
  actions?: SidebarAction[]
  /** Item activo (modo controlado). */
  activeId?: string
  /** Item activo inicial (modo no controlado). */
  defaultActiveId?: string
  onSelect?: (id: string) => void
  /**
   * Componente de enlace para los ítems con `href` (p. ej. `Link` de react-router).
   * Recibe `to={item.href}` en lugar de `href`.
   */
  linkComponent?: ElementType
  /** Muestra el buscador (por defecto sí). */
  showSearch?: boolean
  /** Muestra la flecha junto al perfil (por defecto sí). */
  showChevron?: boolean
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  /** Texto accesible del botón de menú en móvil. */
  mobileMenuLabel?: string
  /** Clases extra para el <aside> (posición, etc.). */
  className?: string
}

const transition = 'duration-350 ease-[ease]'

export function Sidebar({
  user,
  groups,
  actions = [],
  activeId,
  defaultActiveId,
  onSelect,
  linkComponent,
  showSearch = true,
  showChevron = true,
  searchPlaceholder = 'Search dashboard',
  onSearch,
  mobileMenuLabel = 'Abrir menú',
  className = '',
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const asideId = useId()

  const [internalActive, setInternalActive] = useState(defaultActiveId ?? groups[0]?.items[0]?.id)
  const current = activeId ?? internalActive

  const select = (id: string) => {
    setInternalActive(id)
    onSelect?.(id)
    setMobileOpen(false)
  }

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <>
      {/* Móvil: botón + fondo oscuro. En escritorio no existen. */}
      <button
        type="button"
        aria-label={mobileMenuLabel}
        aria-expanded={mobileOpen}
        aria-controls={asideId}
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 grid size-11 cursor-pointer place-items-center rounded-xl border-0 bg-(--sb-surface) text-(--sb-text) shadow-(--sb-shadow) ring-1 ring-(--sb-border) md:hidden"
      >
        <Menu aria-hidden strokeWidth={1.75} className="size-5" />
      </button>
      <div
        aria-hidden
        onClick={() => setMobileOpen(false)}
        className={[
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />

      <aside
        id={asideId}
        data-sidebar
        data-mobile-open={mobileOpen}
        className={[
          'fixed top-6 bottom-8 left-6 z-30 flex w-[84px] flex-col gap-4 overflow-hidden whitespace-nowrap',
          'rounded-3xl bg-(--sb-surface) p-5 font-sans text-(--sb-text) shadow-(--sb-shadow)',
          'ring-1 ring-(--sb-border) transition-[width,translate,visibility,background-color,box-shadow]',
          transition,
          'hover:w-[264px] has-[:focus-visible]:w-[264px]',
          // móvil: cajón lateral siempre a 264px, oculto hasta abrirlo
          'max-md:top-3 max-md:bottom-3 max-md:left-3 max-md:z-50 max-md:w-[264px] max-md:invisible max-md:-translate-x-[calc(100%+24px)]',
          'max-md:data-[mobile-open=true]:visible max-md:data-[mobile-open=true]:translate-x-0',
          className,
        ].join(' ')}
      >
        {/* Perfil */}
        <div className="flex items-center gap-3.5">
          <Avatar user={user} />
          <div
            className={[
              'min-w-0 flex-1 leading-tight opacity-0 transition-opacity duration-150',
              'sb-open:opacity-100 sb-open:delay-100 sb-open:duration-250',
            ].join(' ')}
          >
            <p className="m-0 truncate text-[15px] font-semibold">{user.name}</p>
            <p className="m-0 mt-1 truncate font-mono text-[11px] tracking-wider text-(--sb-muted) uppercase">
              {user.role}
            </p>
          </div>
          {showChevron && (
            <ChevronDown
              aria-hidden
              strokeWidth={1.75}
              className="size-5 shrink-0 text-(--sb-muted) opacity-0 transition-opacity duration-150 sb-open:opacity-100 sb-open:delay-100 sb-open:duration-250"
            />
          )}
        </div>

        {/* Búsqueda */}
        {showSearch && (
          <div
            role="search"
            className={[
              'relative flex h-11 w-11 flex-none items-center rounded-[10px] border border-(--sb-border)',
              'transition-[width]',
              transition,
              'sb-open:w-full',
            ].join(' ')}
          >
            <input
              type="search"
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className={[
                'absolute inset-0 h-full w-full rounded-[inherit] border-0 bg-transparent',
                'py-0 pr-11 pl-3.5 text-sm text-(--sb-text) opacity-0 outline-0',
                'placeholder:text-(--sb-muted) transition-opacity duration-150',
                'sb-open:opacity-100 sb-open:delay-100 sb-open:duration-250',
                '[&::-webkit-search-cancel-button]:hidden',
              ].join(' ')}
            />
            <Search
              aria-hidden
              strokeWidth={1.75}
              className="pointer-events-none absolute top-1/2 right-[11px] size-[22px] -translate-y-1/2 text-(--sb-muted)"
            />
          </div>
        )}

        {/* Navegación */}
        <nav
          aria-label="Principal"
          className="-mx-5 flex min-h-0 flex-1 flex-col overflow-y-auto px-5 [scrollbar-width:none] [mask-image:linear-gradient(to_bottom,#000_calc(100%-28px),transparent)] [&::-webkit-scrollbar]:hidden"
        >
          {groups.map((group, i) => (
            <div key={group.id} className="flex flex-col">
              {i > 0 && <hr className="my-3 h-px border-0 bg-(--sb-border)" />}
              {group.items.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  active={item.id === current}
                  onSelect={select}
                  linkComponent={linkComponent}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Acciones */}
        {actions.length > 0 && (
          <div
            style={{ '--n': actions.length } as CSSProperties}
            className={[
              'relative mt-auto h-[calc(var(--n)*52px_-_8px)] shrink-0 transition-[height]',
              transition,
              'sb-open:h-11',
            ].join(' ')}
          >
            {actions.map((action, i) => {
              const props = {
                title: action.label,
                'aria-label': action.label,
                onClick: action.onClick,
                style: { '--i': i } as CSSProperties,
                className: [
                  'absolute left-0 top-[calc((var(--n)_-_1_-_var(--i))*52px)] grid size-11 cursor-pointer place-items-center',
                  'rounded-[10px] border-0 bg-(--sb-chip) p-0 text-(--sb-soft) no-underline',
                  'transition-[top,left,color]',
                  transition,
                  'hover:text-(--sb-accent) focus-visible:outline-2 focus-visible:outline-(--sb-ring)',
                  'sb-open:top-0 sb-open:left-[calc(var(--i)*60px)]',
                ].join(' '),
              }
              const icon = <action.icon aria-hidden strokeWidth={1.75} className="size-5" />

              if (action.href) {
                const external = /^https?:\/\//.test(action.href)
                return (
                  <a
                    key={action.id}
                    href={action.href}
                    download={action.download}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    {...props}
                  >
                    {icon}
                  </a>
                )
              }
              return (
                <button key={action.id} type="button" {...props}>
                  {icon}
                </button>
              )
            })}
          </div>
        )}
      </aside>
    </>
  )
}

function NavItem({
  item,
  active,
  onSelect,
  linkComponent,
}: {
  item: SidebarNavItem
  active: boolean
  onSelect: (id: string) => void
  linkComponent?: ElementType
}) {
  const Tag: ElementType = item.href ? (linkComponent ?? 'a') : 'button'
  const target = item.href
    ? linkComponent
      ? { to: item.href }
      : { href: item.href }
    : { type: 'button' as const }
  return (
    <Tag
      {...target}
      title={item.label}
      aria-current={active ? 'page' : undefined}
      data-active={active}
      onClick={() => onSelect(item.id)}
      className={[
        'group/item relative flex h-14 w-full cursor-pointer items-center gap-4 border-0 bg-transparent p-0 text-left',
        'text-(--sb-soft) no-underline transition-colors duration-200',
        'hover:text-(--sb-accent) data-[active=true]:text-(--sb-accent)',
        'outline-none focus-visible:before:ring-2 focus-visible:before:ring-(--sb-ring)',
        // "pill" de fondo: 44×44 colapsado → 100%×56 expandido
        "before:absolute before:top-1/2 before:left-0 before:h-11 before:w-11 before:-translate-y-1/2 before:rounded-xl before:content-['']",
        'before:transition-[width,height,background-color] before:duration-350 before:ease-[ease]',
        'sb-open:before:h-14 sb-open:before:w-full',
        'data-[active=true]:before:bg-(--sb-active)',
      ].join(' ')}
    >
      <item.icon
        aria-hidden
        strokeWidth={1.75}
        className="relative mx-[11px] size-[22px] shrink-0"
      />
      <span
        className={[
          'relative text-[15px] font-medium opacity-0 transition-opacity duration-150',
          'sb-open:opacity-100 sb-open:delay-100 sb-open:duration-250',
        ].join(' ')}
      >
        {item.label}
      </span>
      {item.badge !== undefined && (
        <span
          className={[
            'absolute top-2 -right-3 grid h-[22px] min-w-[22px] place-items-center rounded-full bg-(--sb-accent) px-1.5',
            'font-mono text-[11px] font-medium text-white [translate:0_0]',
            'transition-[top,right,translate] duration-350 ease-[ease]',
            'sb-open:top-1/2 sb-open:right-2 sb-open:[translate:0_-50%]',
          ].join(' ')}
        >
          {item.badge}
        </span>
      )}
    </Tag>
  )
}

function Avatar({ user }: { user: SidebarUser }) {
  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return user.avatarSrc ? (
    <img src={user.avatarSrc} alt="" className="size-11 shrink-0 rounded-full object-cover" />
  ) : (
    <span
      aria-hidden
      className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#007aff] to-[#5ac8fa] text-sm font-semibold text-white"
    >
      {initials}
    </span>
  )
}
