'use client'

import { TONE_OPTIONS } from '../types'
import type { Tone } from '../types'

interface ToneSelectorProps {
  value: Tone
  onChange: (tone: Tone) => void
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="rounded-xl bg-surface-container p-6 ghost-border">
      <label
        htmlFor="tone-select"
        className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant"
      >
        Persona & Tone
      </label>
      <select
        id="tone-select"
        value={value}
        onChange={(e) => onChange(e.target.value as Tone)}
        className="w-full rounded-lg border-none bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary"
      >
        {TONE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
