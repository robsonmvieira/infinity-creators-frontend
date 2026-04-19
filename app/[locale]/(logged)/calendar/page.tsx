'use client'

import { useState, useMemo } from 'react'
import {
  CalendarHeader,
  CalendarGrid,
  CalendarWeekView,
  CalendarDayView,
  CalendarLegend,
  DayDetailPanel,
} from '@modules/calendar/application/components'
import { MOCK_EVENTS } from '@modules/calendar/application/mock-data'
import type { CalendarView } from '@modules/calendar/application/components/calendar-header'

export default function CalendarPage() {
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(3) // April (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(18)
  const [currentView, setCurrentView] = useState<CalendarView>('month')

  function handleViewChange(view: CalendarView) {
    setCurrentView(view)
    if ((view === 'day' || view === 'week') && selectedDay === null) {
      setSelectedDay(1)
    }
  }

  const totalEvents = useMemo(
    () => MOCK_EVENTS.filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === year && d.getMonth() === month
    }).length,
    [year, month],
  )

  const selectedDayEvents = useMemo(() => {
    if (selectedDay === null) return []
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    return MOCK_EVENTS.filter((e) => e.date === dateKey)
  }, [year, month, selectedDay])

  function handlePrevMonth() {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setSelectedDay(null)
  }

  function handleNextMonth() {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setSelectedDay(null)
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <CalendarHeader
          year={year}
          month={month}
          totalEvents={totalEvents}
          currentView={currentView}
          onViewChange={handleViewChange}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {currentView === 'month' && (
          <CalendarGrid
            year={year}
            month={month}
            selectedDay={selectedDay}
            events={MOCK_EVENTS}
            onSelectDay={setSelectedDay}
          />
        )}

        {currentView === 'week' && (
          <CalendarWeekView
            year={year}
            month={month}
            selectedDay={selectedDay}
            events={MOCK_EVENTS}
            onSelectDay={setSelectedDay}
          />
        )}

        {currentView === 'day' && (
          <CalendarDayView
            year={year}
            month={month}
            selectedDay={selectedDay}
            events={MOCK_EVENTS}
            onSelectDay={setSelectedDay}
          />
        )}

        <CalendarLegend />
      </div>

      {selectedDay !== null && (
        <DayDetailPanel
          year={year}
          month={month}
          day={selectedDay}
          events={selectedDayEvents}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  )
}
