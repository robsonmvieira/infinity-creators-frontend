import { Rocket, Camera, ChevronDown } from 'lucide-react'

function PlatformPreview({
  label,
  labelColor,
}: {
  label: string
  labelColor: string
}) {
  return (
    <div className="rounded-lg border border-outline-variant/20 bg-surface-bright/50 p-3">
      <div className={`mb-1 text-[9px] font-bold uppercase ${labelColor}`}>
        {label}
      </div>
      <div className="mb-1 h-1 w-full rounded bg-outline-variant/30" />
      <div className="h-1 w-2/3 rounded bg-outline-variant/30" />
    </div>
  )
}

function InputDemo() {
  return (
    <div className="ghost-border w-full flex-1 space-y-4 rounded-3xl bg-surface-container p-8">
      <div className="rounded-xl border border-primary/20 bg-surface-container-low p-4">
        <div className="mb-2 text-[10px] font-bold uppercase text-primary">
          Seu Input (Ideia)
        </div>
        <p className="text-sm italic text-on-surface">
          &ldquo;3 formas de usar IA para aumentar a produtividade no design sem
          perder a criatividade&rdquo;
        </p>
      </div>

      <div className="flex justify-center py-4">
        <ChevronDown size={32} className="animate-bounce text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <PlatformPreview label="X Post" labelColor="text-tertiary" />
        <PlatformPreview label="IG Reel Script" labelColor="text-secondary" />
        <PlatformPreview label="Threads" labelColor="text-primary" />
        <PlatformPreview label="LinkedIn" labelColor="text-tertiary" />
      </div>
    </div>
  )
}

function PlatformItem({
  icon,
  iconColor,
  title,
  description,
}: {
  icon: React.ReactNode
  iconColor: string
  title: string
  description: string
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-container ${iconColor}`}
      >
        {icon}
      </span>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-xs text-on-surface-variant">{description}</p>
      </div>
    </li>
  )
}

export function ContentMultiplierSection() {
  return (
    <section className="bg-background px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
            Um input. <br />
            <span className="text-brand-gradient">Infinitas possibilidades.</span>
          </h2>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            Nossa engine de tradução de contexto não apenas &ldquo;copia&rdquo; o
            texto. Ela reescreve a psicologia da postagem baseada em como os
            usuários de cada plataforma se comportam.
          </p>
          <ul className="space-y-4">
            <PlatformItem
              icon={<Rocket size={20} />}
              iconColor="text-primary"
              title="Threads & X"
              description="Hooks curtos e threads virais"
            />
            <PlatformItem
              icon={<Camera size={20} />}
              iconColor="text-secondary"
              title="Instagram & TikTok"
              description="Roteiros de Reels e legendas engajadoras"
            />
          </ul>
        </div>

        <InputDemo />
      </div>
    </section>
  )
}
