import { MoreVertical, Image } from 'lucide-react'
import type { RecentContent, ContentStatus } from '../types'

const STATUS_STYLES: Record<ContentStatus, string> = {
  published:
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  scheduled:
    'bg-primary/10 text-primary border-primary/20',
  draft:
    'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20',
}

const STATUS_LABELS: Record<ContentStatus, string> = {
  published: 'Publicado',
  scheduled: 'Agendado',
  draft: 'Rascunho',
}

interface RecentContentTableProps {
  items: RecentContent[]
}

export function RecentContentTable({ items }: Readonly<RecentContentTableProps>) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-on-surface">Conteudo Recente</h4>
        <button
          type="button"
          className="cursor-pointer text-sm font-bold text-primary transition-colors hover:underline"
        >
          Ver Todos
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/15 bg-surface-container-high/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Midia
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Status
              </th>
              <th className="hidden px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant sm:table-cell">
                Data
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="group border-b border-outline-variant/10 last:border-b-0 transition-colors hover:bg-surface-bright"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container-highest">
                      <Image size={16} className="text-on-surface-variant" />
                    </div>
                    <span className="font-medium text-on-surface">{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${STATUS_STYLES[item.status]}`}
                  >
                    {STATUS_LABELS[item.status]}
                  </span>
                </td>
                <td className="hidden px-6 py-4 text-sm text-on-surface-variant sm:table-cell">
                  {item.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Actions for ${item.title}`}
                    className="cursor-pointer text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
