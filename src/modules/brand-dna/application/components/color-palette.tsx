'use client'

import { useState, useRef, useMemo } from 'react'
import { Copy, Check, ChevronDown, RefreshCw } from 'lucide-react'
import { PALETTE_PRESETS } from '../types'
import type { BrandColors, BrandColorRole } from '../types'

interface ColorPaletteProps {
  colors: BrandColors
  onColorsChange: (colors: BrandColors) => void
}

const COLOR_ROLES: { key: BrandColorRole; label: string }[] = [
  { key: 'brand', label: 'Cor da marca' },
  { key: 'background', label: 'Cor de fundo' },
  { key: 'text', label: 'Cor do texto' },
]

function contrastText(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1a1a1d' : '#f9f5f8'
}

function ColorSwatch({
  hex,
  label,
  onChange,
}: Readonly<{
  hex: string
  label: string
  onChange: (hex: string) => void
}>) {
  const pickerRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)
  const textColor = contrastText(hex)

  function handleCopy() {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => pickerRef.current?.click()}
        className="h-16 w-full cursor-pointer rounded-lg border border-outline-variant/10 transition-transform hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
        aria-label={`Escolher ${label}`}
      />

      <input
        ref={pickerRef}
        type="color"
        value={hex}
        onChange={(e) => onChange(e.target.value)}
        className="invisible absolute h-0 w-0"
        aria-label={`Color picker para ${label}`}
      />

      <div className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md backdrop-blur-sm"
          style={{ backgroundColor: `${hex}dd`, color: textColor }}
          aria-label="Copiar hex"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>

      <div className="mt-1.5 text-center">
        <p className="text-[10px] font-bold uppercase text-on-surface-variant">
          {label}
        </p>
        <p className="font-mono text-[10px] text-on-surface-variant">
          {hex}
        </p>
      </div>
    </div>
  )
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function PaletteSuggestions({
  onApply,
}: Readonly<{ onApply: (colors: BrandColors) => void }>) {
  const [shuffleKey, setShuffleKey] = useState(0)

  const palettes = useMemo(() => {
    void shuffleKey
    return shuffleArray(PALETTE_PRESETS)
  }, [shuffleKey])

  function handleApply(paletteColors: string[]) {
    onApply({
      brand: paletteColors[0] ?? '#a3a6ff',
      background: paletteColors[1] ?? '#1a1a1d',
      text: paletteColors[2] ?? '#f9f5f8',
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Ou escolha um preset
        </p>
        <button
          type="button"
          onClick={() => setShuffleKey((k) => k + 1)}
          className="flex cursor-pointer items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <RefreshCw size={10} />
          Embaralhar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {palettes.slice(0, 8).map((palette) => (
          <button
            key={palette.id}
            type="button"
            onClick={() => handleApply(palette.colors)}
            className="group cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.03]"
          >
            <div className="flex h-8">
              {palette.colors.slice(0, 3).map((hex, i) => (
                <div
                  key={`${palette.id}-${i}`}
                  className="flex-1"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <p className="bg-surface-container-low py-1 text-center text-[9px] text-on-surface-variant group-hover:text-on-surface">
              {palette.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ColorPalette({ colors, onColorsChange }: Readonly<ColorPaletteProps>) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  function handleColorChange(role: BrandColorRole, hex: string) {
    onColorsChange({ ...colors, [role]: hex })
  }

  return (
    <section className="rounded-xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm">
      <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary">
        Cores da Marca
      </h3>

      <div className="mb-4 grid grid-cols-3 gap-3">
        {COLOR_ROLES.map((role) => (
          <ColorSwatch
            key={role.key}
            hex={colors[role.key]}
            label={role.label}
            onChange={(hex) => handleColorChange(role.key, hex)}
          />
        ))}
      </div>

      <div className="border-t border-outline-variant/10 pt-4">
        <button
          type="button"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex w-full cursor-pointer items-center justify-between text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Sugestões de Paleta
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${showSuggestions ? 'rotate-180' : ''}`}
          />
        </button>

        {showSuggestions && (
          <div className="mt-4">
            <PaletteSuggestions onApply={onColorsChange} />
          </div>
        )}
      </div>
    </section>
  )
}
