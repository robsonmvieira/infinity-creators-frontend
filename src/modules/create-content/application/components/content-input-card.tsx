'use client'

import { Paperclip, Wand2 } from 'lucide-react'
import { MAX_TOKENS } from '../types'

interface ContentInputCardProps {
  value: string
  onChange: (value: string) => void
}

export function ContentInputCard({ value, onChange }: ContentInputCardProps) {
  const tokenCount = value.length

  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="flex min-h-[400px] flex-col rounded-xl bg-surface-container p-8 ghost-border">
        <label className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          Input Context & Details
        </label>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={MAX_TOKENS}
          className="flex-1 resize-none border-none bg-transparent text-xl font-medium leading-relaxed text-on-surface placeholder:text-surface-bright focus:ring-0 focus:outline-none"
          placeholder="What are we building today? Paste a changelog, share a raw idea, or describe the vibe of your next viral post..."
        />

        <div className="mt-8 flex items-center justify-between border-t border-outline-variant/15 pt-8">
          <div className="flex gap-4">
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary"
            >
              <Paperclip size={14} />
              <span>ATTACH ASSETS</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary"
            >
              <Wand2 size={14} />
              <span>ENHANCE PROMPT</span>
            </button>
          </div>
          <span className="font-mono text-xs uppercase text-on-surface-variant">
            {tokenCount} / {MAX_TOKENS} tokens
          </span>
        </div>
      </div>
    </div>
  )
}
