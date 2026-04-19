'use client'

import { CalendarEventBadge } from './calendar-event-badge'
import type { CalendarEvent } from '../types'

interface CalendarCellProps {
  day: number
  isCurrentMonth: boolean
  isSelected: boolean
  isToday: boolean
  events: CalendarEvent[]
  onSelect: (day: number) => void
}

export function CalendarCell({
  day,
  isCurrentMonth,
  isSelected,
  isToday,
  events,
  onSelect,
}: Readonly<CalendarCellProps>) {
  if (!isCurrentMonth) {
    return (
      <div className="min-h-[100px] bg-surface-container-low p-3 opacity-30 lg:min-h-[120px]">
        <span className="text-xs font-medium">{day}</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className={`group min-h-[100px] cursor-pointer p-3 text-left transition-all duration-200 lg:min-h-[120px] ${
        isSelected
          ? 'bg-surface-container-high shadow-[inset_0_0_20px_rgba(163,166,255,0.05)] ring-2 ring-primary/40'
          : 'bg-background hover:bg-surface-container'
      }`}
    >
      <span
        className={`text-xs font-medium ${
          isSelected
            ? 'font-bold text-primary'
            : isToday
              ? 'font-bold text-secondary'
              : 'text-on-surface-variant group-hover:text-on-surface'
        }`}
      >
        {day}
      </span>

      {events.length > 0 && (
        <div className="mt-2 space-y-1">
          {events.slice(0, 3).map((event) => (
            <CalendarEventBadge
              key={event.id}
              platform={event.platform}
              title={events.length <= 2 ? event.title : undefined}
              compact={events.length > 2}
            />
          ))}
          {events.length > 3 && (
            <span className="text-[9px] text-on-surface-variant">+{events.length - 3} more</span>
          )}
        </div>
      )}
    </button>
  )
}
