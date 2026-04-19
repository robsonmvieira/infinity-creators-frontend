import { Sparkles } from 'lucide-react'
import type { PerformanceMetric } from '../types'

const COLOR_MAP = {
  primary: { bar: 'brand-gradient', text: 'text-primary' },
  secondary: { bar: 'bg-secondary', text: 'text-secondary' },
  tertiary: { bar: 'bg-tertiary', text: 'text-tertiary' },
} as const

interface PerformanceCardProps {
  metrics: PerformanceMetric[]
}

export function PerformanceCard({ metrics }: Readonly<PerformanceCardProps>) {
  return (
    <div className="sticky top-28 rounded-3xl border border-outline-variant/15 bg-surface-container p-8">
      <h4 className="mb-6 text-xl font-bold text-on-surface">Performance Semanal</h4>

      <div className="space-y-8">
        {metrics.map((metric) => {
          const colors = COLOR_MAP[metric.color]
          return (
            <div key={metric.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">{metric.label}</span>
                <span className={`font-bold ${colors.text}`}>{metric.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-container-lowest">
                <div
                  className={`h-full rounded-full ${colors.bar}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 border-t border-outline-variant/15 pt-8">
        <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tertiary/10">
            <Sparkles size={20} className="text-tertiary" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Insights IA
            </p>
            <p className="text-sm font-medium leading-tight text-on-surface">
              Postar as 19:30 hoje aumentara seu alcance em 15%.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
