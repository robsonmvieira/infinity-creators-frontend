export function CtaSection() {
  return (
    <section className="border-y border-outline-variant/10 bg-background px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <h2 className="text-4xl font-black leading-tight tracking-tight lg:text-5xl">
          Pronto para transformar sua criação?
        </h2>
        <p className="text-lg text-on-surface-variant">
          Junte-se a mais de 1,500 criadores que já automatizaram seu fluxo de
          trabalho.
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="brand-gradient cursor-pointer rounded-2xl px-12 py-5 text-xl font-bold text-white shadow-2xl shadow-primary/20 transition-transform duration-200 hover:scale-105"
          >
            Começar Agora de Graça
          </a>
        </div>
      </div>
    </section>
  )
}
