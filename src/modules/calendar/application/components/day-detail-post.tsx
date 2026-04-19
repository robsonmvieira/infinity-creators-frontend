import { Clock, Edit, Check } from 'lucide-react'
import type { CalendarEvent } from '../types'

const PLATFORM_LABELS: Record<string, { label: string; colorClass: string }> = {
  instagram: { label: 'Instagram Reel', colorClass: 'bg-primary/10 text-primary' },
  x: { label: 'X Thread', colorClass: 'bg-secondary/10 text-secondary' },
  threads: { label: 'Threads Post', colorClass: 'bg-tertiary/10 text-tertiary' },
  linkedin: { label: 'LinkedIn Article', colorClass: 'bg-primary/10 text-primary' },
  tiktok: { label: 'TikTok Video', colorClass: 'bg-secondary/10 text-secondary' },
}

export function DayDetailPost({ event }: Readonly<{ event: CalendarEvent }>) {
  const platformConfig = PLATFORM_LABELS[event.platform]

  return (
    <div className="group">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`rounded px-2 py-1 text-[10px] font-black uppercase tracking-widest ${platformConfig.colorClass}`}>
            {platformConfig.label}
          </span>
          <span className="text-xs text-on-surface-variant">{event.time}</span>
        </div>
        {event.status === 'published' ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tertiary text-surface-container-lowest">
            <Check size={14} />
          </span>
        ) : (
          <Clock size={16} className="text-on-surface-variant" />
        )}
      </div>

      <div className="rounded-2xl border border-outline-variant/10 bg-surface-container p-4 transition-all duration-200 group-hover:border-primary/30">
        <h4 className="mb-2 text-sm font-bold">{event.title}</h4>
        {event.description && (
          <p className="mb-4 text-xs italic leading-relaxed text-on-surface-variant">
            {event.description}
          </p>
        )}
        {event.tags && event.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-primary/10 bg-primary/5 px-2 py-1 text-[10px] font-bold text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 text-xs font-bold text-secondary transition-colors duration-200 hover:text-secondary/80"
          >
            Edit Post
            <Edit size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
