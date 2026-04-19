'use client'

import { useState, useMemo } from 'react'
import { RefreshCw, Eye } from 'lucide-react'
import { PALETTE_PRESETS } from '../types'
import type { BrandColor } from '../types'

const PAGE_SIZE = 8

interface PaletteSuggestionsProps {
  onApply: (colors: BrandColor[]) => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function PaletteSuggestions({ onApply }: Readonly<PaletteSuggestionsProps>) {
  const [shuffleKey, setShuffleKey] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const palettes = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    shuffleKey // dependency to trigger reshuffle
    return shuffleArray(PALETTE_PRESETS)
  }, [shuffleKey])

  const visible = showAll ? palettes : palettes.slice(0, PAGE_SIZE)

  function handleApply(paletteColors: string[], name: string) {
    const labels = ['Primary', 'Secondary', 'Accent', 'Highlight', 'Base']
    const brandColors: BrandColor[] = paletteColors.map((hex, i) => ({
      id: crypto.randomUUID(),
      label: labels[i] ?? `Color ${i + 1}`,
      hex,
    }))
    onApply(brandColors)
  }

  return (
    <section className="rounded-xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
          Palette Suggestions
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShuffleKey((k) => k + 1)}
            className="flex items-center gap-1.5 rounded-lg border border-outline-variant/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:bg-surface-bright hover:text-on-surface"
          >
            <RefreshCw size={12} />
            Generate more
          </button>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 rounded-lg border border-outline-variant/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:bg-surface-bright hover:text-on-surface"
          >
            <Eye size={12} />
            {showAll ? 'Show less' : 'View all'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((palette) => (
          <div key={palette.id} className="group">
            <div className="mb-2 flex h-14 overflow-hidden rounded-lg">
              {palette.colors.map((hex, i) => (
                <div
                  key={`${palette.id}-${i}`}
                  className="flex-1 transition-transform group-hover:scale-y-105"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleApply(palette.colors, palette.name)}
                className="text-xs font-medium text-primary underline-offset-2 transition-colors hover:underline"
              >
                Use palette
              </button>
              <span className="text-[10px] text-on-surface-variant">
                {palette.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
