import { Check, X } from 'lucide-react'

interface PlanFeature {
  text: string
  included: boolean
}

interface PlanCardProps {
  name: string
  description: string
  price: number
  features: PlanFeature[]
  popular?: boolean
}

function PlanCard({ name, description, price, features, popular }: PlanCardProps) {
  return (
    <div
      className={`ghost-border flex flex-col rounded-3xl p-8 ${
        popular
          ? 'relative scale-105 border-primary bg-surface-container-highest shadow-2xl shadow-primary/10'
          : 'bg-background'
      }`}
    >
      {popular && (
        <div className="brand-gradient absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          Mais Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="mb-1 text-xl font-bold">{name}</h3>
        <p className="text-sm text-on-surface-variant">{description}</p>
      </div>

      <div className="mb-8">
        <span className="text-4xl font-black">${price}</span>
        <span className="text-on-surface-variant">/mês</span>
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {features.map((feature) => (
          <li
            key={feature.text}
            className={`flex items-center gap-2 text-sm ${
              feature.included ? '' : 'text-on-surface-variant/50'
            }`}
          >
            {feature.included ? (
              <Check size={14} className="text-primary" />
            ) : (
              <X size={14} />
            )}
            {feature.text}
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={`w-full cursor-pointer rounded-xl py-3 text-center text-sm font-bold transition-all duration-200 ${
          popular
            ? 'brand-gradient text-white hover:opacity-90'
            : 'bg-surface-bright text-on-surface hover:bg-surface-container'
        }`}
      >
        {popular ? 'Começar Pro' : 'Escolher Plano'}
      </a>
    </div>
  )
}

const PLANS: PlanCardProps[] = [
  {
    name: 'Starter',
    description: 'Para quem está começando.',
    price: 0,
    features: [
      { text: '10 Conteúdos / mês', included: true },
      { text: '2 Redes Sociais', included: true },
      { text: 'Voice DNA™ Pro', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'Criação ilimitada com sua voz.',
    price: 29,
    popular: true,
    features: [
      { text: 'Conteúdo Ilimitado', included: true },
      { text: 'Todas as Redes Sociais', included: true },
      { text: 'Voice DNA™ Pro', included: true },
      { text: 'Agendamento Automático', included: true },
    ],
  },
  {
    name: 'Scale',
    description: 'Para times e agências.',
    price: 79,
    features: [
      { text: 'Até 5 Membros no Time', included: true },
      { text: 'Multi-perfil DNA', included: true },
      { text: 'API Access', included: true },
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-surface-container-low px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Preço justo para criadores
          </h2>
          <p className="text-on-surface-variant">
            Escalone sua presença sem estourar o orçamento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
