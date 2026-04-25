'use client'

import { Camera, AtSign, Hash, Music, CheckCircle } from 'lucide-react'
import type { Platform } from '../types'

const PLATFORMS: {
  id: Platform
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  selectedClasses: string
}[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Camera,
    selectedClasses: 'border-[#BE185D]/30 bg-[#BE185D]/10 text-[#f472b6]',
  },
  {
    id: 'threads',
    label: 'Threads',
    icon: AtSign,
    selectedClasses: 'border-on-surface/20 bg-surface-bright text-on-surface',
  },
  {
    id: 'x',
    label: 'X / Twitter',
    icon: Hash,
    selectedClasses: 'border-[#0369A1]/30 bg-[#0369A1]/10 text-[#38bdf8]',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    icon: Music,
    selectedClasses: 'border-[#15803D]/30 bg-[#15803D]/10 text-[#4ade80]',
  },
]

interface PlatformSelectorProps {
  selected: Platform[]
  onToggle: (platform: Platform) => void
}

export function PlatformSelector({ selected, onToggle }: Readonly<PlatformSelectorProps>) {
  return (
    <div className="rounded-xl bg-surface-container p-6 ghost-border">
      <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        Plataformas Alvo
      </p>

      <div className="grid grid-cols-2 gap-3">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon
          const isSelected = selected.includes(platform.id)

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onToggle(platform.id)}
              className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 transition-colors ${
                isSelected
                  ? `border-2 ${platform.selectedClasses}`
                  : 'border border-outline-variant/15 bg-surface-container-low hover:bg-surface-bright'
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2">
                  <CheckCircle size={14} className="fill-primary text-surface-bright" />
                </div>
              )}
              <Icon
                size={24}
                className={`mb-2 ${
                  isSelected
                    ? ''
                    : 'text-on-surface-variant group-hover:text-on-surface'
                }`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  isSelected
                    ? ''
                    : 'text-on-surface-variant group-hover:text-on-surface'
                }`}
              >
                {platform.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
