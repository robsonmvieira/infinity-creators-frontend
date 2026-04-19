import { PenSquare, CalendarDays, BarChart3, Zap } from 'lucide-react'

const ACTIONS = [
  { label: 'Rascunho', icon: PenSquare, colorClass: 'text-primary' },
  { label: 'Calendario', icon: CalendarDays, colorClass: 'text-secondary' },
  { label: 'Metricas', icon: BarChart3, colorClass: 'text-tertiary' },
  { label: 'Comando', icon: Zap, colorClass: 'text-on-surface-variant' },
] as const

export function QuickActionBar() {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="glass ghost-border flex items-center gap-6 rounded-full px-6 py-3 shadow-2xl">
        {ACTIONS.map((action, i) => {
          const Icon = action.icon
          return (
            <div key={action.label} className="flex items-center gap-6">
              {i > 0 && <div className="h-4 w-px bg-outline-variant" />}
              <button
                type="button"
                className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1 transition-all hover:bg-surface-bright"
              >
                <Icon
                  size={18}
                  className={`${action.colorClass} transition-transform group-hover:scale-110`}
                />
                <span className="text-sm font-bold text-on-surface">
                  {action.label}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
