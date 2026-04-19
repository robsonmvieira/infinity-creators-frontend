import { Globe, AtSign } from 'lucide-react'

interface FooterColumnProps {
  title: string
  titleColor: string
  links: string[]
}

function FooterColumn({ title, titleColor, links }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      <h4 className={`text-sm font-bold uppercase tracking-widest ${titleColor}`}>
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-on-surface-variant">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="cursor-pointer transition-colors duration-200 hover:text-on-surface"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLogo() {
  return (
    <div className="col-span-2 space-y-6 lg:col-span-1">
      <div className="flex items-center gap-3">
        <div className="brand-gradient flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white">
          IC
        </div>
        <span className="text-xl font-bold tracking-tight">
          Infinity Creators
        </span>
      </div>
      <p className="max-w-xs text-sm leading-relaxed text-on-surface-variant">
        Empoderando criadores com IA autêntica para dominar o ecossistema
        digital.
      </p>
      <div className="flex gap-4">
        <a
          href="#"
          className="cursor-pointer text-on-surface-variant transition-colors duration-200 hover:text-primary"
          aria-label="Website"
        >
          <Globe size={20} />
        </a>
        <a
          href="#"
          className="cursor-pointer text-on-surface-variant transition-colors duration-200 hover:text-primary"
          aria-label="Email"
        >
          <AtSign size={20} />
        </a>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/10 bg-surface-container-lowest px-6 py-20 lg:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <FooterLogo />
        <FooterColumn
          title="Produto"
          titleColor="text-primary"
          links={['Features', 'Voice DNA', 'Pricing', 'Changelog']}
        />
        <FooterColumn
          title="Recursos"
          titleColor="text-secondary"
          links={['Documentação', 'Blog', 'Comunidade', 'Templates']}
        />
        <FooterColumn
          title="Empresa"
          titleColor="text-tertiary"
          links={['Sobre', 'Privacidade', 'Termos', 'Contato']}
        />
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-outline-variant/5 pt-8 text-[10px] uppercase tracking-widest text-on-surface-variant md:flex-row">
        <span>&copy; 2024 Infinity Creators. All rights reserved.</span>
        <span>Built for the Creator Economy</span>
      </div>
    </footer>
  )
}
