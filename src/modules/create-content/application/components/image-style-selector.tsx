'use client'

import { Camera, Palette, Box } from 'lucide-react'
import type { ImageStyle } from '@modules/brand-dna/application/types'
import { IMAGE_STYLE_OPTIONS } from '@modules/brand-dna/application/types'

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
    <div className="rounded-xl bg-surface-container p-6 ghost-border">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        Estilo Visual
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
              className={`flex cursor-pointer flex-col items-center rounded-lg p-3 transition-colors ${
                isSelected
                  ? 'border-2 border-primary bg-primary/5'
                  : 'border border-outline-variant/15 bg-surface-container-low hover:bg-surface-bright'
              }`}
            >
              <Icon
                size={20}
                className={`mb-1.5 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}
              />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
