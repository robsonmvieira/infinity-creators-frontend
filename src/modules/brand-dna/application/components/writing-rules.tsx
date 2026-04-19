'use client'

import { CheckCircle, XCircle } from 'lucide-react'

interface WritingRulesProps {
  alwaysUse: string
  neverUse: string
  onAlwaysUseChange: (value: string) => void
  onNeverUseChange: (value: string) => void
}

export function WritingRules({
  alwaysUse,
  neverUse,
  onAlwaysUseChange,
  onNeverUseChange,
}: Readonly<WritingRulesProps>) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <label
          htmlFor="always-use"
          className="flex items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
        >
          <CheckCircle size={12} className="mr-2 text-tertiary" />
          Always Use
        </label>
        <textarea
          id="always-use"
          value={alwaysUse}
          onChange={(e) => onAlwaysUseChange(e.target.value)}
          className="min-h-[120px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low p-4 text-sm leading-relaxed text-on-surface no-scrollbar focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="space-y-4">
        <label
          htmlFor="never-use"
          className="flex items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
        >
          <XCircle size={12} className="mr-2 text-error" />
          Never Use
        </label>
        <textarea
          id="never-use"
          value={neverUse}
          onChange={(e) => onNeverUseChange(e.target.value)}
          className="min-h-[120px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low p-4 text-sm leading-relaxed text-on-surface no-scrollbar focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  )
}
