'use client'

import { Camera, Palette, Box, Check } from 'lucide-react'
import { IMAGE_STYLE_OPTIONS } from '../types'
import type { ImageStyle } from '../types'

const ICON_MAP: Record<ImageStyle, typeof Camera> = {
  photographic: Camera,
  illustration: Palette,
  '3d-isometric': Box,
}

interface ImageStyleSelectorProps {
  value: ImageStyle
  onChange: (style: ImageStyle) => void
}

export function ImageStyleSelector({ value, onChange }: Readonly<ImageStyleSelectorProps>) {
  return (
    <section className="rounded-xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
        Estilo de Imagem
      </h3>
      <p className="mb-6 text-xs text-on-surface-variant">
        Escolha o estilo visual padrão dos seus posts.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {IMAGE_STYLE_OPTIONS.map((option) => {
          const Icon = ICON_MAP[option.value]
          const isSelected = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`group relative flex cursor-pointer flex-col items-center rounded-xl p-5 transition-colors ${
                isSelected
                  ? 'border-2 border-primary bg-primary/5'
                  : 'border border-outline-variant/15 bg-surface-container-low hover:bg-surface-bright'
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2">
                  <Check size={14} className="text-primary" />
                </div>
              )}

              <Icon
                size={28}
                className={`mb-3 ${isSelected ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}
              />

              <span className={`text-xs font-bold ${isSelected ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                {option.label}
              </span>

              <span className="mt-1 text-center text-[9px] leading-tight text-on-surface-variant">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
