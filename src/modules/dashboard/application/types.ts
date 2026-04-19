export interface StatCard {
  id: string
  label: string
  value: string
  change: number
}

export interface ScheduledPost {
  title: string
  description: string
  imageAlt: string
}

export type ContentStatus = 'published' | 'scheduled' | 'draft'

export interface RecentContent {
  id: string
  title: string
  status: ContentStatus
  date: string
  imageAlt: string
}

export interface PerformanceMetric {
  id: string
  label: string
  value: number
  color: 'primary' | 'secondary' | 'tertiary'
}
