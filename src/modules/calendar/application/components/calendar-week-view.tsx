'use client'

import { CalendarEventBadge } from './calendar-event-badge'
import type { CalendarEvent } from '../types'

const HOURS = Array.from({ length: 14 }, (_, i) => i + 6) // 06:00 – 19:00

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getWeekDays(year: number, month: number, selectedDay: number | null) {
  const ref = selectedDay ?? 1
  const date = new Date(year, month, ref)
  const dayOfWeek = date.getDay()
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - dayOfWeek)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    return { day: d.getDate(), month: d.getMonth(), year: d.getFullYear() }
  })
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function WeekEventCard({ event }: Readonly<{ event: CalendarEvent }>) {
  return (
    <div className="ghost-border mb-1 rounded-lg bg-surface-container p-2 transition-colors duration-200 hover:bg-surface-bright/30">
      <CalendarEventBadge platform={event.platform} compact />
      <p className="mt-1 truncate text-[10px] font-semibold text-on-surface">{event.title}</p>
      <p className="text-[9px] text-on-surface-variant">{event.time}</p>
    </div>
  )
}

interface CalendarWeekViewProps {
  year: number
  month: number
  selectedDay: number | null
  events: CalendarEvent[]
  onSelectDay: (day: number) => void
}

export function CalendarWeekView({
  year,
  month,
  selectedDay,
  events,
  onSelectDay,
}: Readonly<CalendarWeekViewProps>) {
  const weekDays = getWeekDays(year, month, selectedDay)

  const today = new Date()
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-outline-variant/15">
      {/* Header with day numbers */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-outline-variant/15 bg-surface-container">
        <div className="border-r border-outline-variant/10 p-3" />
        {weekDays.map((wd, i) => {
          const key = formatDateKey(wd.year, wd.month, wd.day)
          const isToday = key === todayKey
          const isSelected = wd.month === month && wd.day === selectedDay
          const isCurrentMonth = wd.month === month

          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (isCurrentMonth) onSelectDay(wd.day)
              }}
              className={`cursor-pointer border-r border-outline-variant/10 px-2 py-3 text-center transition-colors duration-200 last:border-r-0 hover:bg-surface-bright/20 ${
                !isCurrentMonth ? 'opacity-40' : ''
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                {WEEKDAYS_SHORT[i]}
              </div>
              <div
                className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : isToday
                      ? 'bg-secondary/20 text-secondary'
                      : 'text-on-surface'
                }`}
              >
                {wd.day}
              </div>
            </button>
          )
        })}
      </div>

      {/* Time grid */}
      <div className="max-h-[520px] overflow-y-auto">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-outline-variant/5"
          >
            <div className="flex items-start justify-end border-r border-outline-variant/10 px-2 py-2 text-[10px] font-medium text-on-surface-variant">
              {String(hour).padStart(2, '0')}:00
            </div>
            {weekDays.map((wd) => {
              const key = formatDateKey(wd.year, wd.month, wd.day)
              const isCurrentMonth = wd.month === month
              const hourEvents = events.filter(
                (e) => e.date === key && Number.parseInt(e.time.split(':')[0]) === hour,
              )

              return (
                <button
                  key={key + hour}
                  type="button"
                  onClick={() => {
                    if (isCurrentMonth) onSelectDay(wd.day)
                  }}
                  className={`min-h-[56px] cursor-pointer border-r border-outline-variant/5 p-1 text-left transition-colors duration-200 last:border-r-0 ${
                    !isCurrentMonth
                      ? 'bg-surface-container-low opacity-30'
                      : 'hover:bg-surface-container/30'
                  }`}
                >
                  {hourEvents.map((event) => (
                    <WeekEventCard key={event.id} event={event} />
                  ))}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
