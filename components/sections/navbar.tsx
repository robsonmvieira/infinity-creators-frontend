'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="glass ghost-border sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-6 md:px-12">
      <Logo />

      <div className="hidden items-center gap-1 md:flex">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.href + link.label} {...link} />
        ))}
      </div>

      <div className="hidden items-center gap-3 md:flex">
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

      <button
        type="button"
        className="cursor-pointer text-on-surface md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <div className="glass ghost-border absolute left-0 top-16 flex w-full flex-col gap-2 border-b p-6 md:hidden">
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
      )}
    </nav>
  )
}
