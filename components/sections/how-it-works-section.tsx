import { Settings, Network, PenLine, Send } from 'lucide-react'

interface StepProps {
  icon: React.ReactNode
  iconStyle: 'gradient' | 'surface'
  iconColor?: string
  step: number
  title: string
  description: string
}

function Step({ icon, iconStyle, iconColor, step, title, description }: StepProps) {
  return (
    <div className="group relative flex flex-col items-center text-center">
      <div
        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110 ${
          iconStyle === 'gradient'
            ? 'brand-gradient text-white'
            : `border border-outline-variant/20 bg-surface-container ${iconColor}`
        }`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold">
        {step}. {title}
      </h3>
      <p className="text-sm text-on-surface-variant">{description}</p>
    </div>
  )
}

const STEPS: StepProps[] = [
  {
    icon: <Settings size={28} />,
    iconStyle: 'gradient',
    step: 1,
    title: 'Configure DNA',
    description: 'Importe seus textos antigos para a IA aprender seu tom.',
  },
  {
    icon: <Network size={28} />,
    iconStyle: 'surface',
    iconColor: 'text-secondary',
    step: 2,
    title: 'Conecte Canais',
    description: 'Link suas redes sociais para publicação direta.',
  },
  {
    icon: <PenLine size={28} />,
    iconStyle: 'surface',
    iconColor: 'text-tertiary',
    step: 3,
    title: 'Dê o Input',
    description: 'Uma frase, um link ou um áudio. A magia começa aqui.',
  },
  {
    icon: <Send size={28} />,
    iconStyle: 'surface',
    iconColor: 'text-primary',
    step: 4,
    title: 'Publique',
    description: 'Revise em segundos e agende para o horário nobre.',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-surface-container-lowest px-6 py-24 md:px-12"
    >
      <div className="mx-auto mb-16 max-w-6xl text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight">
          Como funciona o seu novo workflow
        </h2>
        <p className="text-on-surface-variant">
          Do zero ao post em menos de 5 minutos.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-4">
        {STEPS.map((step) => (
          <Step key={step.step} {...step} />
        ))}
      </div>
    </section>
  )
}
