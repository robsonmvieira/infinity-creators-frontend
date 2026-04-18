import Image from 'next/image'

function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container px-3 py-1 text-xs font-medium uppercase tracking-wide text-tertiary">
      <span className="pulse-orb block h-2 w-2 rounded-full bg-tertiary" />
      Novo: Voice DNA™ 2.0 liberado
    </div>
  )
}

function HeroCTA() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
      <a
        href="#"
        className="brand-gradient w-full cursor-pointer rounded-xl px-8 py-4 text-center text-lg font-bold text-white transition-transform duration-200 hover:scale-105 sm:w-auto"
      >
        Começar Grátis
      </a>
      <a
        href="#"
        className="ghost-border w-full cursor-pointer rounded-xl bg-surface-container-low px-8 py-4 text-center text-lg font-bold text-on-surface transition-colors duration-200 hover:bg-surface-container sm:w-auto"
      >
        Ver Demo
      </a>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="brand-gradient mt-20 w-full max-w-6xl overflow-hidden rounded-2xl p-px">
      <div className="overflow-hidden rounded-[15px] bg-surface-container-low">
        <Image
          src="/hero-mockup.png"
          alt="Dashboard do Infinity Creators mostrando geração de conteúdo multi-plataforma"
          width={1200}
          height={675}
          className="h-auto w-full object-cover opacity-90"
          priority
        />
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="dot-grid relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-4xl space-y-8">
        <HeroBadge />

        <h1 className="text-5xl font-black leading-[1.1] tracking-[-0.04em] md:text-7xl">
          Seu conteúdo no{' '}
          <span className="text-brand-gradient">piloto automático</span>. Sem
          perder a sua voz.
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
          A única IA que realmente entende seu tom de voz. 1 input → conteúdo
          otimizado para Instagram, Threads, X e TikTok em segundos.
        </p>

        <HeroCTA />
      </div>

      <HeroMockup />
    </section>
  )
}
