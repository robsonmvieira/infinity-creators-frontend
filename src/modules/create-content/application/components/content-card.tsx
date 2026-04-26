'use client'

import { Camera, AtSign, Hash, Clock, AlertCircle, CheckCircle2, Loader2, Trash2, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ContentListItem, Platform, GenerateStatus } from '../types'
import { Link } from '@/src/i18n/navigation'

/* ── Config ──────────────────────────────────────────── */

const PLATFORM_ICON: Record<Platform, typeof Camera> = {
  instagram: Camera,
  threads: AtSign,
  x: Hash,
  tiktok: Hash,
}

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: 'Instagram',
  threads: 'Threads',
  x: 'X',
  tiktok: 'TikTok',
}

const STATUS_CONFIG: Record<GenerateStatus, { label: string; icon: typeof CheckCircle2; badgeClass: string; iconClass: string }> = {
  COMPLETED: {
    label: 'Publicado',
    icon: CheckCircle2,
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    iconClass: 'text-emerald-400',
  },
  PROCESSING: {
    label: 'Gerando...',
    icon: Loader2,
    badgeClass: 'bg-primary/10 text-primary border-primary/20',
    iconClass: 'text-primary animate-spin',
  },
  PENDING: {
    label: 'Pendente',
    icon: Clock,
    badgeClass: 'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20',
    iconClass: 'text-on-surface-variant',
  },
  FAILED: {
    label: 'Falhou',
    icon: AlertCircle,
    badgeClass: 'bg-error/10 text-error border-error/20',
    iconClass: 'text-error',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  'feature-launch': 'Feature Launch',
  'builder-in-public': 'Builder in Public',
  tip: 'Dica',
  milestone: 'Milestone',
  'behind-the-scenes': 'Bastidores',
  engagement: 'Engajamento',
  auto: 'Auto',
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

/* ── Component ───────────────────────────────────────── */

interface ContentCardProps {
  item: ContentListItem
  onDelete: (requestId: string) => void
  isDeleting: boolean
}

export function ContentCard({ item, onDelete, isDeleting }: Readonly<ContentCardProps>) {
  const statusCfg = STATUS_CONFIG[item.status]
  const StatusIcon = statusCfg.icon
  const isClickable = item.status === 'COMPLETED'

  const card = (
    <div className={`group relative min-h-[200px] rounded-2xl border border-outline-variant/15 bg-surface-container p-6 transition-colors ${isClickable ? 'cursor-pointer hover:bg-surface-container-high' : ''} ${isDeleting ? 'pointer-events-none opacity-50' : ''}`}>
      {/* Top: status badge + date + menu */}
      <div className="mb-4 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusCfg.badgeClass}`}>
          <StatusIcon size={12} className={statusCfg.iconClass} />
          {statusCfg.label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant">
            {formatDate(item.createdAt)}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.preventDefault()}
              className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg opacity-0 transition-all hover:bg-surface-bright group-hover:opacity-100"
              aria-label="Opções"
            >
              <MoreHorizontal size={14} className="text-on-surface-variant" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => { e.preventDefault(); onDelete(item.requestId) }}
              >
                <Trash2 size={12} />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Category */}
      <h4 className="mb-1 text-sm font-semibold text-on-surface">
        {CATEGORY_LABELS[item.contentMeta.category] ?? item.contentMeta.category}
      </h4>
      <p className="mb-4 text-xs text-on-surface-variant">
        {item.contentMeta.language}
      </p>

      {/* Platforms */}
      <div className="flex items-center gap-2">
        {item.platforms.map((p) => {
          const Icon = PLATFORM_ICON[p]
          return (
            <div
              key={p}
              className="flex items-center gap-1.5 rounded-lg bg-surface-container-highest px-2.5 py-1"
            >
              <Icon size={12} className="text-on-surface-variant" />
              <span className="text-[10px] font-medium text-on-surface-variant">
                {PLATFORM_LABEL[p]}
              </span>
            </div>
          )
        })}
      </div>

      {/* Error */}
      {item.errorMessage && (
        <p className="mt-3 text-xs text-error">{item.errorMessage}</p>
      )}
    </div>
  )

  if (!isClickable) return card

  return (
    <Link href={`/create/result?requestId=${item.requestId}`}>
      {card}
    </Link>
  )
}
