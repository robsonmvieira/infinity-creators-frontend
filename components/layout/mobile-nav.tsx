'use client'

import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  Plus,
  TrendingUp,
  User,
} from 'lucide-react'

const MOBILE_ITEMS = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
  { label: 'Stats', href: '/analytics', icon: TrendingUp },
  { label: 'Me', href: '/settings', icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex h-16 items-center justify-around border-t border-outline-variant/10 bg-surface-container-high/90 px-4 backdrop-blur-xl md:hidden">
      {MOBILE_ITEMS.slice(0, 2).map((item) => {
        const Icon = item.icon
        const active = pathname.includes(item.href)
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              active ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {item.label}
            </span>
          </a>
        )
      })}

      <div className="relative -top-6">
        <button
          type="button"
          className="brand-gradient flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-white shadow-lg shadow-primary/20"
          aria-label="Novo post"
        >
          <Plus size={28} />
        </button>
      </div>

      {MOBILE_ITEMS.slice(2).map((item) => {
        const Icon = item.icon
        const active = pathname.includes(item.href)
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              active ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {item.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
