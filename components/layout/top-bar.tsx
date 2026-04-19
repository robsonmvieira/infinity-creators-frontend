'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Search, Bell, Sun, Moon, Monitor, User } from 'lucide-react'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9 w-9" />

  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
  const icon =
    theme === 'dark' ? <Moon size={20} /> : theme === 'light' ? <Sun size={20} /> : <Monitor size={20} />
  const label =
    theme === 'dark' ? 'Tema escuro' : theme === 'light' ? 'Tema claro' : 'Tema do sistema'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="cursor-pointer rounded-full p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-bright/50 hover:text-on-surface"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  )
}

export function TopBar() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background/80 px-6 shadow-[0_8px_32px_0_rgba(163,166,255,0.08)] backdrop-blur-2xl">
      <div className="flex items-center gap-8">
        <span className="text-brand-gradient text-xl font-black tracking-tight md:hidden">
          Infinity Creators
        </span>
        <div className="hidden items-center gap-1 rounded-full border border-outline-variant/10 bg-surface-container px-4 py-1.5 lg:flex">
          <Search size={14} className="text-on-surface-variant" />
          <input
            className="w-48 border-none bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-0"
            placeholder="Search strategy..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-full p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-bright/50 hover:text-on-surface"
          aria-label="Notificações"
        >
          <Bell size={20} />
        </button>
        <ThemeToggle />
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-surface-container transition-transform hover:scale-105">
          <User size={16} className="text-on-surface-variant" />
        </div>
      </div>
    </header>
  )
}
