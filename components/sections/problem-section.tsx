import { X, AlertTriangle, CheckCircle } from 'lucide-react'

interface ProblemCardProps {
  label: string
  labelColor: string
  title: string
  description: string
  indicator: React.ReactNode
  highlight?: boolean
}

function ProblemCard({
  label,
  labelColor,
  title,
  description,
  indicator,
  highlight,
}: ProblemCardProps) {
  return (
    <div
      className={`ghost-border relative space-y-4 overflow-hidden rounded-2xl p-8 ${
        highlight
          ? 'border-primary/30 bg-surface-container-highest'
          : 'bg-surface-container-low'
      }`}
    >
      {highlight && (
        <div className="absolute right-0 top-0 p-4">
          <span className="pulse-orb block h-2 w-2 rounded-full bg-tertiary" />
        </div>
      )}
      <div className={`text-sm font-bold uppercase tracking-widest ${labelColor}`}>
        {label}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-on-surface-variant">
        {description}
      </p>
      <div className="pt-4">{indicator}</div>
    </div>
  )
}

export function ProblemSection() {
  return (
    <section className="bg-background px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            O fim do conteúdo genérico
          </h2>
          <p className="max-w-xl text-on-surface-variant">
            Por que lutar contra o algoritmo quando você pode dominá-lo com
            inteligência?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <ProblemCard
            label="Criação Manual"
            labelColor="text-error"
            title="Lento e Exaustivo"
            description="Horas escrevendo legendas, adaptando formatos e postando manualmente em cada rede social."
            indicator={
              <div className="flex items-center gap-2 text-error">
                <X size={18} />
                <span className="text-sm">Gasta 10h+ por semana</span>
              </div>
            }
          />
          <ProblemCard
            label="IA Genérica"
            labelColor="text-on-surface-variant"
            title="Sem Identidade"
            description="Textos que parecem robóticos, sem o seu 'tempero' pessoal e que o público ignora."
            indicator={
              <div className="flex items-center gap-2 text-on-surface-variant">
                <AlertTriangle size={18} />
                <span className="text-sm">Baixo engajamento</span>
              </div>
            }
          />
          <ProblemCard
            label="Infinity Creators"
            labelColor="text-primary"
            title="Máxima Autenticidade"
            description="Seu Voice DNA aplicado em escala para todas as redes em um único clique."
            highlight
            indicator={
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle size={18} />
                <span className="text-sm font-bold">10x mais rápido</span>
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
