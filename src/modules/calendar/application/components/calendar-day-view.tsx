'use client'

import { Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { CalendarEventBadge } from './calendar-event-badge'
import type { CalendarEvent } from '../types'

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6) // 06:00 – 21:00

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function DayEventCard({ event }: Readonly<{ event: CalendarEvent }>) {
  return (
    <div className="ghost-border mb-2 rounded-xl bg-surface-container p-4 transition-all duration-200 hover:bg-surface-bright/20">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarEventBadge platform={event.platform} />
          <span className="text-xs text-on-surface-variant">{event.time}</span>
        </div>
        {event.status === 'published' ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tertiary text-surface-container-lowest">
            <Check size={12} />
          </span>
        ) : event.status === 'scheduled' ? (
          <Clock size={14} className="text-on-surface-variant" />
        ) : (
          <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Draft</span>
        )}
      </div>
      <h4 className="text-sm font-bold">{event.title}</h4>
      {event.description && (
        <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
          {event.description}
        </p>
      )}
      {event.tags && event.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-primary/10 bg-primary/5 px-2 py-0.5 text-[9px] font-bold text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface CalendarDayViewProps {
  year: number
  month: number
  selectedDay: number | null
  events: CalendarEvent[]
  onSelectDay: (day: number) => void
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export function CalendarDayView({
  year,
  month,
  selectedDay,
  events,
  onSelectDay,
}: Readonly<CalendarDayViewProps>) {
  const day = selectedDay ?? 1
  const dateKey = formatDateKey(year, month, day)
  const date = new Date(year, month, day)
  const weekday = WEEKDAYS[date.getDay()]
  const dayEvents = events.filter((e) => e.date === dateKey)
  const daysInMonth = getDaysInMonth(year, month)

  function handlePrevDay() {
    if (day > 1) onSelectDay(day - 1)
  }

  function handleNextDay() {
    if (day < daysInMonth) onSelectDay(day + 1)
  }

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-outline-variant/15">
      {/* Day header with navigation */}
      <div className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container px-6 py-4">
        <div>
          <h3 className="text-lg font-bold">
            {weekday}, {MONTH_NAMES[month]} {day}
          </h3>
          <p className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary" />
            {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handlePrevDay}
            disabled={day <= 1}
            className="cursor-pointer rounded-xl border border-outline-variant/10 bg-surface-bright p-2 transition-colors duration-200 hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Dia anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleNextDay}
            disabled={day >= daysInMonth}
            className="cursor-pointer rounded-xl border border-outline-variant/10 bg-surface-bright p-2 transition-colors duration-200 hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Próximo dia"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Time slots */}
      <div className="max-h-[520px] overflow-y-auto">
        {HOURS.map((hour) => {
          const hourEvents = dayEvents.filter(
            (e) => Number.parseInt(e.time.split(':')[0]) === hour,
          )

          return (
            <div
              key={hour}
              className="flex border-b border-outline-variant/5"
            >
              <div className="flex w-20 shrink-0 items-start justify-end border-r border-outline-variant/10 px-3 py-3 text-[11px] font-medium text-on-surface-variant">
                {String(hour).padStart(2, '0')}:00
              </div>

              <div className={`min-h-[56px] flex-1 p-2 ${hourEvents.length === 0 ? 'hover:bg-surface-container/20' : ''}`}>
                {hourEvents.map((event) => (
                  <DayEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
