'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export type CalendarView = 'month' | 'week' | 'day'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface CalendarHeaderProps {
  year: number
  month: number
  totalEvents: number
  currentView: CalendarView
  onViewChange: (view: CalendarView) => void
  onPrevMonth: () => void
  onNextMonth: () => void
}

function ViewToggle({
  currentView,
  onViewChange,
}: Readonly<{ currentView: CalendarView; onViewChange: (v: CalendarView) => void }>) {
  const views: CalendarView[] = ['month', 'week', 'day']

  return (
    <div className="flex rounded-xl border border-outline-variant/10 bg-surface-container p-1">
      {views.map((view) => (
        <button
          key={view}
          type="button"
          onClick={() => onViewChange(view)}
          className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
            currentView === view
              ? 'bg-surface-bright text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {view === 'month' ? 'Month' : view === 'week' ? 'Week' : 'Day'}
        </button>
      ))}
    </div>
  )
}

export function CalendarHeader({
  year,
  month,
  totalEvents,
  currentView,
  onViewChange,
  onPrevMonth,
  onNextMonth,
}: Readonly<CalendarHeaderProps>) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="mb-1 text-4xl font-black tracking-tight">
          {MONTH_NAMES[month]} {year}
        </h2>
        <p className="flex items-center gap-2 text-sm text-on-surface-variant">
          <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
          {totalEvents} Posts scheduled for this month
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ViewToggle currentView={currentView} onViewChange={onViewChange} />
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onPrevMonth}
            className="cursor-pointer rounded-xl border border-outline-variant/10 bg-surface-container p-2.5 transition-colors duration-200 hover:bg-surface-bright"
            aria-label="Mês anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="cursor-pointer rounded-xl border border-outline-variant/10 bg-surface-container p-2.5 transition-colors duration-200 hover:bg-surface-bright"
            aria-label="Próximo mês"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
