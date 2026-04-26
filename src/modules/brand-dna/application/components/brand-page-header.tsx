'use client'

interface BrandPageHeaderProps {
  name: string
  onNameChange: (name: string) => void
}

export function BrandPageHeader({ name, onNameChange }: Readonly<BrandPageHeaderProps>) {
  return (
    <header className="mb-12">
      <p className="mb-3 text-sm leading-relaxed text-on-surface-variant">
        Sistema de Identidade da Marca
      </p>
      <div>
        <label htmlFor="brand-name" className="sr-only">
          Nome da marca
        </label>
        <input
          id="brand-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Nome da sua marca"
          className="w-full border-0 bg-transparent text-4xl font-black tracking-tighter text-on-surface outline-none placeholder:text-on-surface-variant/30"
        />
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
        Defina a alma criativa da sua marca. Esses dados alimentam
        nossos motores generativos para garantir consistencia absoluta em
        todos os pontos de contato.
      </p>
    </header>
  )
}
