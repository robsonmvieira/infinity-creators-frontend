'use client'

import { X, PlusCircle } from 'lucide-react'
import { DayDetailPost } from './day-detail-post'
import type { CalendarEvent } from '../types'

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface DayDetailPanelProps {
  year: number
  month: number
  day: number
  events: CalendarEvent[]
  onClose: () => void
}

function DayStats({ events }: Readonly<{ events: CalendarEvent[] }>) {
  const scheduled = events.filter((e) => e.status === 'scheduled')
  const reachEst = scheduled.length > 0 ? '12.4K' : '—'
  const engRate = scheduled.length > 0 ? '5.2%' : '—'

  return (
    <div className="grid grid-cols-2 gap-3 pt-4">
      <div className="rounded-2xl border border-outline-variant/5 bg-surface-container-low p-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Reach Est.
        </p>
        <span className="text-xl font-black text-primary">{reachEst}</span>
      </div>
      <div className="rounded-2xl border border-outline-variant/5 bg-surface-container-low p-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Avg. Eng.
        </p>
        <span className="text-xl font-black text-secondary">{engRate}</span>
      </div>
    </div>
  )
}

export function DayDetailPanel({
  year,
  month,
  day,
  events,
  onClose,
}: Readonly<DayDetailPanelProps>) {
  const date = new Date(year, month, day)
  const weekday = WEEKDAY_NAMES[date.getDay()]
  const monthName = MONTH_NAMES[month]

  return (
    <aside className="hidden w-96 overflow-y-auto border-l border-outline-variant/15 bg-surface-container/80 p-8 backdrop-blur-xl xl:block">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-black tracking-tight">
          {weekday}, {monthName} {day}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg p-2 transition-colors duration-200 hover:bg-surface-bright"
          aria-label="Fechar painel"
        >
          <X size={20} className="text-on-surface-variant" />
        </button>
      </div>

      <div className="space-y-8">
        {events.length > 0 ? (
          events.map((event) => (
            <DayDetailPost key={event.id} event={event} />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="mb-2 text-sm text-on-surface-variant">No posts scheduled</p>
            <p className="text-xs text-on-surface-variant/60">Click below to create one</p>
          </div>
        )}

        {events.length > 0 && <DayStats events={events} />}

        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-outline-variant/20 bg-surface-bright py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:bg-on-surface hover:text-background"
        >
          <PlusCircle size={18} />
          Schedule Event
        </button>
      </div>
    </aside>
  )
}
