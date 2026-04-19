'use client'

interface PersonaInputProps {
  value: string
  onChange: (value: string) => void
}

export function PersonaInput({ value, onChange }: Readonly<PersonaInputProps>) {
  return (
    <div className="mb-8">
      <label
        htmlFor="persona-input"
        className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
      >
        Persona / Autor Principal
      </label>
      <input
        id="persona-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 border-b-2 border-outline-variant/30 bg-surface-container-low p-4 font-medium text-on-surface outline-none transition-all placeholder:text-surface-bright focus:border-primary focus:ring-0"
      />
    </div>
  )
}
