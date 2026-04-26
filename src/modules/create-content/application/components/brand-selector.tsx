'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Fingerprint } from 'lucide-react'
import type { BrandListItem } from '@modules/brand-dna/application/types'

interface BrandSelectorProps {
  brands: BrandListItem[]
  selectedId: string | undefined
  onSelect: (id: string) => void
}

export function BrandSelector({ brands, selectedId, onSelect }: Readonly<BrandSelectorProps>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const selected = brands.find((b) => b.id === selectedId)

  if (brands.length === 0) return null

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2.5 rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 transition-colors hover:border-primary/30"
      >
        <Fingerprint size={16} className="text-primary" />
        <span className="text-sm font-medium text-on-surface">
          {selected?.name ?? 'Selecionar marca'}
        </span>
        <ChevronDown
          size={14}
          className={`text-on-surface-variant transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-outline-variant/10 bg-surface-container-high p-1.5 shadow-xl">
          {brands.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => { onSelect(brand.id); setOpen(false) }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-bright ${
                brand.id === selectedId ? 'bg-surface-bright' : ''
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-on-surface">
                  {brand.name}
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  {brand.language}{brand.isActive ? ' · Ativa' : ''}
                </p>
              </div>
              {brand.id === selectedId && (
                <Check size={14} className="shrink-0 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
