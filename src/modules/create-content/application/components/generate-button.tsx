import { Zap } from 'lucide-react'

export function GenerateButton() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-6">
      <button
        type="button"
        className="brand-gradient flex items-center gap-4 rounded-2xl px-16 py-6 text-lg font-black tracking-tight text-white shadow-[0_20px_50px_rgba(163,166,255,0.2)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
      >
        <Zap size={24} className="fill-current" />
        <span>Gerar Conteudo</span>
      </button>
      <p className="text-xs font-medium text-on-surface-variant">
        Powered by Infinity Creators Neural Engine v4.2
      </p>
    </div>
  )
}
