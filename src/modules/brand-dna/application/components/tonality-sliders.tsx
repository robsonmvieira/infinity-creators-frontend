'use client'

import type { TonalitySlider } from '../types'

interface TonalitySlidersProps {
  sliders: TonalitySlider[]
  onSliderChange: (id: string, value: number) => void
}

function SliderTrack({ slider, onChange }: Readonly<{ slider: TonalitySlider; onChange: (value: number) => void }>) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        <span>{slider.labelLeft}</span>
        <span>{slider.labelRight}</span>
      </div>

      <div className="relative h-1.5">
        <div className="absolute inset-0 rounded-full bg-surface-bright" />
        <div
          className="brand-gradient absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${slider.value}%` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={slider.value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${slider.labelLeft} to ${slider.labelRight}`}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-surface-container [&::-webkit-slider-thumb]:bg-on-surface [&::-webkit-slider-thumb]:shadow-xl"
        />
      </div>
    </div>
  )
}

export function TonalitySliders({ sliders, onSliderChange }: Readonly<TonalitySlidersProps>) {
  return (
    <div className="mb-12 space-y-8">
      {sliders.map((slider) => (
        <SliderTrack
          key={slider.id}
          slider={slider}
          onChange={(value) => onSliderChange(slider.id, value)}
        />
      ))}
    </div>
  )
}
