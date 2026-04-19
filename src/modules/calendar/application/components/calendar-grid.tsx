'use client'

import { CalendarCell } from './calendar-cell'
import type { CalendarEvent } from '../types'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface CalendarGridProps {
  year: number
  month: number
  selectedDay: number | null
  events: CalendarEvent[]
  onSelectDay: (day: number) => void
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function CalendarGrid({
  year,
  month,
  selectedDay,
  events,
  onSelectDay,
}: Readonly<CalendarGridProps>) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1)

  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month
  const todayDate = today.getDate()

  const dateKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const eventsForDay = (day: number) =>
    events.filter((e) => e.date === dateKey(day))

  // Build cells
  const cells: React.ReactNode[] = []

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push(
      <CalendarCell
        key={`prev-${i}`}
        day={prevMonthDays - i}
        isCurrentMonth={false}
        isSelected={false}
        isToday={false}
        events={[]}
        onSelect={() => {}}
      />,
    )
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(
      <CalendarCell
        key={`day-${day}`}
        day={day}
        isCurrentMonth={true}
        isSelected={selectedDay === day}
        isToday={isCurrentMonth && todayDate === day}
        events={eventsForDay(day)}
        onSelect={onSelectDay}
      />,
    )
  }

  // Next month leading days
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      cells.push(
        <CalendarCell
          key={`next-${i}`}
          day={i}
          isCurrentMonth={false}
          isSelected={false}
          isToday={false}
          events={[]}
          onSelect={() => {}}
        />,
      )
    }
  }

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-outline-variant/15">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-outline-variant/15 bg-surface-container" style={{ gap: '1px' }}>
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div
        className="grid grid-cols-7 bg-outline-variant/10"
        style={{ gap: '1px' }}
      >
        {cells}
      </div>
    </div>
  )
}
