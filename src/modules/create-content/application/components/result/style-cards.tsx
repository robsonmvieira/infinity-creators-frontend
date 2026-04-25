'use client'

import { Check } from 'lucide-react'
import type { StyleOption } from '../../types'

/* ── Noise SVG for mini-preview ────────────────────── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

interface StyleCardsProps {
  styles: StyleOption[]
  selectedId: string
  onChange: (id: string) => void
}

function getMiniPreviewBg(style: StyleOption): string {
  if (style.layout.type === 'overlay') return '#1a1a1a'
  if (style.layout.type === 'split') return 'linear-gradient(135deg, #3d2b1a 0%, #1a120a 100%)'
  return '#000'
}

export function StyleCards({ styles, selectedId, onChange }: Readonly<StyleCardsProps>) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        Estilo de Design
      </p>
      <div className="grid grid-cols-3 gap-3">
        {styles.map((style) => {
          const isSelected = style.id === selectedId
          const bg = getMiniPreviewBg(style)
          const isOverlay = style.layout.type === 'overlay'

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onChange(style.id)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all ${
                isSelected
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-outline-variant/15 hover:ring-outline-variant/30'
              }`}
            >
              {/* Mini slide preview */}
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{ background: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {/* Noise grain */}
                <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: NOISE_SVG, backgroundSize: '64px 64px' }} />

                {/* Overlay for photo styles */}
                {isOverlay && (
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)' }} />
                )}

                {/* Mock text lines */}
                <div className={`absolute z-10 ${
                  style.layout.type === 'full-text'
                    ? 'inset-0 flex items-center justify-center px-4'
                    : 'bottom-0 left-0 right-0 px-3 pb-3'
                }`}>
                  <div className={style.layout.type === 'full-text' ? 'text-center' : ''}>
                    <div className={`mb-1 rounded-sm bg-white ${
                      style.layout.type === 'full-text' ? 'mx-auto h-2 w-3/4' : 'h-1.5 w-4/5'
                    }`} />
                    <div className={`rounded-sm bg-white/50 ${
                      style.layout.type === 'full-text' ? 'mx-auto h-1.5 w-1/2' : 'h-1 w-3/5'
                    }`} />
                  </div>
                </div>

                {/* Selected check */}
                {isSelected && (
                  <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="bg-surface-container-low px-2 py-2">
                <p className={`text-center text-[11px] font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  {style.name}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
