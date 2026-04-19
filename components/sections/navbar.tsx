'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Como Funciona', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#' },
]

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="brand-gradient flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white">
        IC
      </div>
      <span className="text-xl font-bold tracking-tight text-on-surface">
        Infinity Creators
      </span>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors duration-200 hover:bg-surface-bright/20 hover:text-on-surface"
    >
      {label}
    </a>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9 w-9" />

  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
  const icon =
    theme === 'dark' ? <Moon size={18} /> : theme === 'light' ? <Sun size={18} /> : <Monitor size={18} />
  const label =
    theme === 'dark' ? 'Tema escuro' : theme === 'light' ? 'Tema claro' : 'Tema do sistema'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="cursor-pointer rounded-lg p-2 text-on-surface-variant transition-colors duration-200 hover:bg-surface-bright/20 hover:text-on-surface"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="glass ghost-border sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-6 lg:px-12">
      <Logo />

      <div className="hidden items-center gap-1 lg:flex">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.href + link.label} {...link} />
        ))}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <ThemeToggle />
        <a
          href="#"
          className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-on-surface transition-colors duration-200 hover:bg-surface-bright/20"
        >
          Login
        </a>
        <a
          href="#"
          className="brand-gradient cursor-pointer rounded-lg px-5 py-2 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90"
        >
          Começar Grátis
        </a>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle />
        <button
          type="button"
          className="cursor-pointer text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-16 z-50 flex w-full flex-col gap-2 border-b border-outline-variant/15 bg-background p-6 lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-on-surface-variant transition-colors duration-200 hover:bg-surface-bright/20 hover:text-on-surface"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a href="#" className="rounded-lg px-4 py-3 text-center text-sm font-medium text-on-surface hover:bg-surface-bright/20">
                Login
              </a>
              <a href="#" className="brand-gradient rounded-lg px-5 py-3 text-center text-sm font-bold text-white">
                Começar Grátis
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
