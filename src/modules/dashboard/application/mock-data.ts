import type { StatCard, RecentContent, PerformanceMetric } from './types'

export const MOCK_STATS: StatCard[] = [
  { id: 'total-posts', label: 'Total Posts', value: '128', change: 12 },
  { id: 'engagement', label: 'Engajamento', value: '4.2k', change: 5 },
  { id: 'published', label: 'Publicados', value: '85', change: -2 },
  { id: 'platforms', label: 'Plataformas', value: '4', change: 0 },
]

export const MOCK_RECENT_CONTENT: RecentContent[] = [
  {
    id: '1',
    title: 'Setup Gamer 2024',
    status: 'published',
    date: 'Ha 2 horas',
    imageAlt: 'Macro shot of mechanical keyboard keys with blue backlight',
  },
  {
    id: '2',
    title: 'Vlog em Sao Paulo',
    status: 'scheduled',
    date: 'Amanha, 10:00',
    imageAlt: 'Neon city lights reflected in a rainy window at night',
  },
  {
    id: '3',
    title: 'Dicas de Edicao',
    status: 'draft',
    date: 'Editado hoje',
    imageAlt: 'Vintage camera and photography equipment on wooden table',
  },
]

export const MOCK_PERFORMANCE: PerformanceMetric[] = [
  { id: 'engagement', label: 'Engajamento Total', value: 82, color: 'primary' },
  { id: 'followers', label: 'Crescimento de Seguidores', value: 65, color: 'secondary' },
  { id: 'clicks', label: 'Taxa de Cliques', value: 48, color: 'tertiary' },
]
