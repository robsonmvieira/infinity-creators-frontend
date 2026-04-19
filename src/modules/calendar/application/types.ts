import type { Platform } from './components/calendar-event-badge'

export interface CalendarEvent {
  id: string
  title: string
  platform: Platform
  date: string // YYYY-MM-DD
  time: string // HH:MM
  description?: string
  tags?: string[]
  status: 'scheduled' | 'published' | 'draft'
  reachEstimate?: string
  engagementRate?: string
}
