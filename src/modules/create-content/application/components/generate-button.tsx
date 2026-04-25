import { Zap, Loader2 } from 'lucide-react'

interface GenerateButtonProps {
  productName: string
  hasBrandDna: boolean
  disabled: boolean
  isGenerating: boolean
  onGenerate: () => void
}

export function GenerateButton({
  productName,
  hasBrandDna,
  disabled,
  isGenerating,
  onGenerate,
}: Readonly<GenerateButtonProps>) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-6">
      <button
        type="button"
        onClick={onGenerate}
        disabled={disabled || isGenerating}
        className="brand-gradient flex cursor-pointer items-center gap-4 rounded-2xl px-16 py-6 text-lg font-black tracking-tight text-on-surface shadow-[0_20px_50px_rgba(163,166,255,0.2)] transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {isGenerating ? (
          <Loader2 size={24} className="animate-spin" />
        ) : (
          <Zap size={24} className="fill-current" />
        )}
        <span>{isGenerating ? 'Gerando...' : 'Gerar Conteúdo'}</span>
      </button>

      {hasBrandDna ? (
        <p className="text-xs font-medium text-on-surface-variant">
          A IA usará o DNA de voz do{' '}
          <span className="font-bold text-on-surface">{productName}</span>
        </p>
      ) : (
        <p className="text-xs font-medium text-amber-500">
          O {productName} ainda não tem DNA de voz configurado.{' '}
          <a href="/brand" className="underline hover:text-amber-400">
            Configurar agora →
          </a>
        </p>
      )}
    </div>
  )
}
