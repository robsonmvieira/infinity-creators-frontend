import { Play, Eye } from 'lucide-react'

export function NextScheduledCard() {
  return (
    <div className="brand-gradient relative overflow-hidden rounded-3xl p-8">
      <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
        <div className="h-48 w-48 shrink-0 overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md">
          <div className="flex h-full w-full items-center justify-center bg-surface-container-lowest/30">
            <Play size={48} className="text-on-surface/50" />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-surface">
              Proximo agendado
            </span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-on-surface" />
          </div>
          <h3 className="mb-2 text-3xl font-extrabold leading-tight text-on-surface">
            Review de Gadgets 2024
          </h3>
          <p className="mb-6 font-medium text-on-surface/90">
            Hoje as 18:00 — YouTube & Instagram Reels
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              className="cursor-pointer rounded-xl bg-on-surface px-6 py-3 font-bold text-background transition-transform hover:scale-105"
            >
              Editar Post
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-on-surface/20 bg-on-surface/10 px-6 py-3 font-bold text-on-surface backdrop-blur-md transition-all hover:bg-on-surface/20"
            >
              <Eye size={16} />
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
