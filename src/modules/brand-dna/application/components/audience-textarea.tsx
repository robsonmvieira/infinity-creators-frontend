'use client'

import { Users } from 'lucide-react'

interface AudienceTextareaProps {
  value: string
  onChange: (value: string) => void
}

export function AudienceTextarea({ value, onChange }: Readonly<AudienceTextareaProps>) {
  return (
    <div className="mb-8">
      <label
        htmlFor="audience-textarea"
        className="mb-3 flex items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
      >
        <Users size={12} className="mr-2 text-primary" />
        Audiência / Público-Alvo
      </label>
      <textarea
        id="audience-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Descreva quem é sua audiência: idade, interesses, dores, nível de conhecimento, o que buscam..."
        className="min-h-[120px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low p-4 text-sm leading-relaxed text-on-surface no-scrollbar placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}
