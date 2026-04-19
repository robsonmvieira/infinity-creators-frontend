'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function AdvancedParameters() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-xl border border-dashed border-outline-variant/15 bg-surface-container-low p-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-on-surface-variant transition-colors hover:text-on-surface"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Advanced Parameters
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-6 space-y-4 border-t border-outline-variant/15 pt-6">
          <p className="text-xs text-on-surface-variant">
            Advanced configuration options coming soon.
          </p>
        </div>
      )}
    </div>
  )
}
