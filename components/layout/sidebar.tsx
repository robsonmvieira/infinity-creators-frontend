'use client'

import {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  Archive,
  Fingerprint,
  Globe,
  TrendingUp,
  Settings,
  Plus,
} from 'lucide-react'
import { Link, usePathname } from '@/src/i18n/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Create Content', href: '/create', icon: Sparkles },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
  { label: 'Library', href: '/library', icon: Archive },
  { label: 'Brand & DNA', href: '/brand', icon: Fingerprint },
  { label: 'Social Accounts', href: '/social', icon: Globe },
  { label: 'Analytics', href: '/analytics', icon: TrendingUp },
  { label: 'Settings', href: '/settings', icon: Settings },
]

function SidebarLogo() {
  return (
    <div className="mb-10 flex items-center gap-3 px-2">
      <div className="brand-gradient flex h-8 w-8 items-center justify-center rounded-lg">
        <span className="text-sm font-black text-white">IC</span>
      </div>
      <div>
        <h1 className="text-lg font-bold leading-tight text-on-surface">The Atelier</h1>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-on-surface-variant">
          Pro Workspace
        </p>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number }>
  active: boolean
}

function NavItem({ href, label, icon: Icon, active }: Readonly<NavItemProps>) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
        active
          ? 'bg-surface-container text-primary shadow-[0_0_15px_rgba(163,166,255,0.1)]'
          : 'text-on-surface-variant hover:translate-x-1 hover:bg-surface-container hover:text-on-surface'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-full w-64 flex-col border-r border-outline-variant/15 bg-background px-4 py-8 md:flex">
      <SidebarLogo />

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname.includes(item.href)}
          />
        ))}
      </nav>

      <button
        type="button"
        className="brand-gradient mt-auto flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
      >
        <Plus size={20} />
        <span>New Post</span>
      </button>
    </aside>
  )
}
