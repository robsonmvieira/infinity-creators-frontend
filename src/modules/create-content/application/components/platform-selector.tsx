'use client'

import { Camera, AtSign, X, Music, CheckCircle } from 'lucide-react'
import type { Platform } from '../types'

const PLATFORMS: { id: Platform; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'instagram', label: 'Instagram', icon: Camera },
  { id: 'threads', label: 'Threads', icon: AtSign },
  { id: 'x', label: 'X / Twitter', icon: X },
  { id: 'tiktok', label: 'TikTok', icon: Music },
]

interface PlatformSelectorProps {
  selected: Platform[]
  onToggle: (platform: Platform) => void
}

export function PlatformSelector({ selected, onToggle }: PlatformSelectorProps) {
  return (
    <div className="rounded-xl bg-surface-container p-6 ghost-border">
      <label className="mb-6 block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        Target Platforms
      </label>

      <div className="grid grid-cols-2 gap-3">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon
          const isSelected = selected.includes(platform.id)

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onToggle(platform.id)}
              className={`group relative flex flex-col items-center justify-center rounded-lg p-4 transition-colors ${
                isSelected
                  ? 'border-2 border-primary bg-surface-bright'
                  : 'border border-outline-variant/15 bg-surface-container-low hover:bg-surface-bright'
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2 text-primary">
                  <CheckCircle size={14} className="fill-primary text-surface-bright" />
                </div>
              )}
              <Icon
                size={24}
                className={`mb-2 ${
                  isSelected
                    ? 'text-on-surface'
                    : 'text-on-surface-variant group-hover:text-on-surface'
                }`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  isSelected
                    ? 'text-on-surface'
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
