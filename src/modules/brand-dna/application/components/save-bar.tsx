import { CloudCheck } from 'lucide-react'

export function SaveBar() {
  return (
    <div className="mx-auto mt-12 w-full max-w-4xl">
      <div className="flex items-center justify-between rounded-2xl border border-outline-variant/20 bg-surface-container/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-bright">
            <CloudCheck size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">
              Auto-saved to Cloud
            </p>
            <p className="text-[10px] text-on-surface-variant">
              Infinity Creators DNA v1.0.4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl px-6 py-2.5 text-sm font-bold text-on-surface transition-colors hover:bg-surface-bright"
          >
            Discard
          </button>
          <button
            type="button"
            className="brand-gradient rounded-xl px-8 py-2.5 text-sm font-bold text-on-surface shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            Publish DNA Changes
          </button>
        </div>
      </div>
    </div>
  )
}
