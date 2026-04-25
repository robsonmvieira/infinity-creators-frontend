'use client'

import { Check } from 'lucide-react'

interface ImageCardOption {
  id: string
  label: string
  url?: string
  css?: string
}

interface ImageCardsProps {
  label: string
  options: ImageCardOption[]
  selectedId: string
  onChange: (id: string) => void
}

export function ImageCards({ label, options, selectedId, onChange }: Readonly<ImageCardsProps>) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        {label}
      </p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {options.map((opt) => {
          const isSelected = opt.id === selectedId
          const bg = opt.url ? `url(${opt.url})` : opt.css ?? '#333'

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all ${
                isSelected
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-outline-variant/15 hover:ring-outline-variant/30'
              }`}
            >
              <div
                className="h-16 w-24"
                style={{ background: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {isSelected && (
                  <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                    <Check size={10} className="text-white" />
                  </div>
                )}
              </div>
              <div className="bg-surface-container-low px-1.5 py-1">
                <p className={`text-center text-[9px] font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  {opt.label}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
