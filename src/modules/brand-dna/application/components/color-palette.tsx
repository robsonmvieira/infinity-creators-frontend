'use client'

import { useState, useRef, useMemo } from 'react'
import { Plus, X, Copy, Check, ChevronDown, RefreshCw } from 'lucide-react'
import { PALETTE_PRESETS } from '../types'
import type { BrandColor } from '../types'

interface ColorPaletteProps {
  colors: BrandColor[]
  onColorsChange: (colors: BrandColor[]) => void
}

function contrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1a1a1d' : '#f9f5f8'
}

function ColorSwatch({
  color,
  onUpdate,
  onRemove,
}: Readonly<{
  color: BrandColor
  onUpdate: (hex: string, label: string) => void
  onRemove: () => void
}>) {
  const pickerRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)
  const textColor = contrastText(color.hex)

  function handleCopy() {
    navigator.clipboard.writeText(color.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => pickerRef.current?.click()}
        className="h-16 w-full cursor-pointer rounded-lg transition-transform hover:scale-[1.02]"
        style={{ backgroundColor: color.hex }}
      />

      <input
        ref={pickerRef}
        type="color"
        value={color.hex}
        onChange={(e) => onUpdate(e.target.value, color.label)}
        className="invisible absolute h-0 w-0"
        aria-label={`Pick color for ${color.label}`}
      />

      <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-6 w-6 items-center justify-center rounded-md backdrop-blur-sm"
          style={{ backgroundColor: `${color.hex}dd`, color: textColor }}
          aria-label="Copy hex code"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-6 w-6 items-center justify-center rounded-md backdrop-blur-sm"
          style={{ backgroundColor: `${color.hex}dd`, color: textColor }}
          aria-label="Remove color"
        >
          <X size={12} />
        </button>
      </div>

      <div className="mt-1.5 flex items-center justify-between">
        <input
          type="text"
          value={color.label}
          onChange={(e) => onUpdate(color.hex, e.target.value)}
          className="w-16 border-none bg-transparent p-0 text-[10px] font-bold uppercase text-on-surface-variant focus:outline-none focus:ring-0"
        />
        <span className="font-mono text-[10px] text-on-surface-variant">
          {color.hex}
        </span>
      </div>
    </div>
  )
}

function HexInput({
  onAdd,
}: Readonly<{ onAdd: (hex: string) => void }>) {
  const [hex, setHex] = useState('')

  function handleSubmit() {
    const cleaned = hex.startsWith('#') ? hex : `#${hex}`
    if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
      onAdd(cleaned)
      setHex('')
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="#000000"
        maxLength={7}
        className="flex-1 rounded-lg border-none bg-surface-container-low px-3 py-2 font-mono text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded-lg bg-surface-bright px-3 py-2 text-xs font-bold text-on-surface transition-colors hover:bg-primary hover:text-on-surface"
      >
        Add
      </button>
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
}: Readonly<{ onApply: (colors: BrandColor[]) => void }>) {
  const [shuffleKey, setShuffleKey] = useState(0)

  const palettes = useMemo(() => {
    void shuffleKey
    return shuffleArray(PALETTE_PRESETS)
  }, [shuffleKey])

  function handleApply(paletteColors: string[]) {
    const labels = ['Primary', 'Secondary', 'Accent', 'Highlight', 'Base']
    onApply(
      paletteColors.map((hex, i) => ({
        id: crypto.randomUUID(),
        label: labels[i] ?? `Color ${i + 1}`,
        hex,
      })),
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Or pick a preset
        </p>
        <button
          type="button"
          onClick={() => setShuffleKey((k) => k + 1)}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <RefreshCw size={10} />
          Shuffle
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {palettes.slice(0, 8).map((palette) => (
          <button
            key={palette.id}
            type="button"
            onClick={() => handleApply(palette.colors)}
            className="group overflow-hidden rounded-lg transition-transform hover:scale-[1.03]"
          >
            <div className="flex h-8">
              {palette.colors.map((hex, i) => (
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

  function handleUpdate(id: string, hex: string, label: string) {
    onColorsChange(colors.map((c) => (c.id === id ? { ...c, hex, label } : c)))
  }

  function handleRemove(id: string) {
    onColorsChange(colors.filter((c) => c.id !== id))
  }

  function handleAdd(hex: string) {
    const newColor: BrandColor = {
      id: crypto.randomUUID(),
      label: `Color ${colors.length + 1}`,
      hex,
    }
    onColorsChange([...colors, newColor])
  }

  function handleAddViaColorPicker() {
    const newColor: BrandColor = {
      id: crypto.randomUUID(),
      label: `Color ${colors.length + 1}`,
      hex: '#6366f1',
    }
    onColorsChange([...colors, newColor])
  }

  return (
    <section className="rounded-xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
          Color Palette
        </h3>
        <span className="text-[10px] text-on-surface-variant">
          {colors.length} color{colors.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        {colors.map((color) => (
          <ColorSwatch
            key={color.id}
            color={color}
            onUpdate={(hex, label) => handleUpdate(color.id, hex, label)}
            onRemove={() => handleRemove(color.id)}
          />
        ))}

        <button
          type="button"
          onClick={handleAddViaColorPicker}
          className="flex h-16 w-full flex-col items-center justify-center rounded-lg border border-dashed border-outline-variant/20 bg-surface-bright transition-colors hover:border-primary/50"
        >
          <Plus size={16} className="mb-1 text-on-surface-variant" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
            Add Color
          </span>
        </button>
      </div>

      <HexInput onAdd={handleAdd} />

      <div className="mt-6 border-t border-outline-variant/10 pt-4">
        <button
          type="button"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex w-full items-center justify-between text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Palette Suggestions
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
