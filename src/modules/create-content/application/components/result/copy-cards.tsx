'use client'

import { Check } from 'lucide-react'
import type { PostCopyVariation } from '../../types'

interface CopyCardsProps {
  variations: PostCopyVariation[]
  selectedId: string
  onChange: (id: string) => void
}

function getPreviewText(copy: PostCopyVariation): string {
  return copy.text.split('\n')[0] ?? ''
}

export function CopyCards({ variations, selectedId, onChange }: Readonly<CopyCardsProps>) {
  if (variations.length <= 1) return null

  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        Variação de Copy
      </p>
      <div className="grid grid-cols-2 gap-3">
        {variations.map((copy) => {
          const isSelected = copy.id === selectedId
          const preview = getPreviewText(copy)
          return (
            <button
              key={copy.id}
              type="button"
              onClick={() => onChange(copy.id)}
              className={`group relative cursor-pointer rounded-xl p-4 text-left transition-all ${
                isSelected
                  ? 'border-2 border-primary bg-primary/5'
                  : 'border border-outline-variant/15 bg-surface-container-low hover:border-outline-variant/30'
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Check size={12} className="text-white" />
                </div>
              )}

              <p className={`text-sm font-semibold ${isSelected ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                {copy.name}
              </p>
              <p className="mt-0.5 text-[10px] text-on-surface-variant">
                {copy.description}
              </p>

              {/* Preview snippet */}
              <div className="mt-3 rounded-lg bg-surface-container/50 p-2.5">
                <p className="line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
                  "{preview}"
                </p>
              </div>

            </button>
          )
        })}
      </div>
    </div>
  )
}
