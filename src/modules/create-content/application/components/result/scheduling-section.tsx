'use client'

import { Clock, Calendar, Zap, Eye, ChevronDown } from 'lucide-react'
import type { FinalizeAction } from '../../types'

interface SchedulingSectionProps {
  action: FinalizeAction
  onActionChange: (action: FinalizeAction) => void
  scheduleDate: string
  onScheduleDateChange: (date: string) => void
  scheduleTime: string
  onScheduleTimeChange: (time: string) => void
  platformLabel: string
  onSubmit: () => void
  disabled: boolean
}

const ACTION_OPTIONS: { value: FinalizeAction; label: string }[] = [
  { value: 'schedule', label: 'Agendar' },
  { value: 'publish-now', label: 'Publicar agora' },
  { value: 'save-draft', label: 'Salvar como rascunho' },
]

function getButtonLabel(action: FinalizeAction, platformLabel: string) {
  if (action === 'schedule') return `Agendar para ${platformLabel}`
  if (action === 'publish-now') return `Publicar agora`
  return 'Salvar rascunho'
}

export function SchedulingSection({
  action,
  onActionChange,
  scheduleDate,
  onScheduleDateChange,
  scheduleTime,
  onScheduleTimeChange,
  platformLabel,
  onSubmit,
  disabled,
}: Readonly<SchedulingSectionProps>) {
  return (
    <div className="space-y-4">
      {/* Scheduling config */}
      <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-on-surface-variant">
          <Clock size={14} />
          Publicação
        </div>

        <div className="relative">
          <select
            value={action}
            onChange={(e) => onActionChange(e.target.value as FinalizeAction)}
            className="h-9 w-full cursor-pointer appearance-none rounded-lg border border-outline-variant/15 bg-surface-container-low pl-3 pr-10 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary"
          >
            {ACTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        </div>

        {action === 'schedule' && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => onScheduleDateChange(e.target.value)}
              className="h-9 cursor-pointer rounded-lg border border-outline-variant/15 bg-surface-container-low px-3 text-xs text-on-surface focus:ring-1 focus:ring-primary"
            />
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => onScheduleTimeChange(e.target.value)}
              className="h-9 cursor-pointer rounded-lg border border-outline-variant/15 bg-surface-container-low px-3 text-xs text-on-surface focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {action === 'schedule' && (
          <button
            type="button"
            onClick={() => onScheduleTimeChange('18:00')}
            className="mt-2 flex cursor-pointer items-center gap-1.5 rounded-md border border-outline-variant/10 px-2 py-1 text-xs text-on-surface-variant transition-colors hover:bg-surface-bright"
          >
            <Zap size={12} className="text-tertiary" />
            Melhor horário: 18:00 (ter)
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled}
          className="brand-gradient flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold text-on-surface transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Calendar size={16} />
          {getButtonLabel(action, platformLabel)}
        </button>

        <button
          type="button"
          className="flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-outline-variant/15 text-xs text-on-surface-variant transition-colors hover:bg-surface-bright"
        >
          <Eye size={14} />
          Preview fullscreen
        </button>
      </div>
    </div>
  )
}
