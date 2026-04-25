'use client'

import type { InputTab } from '../types'

const TABS: { id: InputTab; label: string }[] = [
  { id: 'text', label: 'Texto' },
  { id: 'url', label: 'URL / Changelog' },
  { id: 'audio', label: 'Áudio' },
]

interface CreationTabsProps {
  activeTab: InputTab
  onTabChange: (tab: InputTab) => void
}

export function CreationTabs({ activeTab, onTabChange }: Readonly<CreationTabsProps>) {
  return (
    <div className="mb-8 flex items-center gap-8 border-b border-outline-variant/15">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`cursor-pointer px-2 pb-4 text-sm font-medium transition-colors ${
              isActive
                ? 'border-b-2 border-primary font-bold text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
