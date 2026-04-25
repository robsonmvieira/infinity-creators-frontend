'use client'

import { useState, useRef, useEffect } from 'react'
import { SlidersHorizontal, X as XIcon } from 'lucide-react'
import { TONE_OVERRIDE_OPTIONS } from '../types'
import type { TonePreset } from '../types'

interface ToneSelectorProps {
  value: TonePreset
  onChange: (preset: TonePreset) => void
  productName: string
}

export function ToneSelector({ value, onChange, productName }: Readonly<ToneSelectorProps>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const activeOption = TONE_OVERRIDE_OPTIONS.find((o) => o.value === value)
  const isOverride = value !== 'dna-default'

  return (
    <div className="rounded-xl bg-surface-container p-6 ghost-border">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        Tom de Voz
      </p>

      {/* Badge + adjust button */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-2 text-xs font-medium text-on-surface">
          Tom: DNA do {productName}
          {isOverride && activeOption && (
            <>
              <span className="text-on-surface-variant">+</span>
              <span className="text-primary">{activeOption.label}</span>
              <button
                type="button"
                onClick={() => onChange('dna-default')}
                className="ml-0.5 cursor-pointer text-on-surface-variant transition-colors hover:text-error"
                aria-label="Remover override de tom"
              >
                <XIcon size={12} />
              </button>
            </>
          )}
        </span>

        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-outline-variant/15 bg-surface-container-low px-4 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary"
          >
            <SlidersHorizontal size={14} />
            <span>AJUSTAR TOM</span>
          </button>

          {open && (
            <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl bg-surface-container-high p-2 shadow-xl ghost-border">
              {TONE_OVERRIDE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { onChange(option.value); setOpen(false) }}
                  className={`flex w-full cursor-pointer flex-col rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-bright ${
                    value === option.value ? 'bg-surface-bright' : ''
                  }`}
                >
                  <span className="text-xs font-medium text-on-surface">
                    {option.label}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
