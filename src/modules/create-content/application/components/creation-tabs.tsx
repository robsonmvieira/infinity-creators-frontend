'use client'

import { FileText, Mic, Link, ScreenShare } from 'lucide-react'
import type { InputTab } from '../types'

const TABS: { id: InputTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'text', label: 'Texto/Ideia', icon: FileText },
  { id: 'audio', label: 'Audio', icon: Mic },
  { id: 'url', label: 'URL', icon: Link },
  { id: 'screenshot', label: 'Screenshot', icon: ScreenShare },
]

interface CreationTabsProps {
  activeTab: InputTab
  onTabChange: (tab: InputTab) => void
}

export function CreationTabs({ activeTab, onTabChange }: CreationTabsProps) {
  return (
    <div className="mb-8 flex items-center gap-8 border-b border-outline-variant/15">
      {TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 pb-4 px-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-b-2 border-primary font-bold text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon size={18} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
