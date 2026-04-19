import type { StatCard } from '../types'

interface StatsRowProps {
  stats: StatCard[]
}

function StatItem({ stat }: Readonly<{ stat: StatCard }>) {
  const changeColor =
    stat.change > 0
      ? 'text-primary'
      : stat.change < 0
        ? 'text-error'
        : 'text-on-surface-variant'

  const changeLabel =
    stat.change > 0
      ? `+${stat.change}%`
      : stat.change < 0
        ? `${stat.change}%`
        : '0%'

  return (
    <div className="rounded-2xl border border-outline-variant/15 bg-surface-container p-6 transition-colors hover:bg-surface-container-high">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        {stat.label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-on-surface">{stat.value}</span>
        <span className={`text-sm font-medium ${changeColor}`}>{changeLabel}</span>
      </div>
    </div>
  )
}

export function StatsRow({ stats }: Readonly<StatsRowProps>) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatItem key={stat.id} stat={stat} />
      ))}
    </section>
  )
}
