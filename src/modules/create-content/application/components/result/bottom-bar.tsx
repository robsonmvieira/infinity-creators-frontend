'use client'

import { Layers, CheckCircle, AlertCircle, Send } from 'lucide-react'
import type { PlatformResult, Platform } from '../../types'

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  threads: 'Threads',
  x: 'X',
  tiktok: 'TikTok',
}

const FORMAT_LABELS: Record<string, string> = {
  carousel: 'Carrossel',
  post: 'Post',
  thread: 'Thread',
  reel: 'Reel',
  story: 'Story',
}

interface BottomBarProps {
  results: PlatformResult[]
  onScheduleAll: () => void
}

export function BottomBar({ results, onScheduleAll }: Readonly<BottomBarProps>) {
  const platformCount = results.length
  const formats = results.map((r) => FORMAT_LABELS[r.format] ?? r.format).join(' + ')

  return (
    <div className="mt-8 rounded-xl border border-outline-variant/10 bg-surface-container p-4 ghost-border">
      <div className="flex items-center justify-between">
        {/* Left — multiplier summary */}
        <div className="flex items-center gap-3">
          <Layers size={18} className="text-primary" />
          <div>
            <p className="text-sm text-on-surface-variant">
              1 input → {platformCount} plataformas
            </p>
            <p className="text-xs text-on-surface-variant">{formats}</p>
          </div>
        </div>

        {/* Center — per-platform status */}
        <div className="flex gap-4">
          {results.map((r) => {
            const hasErrors = r.review.flags.some((f) => f.severity === 'error')
            const hasWarnings = r.review.flags.some((f) => f.severity === 'warning')

            if (hasErrors || hasWarnings) {
              return (
                <div key={r.platformId} className="flex items-center gap-1">
                  <AlertCircle size={14} className="text-amber-400" />
                  <span className="text-xs text-amber-400">
                    {PLATFORM_LABELS[r.platformId]}: Revisar
                  </span>
                </div>
              )
            }

            return (
              <div key={r.platformId} className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-400" />
                <span className="text-xs text-emerald-400">
                  {PLATFORM_LABELS[r.platformId]}: Pronto
                </span>
              </div>
            )
          })}
        </div>

        {/* Right — schedule all */}
        <button
          type="button"
          onClick={onScheduleAll}
          className="brand-gradient flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-on-surface transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Send size={14} />
          Agendar Todos
        </button>
      </div>
    </div>
  )
}
