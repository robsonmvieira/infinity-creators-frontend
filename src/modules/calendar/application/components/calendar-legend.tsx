import { Filter } from 'lucide-react'

const PLATFORMS = [
  { label: 'Instagram', colorClass: 'bg-primary', glowClass: 'shadow-[0_0_8px_rgba(163,166,255,0.5)]' },
  { label: 'X (Twitter)', colorClass: 'bg-secondary', glowClass: 'shadow-[0_0_8px_rgba(255,103,173,0.5)]' },
  { label: 'Threads', colorClass: 'bg-tertiary', glowClass: 'shadow-[0_0_8px_rgba(255,177,72,0.5)]' },
]

export function CalendarLegend() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-outline-variant/10 py-4">
      {PLATFORMS.map((platform) => (
        <div key={platform.label} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${platform.colorClass} ${platform.glowClass}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            {platform.label}
          </span>
        </div>
      ))}

      <div className="ml-auto flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
          Showing: All Platforms
        </span>
        <Filter size={14} className="text-primary" />
      </div>
    </div>
  )
}
