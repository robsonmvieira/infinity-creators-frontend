export type Platform = 'instagram' | 'x' | 'threads' | 'linkedin' | 'tiktok'

const PLATFORM_CONFIG: Record<Platform, { label: string; colorClass: string; dotClass: string }> = {
  instagram: { label: 'IG', colorClass: 'bg-primary/10 text-primary', dotClass: 'bg-primary' },
  x: { label: 'X', colorClass: 'bg-secondary/10 text-secondary', dotClass: 'bg-secondary' },
  threads: { label: 'TH', colorClass: 'bg-tertiary/10 text-tertiary', dotClass: 'bg-tertiary' },
  linkedin: { label: 'LI', colorClass: 'bg-primary/10 text-primary', dotClass: 'bg-primary' },
  tiktok: { label: 'TK', colorClass: 'bg-secondary/10 text-secondary', dotClass: 'bg-secondary' },
}

interface CalendarEventBadgeProps {
  platform: Platform
  title?: string
  compact?: boolean
}

export function CalendarEventBadge({ platform, title, compact }: Readonly<CalendarEventBadgeProps>) {
  const config = PLATFORM_CONFIG[platform]

  if (compact) {
    return (
      <div className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] ${config.colorClass}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
        {config.label}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-semibold ${config.colorClass} border-current/30`}>
      {title || config.label}
    </div>
  )
}
