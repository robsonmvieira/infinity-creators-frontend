import {
  Layers,
  Brain,
  Sparkles,
  Bot,
  TrendingUp,
  Users,
} from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  iconColor: string
  title: string
  description: string
}

function FeatureCard({ icon, iconColor, title, description }: FeatureCardProps) {
  return (
    <div className="ghost-border rounded-3xl bg-surface-container p-8 transition-colors duration-200 hover:bg-surface-bright/10">
      <div className={`mb-6 ${iconColor}`}>{icon}</div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-on-surface-variant">
        {description}
      </p>
    </div>
  )
}

const FEATURES: FeatureCardProps[] = [
  {
    icon: <Layers size={28} />,
    iconColor: 'text-primary',
    title: 'Content Multiplier',
    description:
      'Transforme um único insight em uma semana inteira de posts otimizados para cada plataforma.',
  },
  {
    icon: <Brain size={28} />,
    iconColor: 'text-secondary',
    title: 'Voice DNA™',
    description:
      'Nossa tecnologia exclusiva mapeia seus padrões de linguagem para que a IA nunca soe genérica.',
  },
  {
    icon: <Sparkles size={28} />,
    iconColor: 'text-tertiary',
    title: 'Auto Creatives',
    description:
      'Sugestão automática de imagens e layouts para seus posts baseada no conteúdo do texto.',
  },
  {
    icon: <Bot size={28} />,
    iconColor: 'text-primary',
    title: 'Auto Pilot',
    description:
      'Agendamento inteligente que detecta quando seu público está mais ativo em cada rede.',
  },
  {
    icon: <TrendingUp size={28} />,
    iconColor: 'text-secondary',
    title: 'Analytics Pro',
    description:
      'Dashboard unificado para acompanhar seu crescimento sem precisar de 10 abas abertas.',
  },
  {
    icon: <Users size={28} />,
    iconColor: 'text-tertiary',
    title: 'Builder in Public',
    description:
      'Recursos exclusivos para criadores que compartilham sua jornada e faturam com conteúdo.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
