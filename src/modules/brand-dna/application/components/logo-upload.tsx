import { Upload, Plus } from 'lucide-react'

export function LogoUpload() {
  return (
    <section className="rounded-xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
          Logo Principal
        </h3>
        <Upload size={20} className="text-on-surface-variant" />
      </div>

      <div className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-outline-variant/30 p-12 transition-colors hover:border-primary/50">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-bright transition-transform group-hover:scale-110">
          <Plus size={28} className="text-primary" />
        </div>
        <p className="text-sm font-medium text-on-surface">
          Arraste os assets da marca aqui
        </p>
        <p className="mt-1 text-xs text-on-surface-variant">
          SVG, PNG ou AI (Max 20MB)
        </p>
      </div>
    </section>
  )
}
