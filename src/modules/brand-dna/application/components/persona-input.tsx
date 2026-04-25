'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import type { Persona } from '../types'

interface PersonaInputProps {
  value: Persona
  onChange: (value: Persona) => void
}

export function PersonaInput({ value, onChange }: Readonly<PersonaInputProps>) {
  const [addingRef, setAddingRef] = useState(false)
  const [refDraft, setRefDraft] = useState('')
  const refInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (addingRef) refInputRef.current?.focus()
  }, [addingRef])

  function handleAddReference() {
    const trimmed = refDraft.trim()
    if (!trimmed) return
    onChange({ ...value, styleReferences: [...value.styleReferences, trimmed] })
    setRefDraft('')
    setTimeout(() => refInputRef.current?.focus(), 0)
  }

  function handleRemoveReference(index: number) {
    onChange({
      ...value,
      styleReferences: value.styleReferences.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Name */}
      <div>
        <label
          htmlFor="persona-name"
          className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
        >
          Persona / Autor Principal
        </label>
        <input
          id="persona-name"
          type="text"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Ex: O Arquiteto Visionário"
          className="w-full border-0 border-b-2 border-outline-variant/30 bg-surface-container-low p-4 font-medium text-on-surface outline-none transition-all placeholder:text-surface-bright focus:border-primary focus:ring-0"
        />
      </div>

      {/* Bio */}
      <div>
        <label
          htmlFor="persona-bio"
          className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
        >
          Bio / Descrição
        </label>
        <textarea
          id="persona-bio"
          value={value.bio}
          onChange={(e) => onChange({ ...value, bio: e.target.value })}
          placeholder="Quem é essa persona? Ex: Dev brasileiro, builder in public, faz SaaS solo. Direto, sem enrolação, humor sutil."
          className="min-h-[80px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low p-4 text-sm leading-relaxed text-on-surface no-scrollbar placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Style References */}
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Referências de Estilo
        </p>
        <div className="rounded-lg border border-outline-variant/10 bg-surface-container-low p-3">
          {value.styleReferences.length === 0 && !addingRef && (
            <p className="py-1 text-center text-xs text-on-surface-variant/40">
              Nenhuma referência ainda
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {value.styleReferences.map((ref, i) => (
              <span
                key={`ref-${i}`}
                className="group flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {ref}
                <button
                  type="button"
                  onClick={() => handleRemoveReference(i)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label={`Remover ${ref}`}
                >
                  <X size={12} className="hover:text-error" />
                </button>
              </span>
            ))}
          </div>

          {addingRef ? (
            <div className="mt-2 flex items-center gap-2">
              <input
                ref={refInputRef}
                value={refDraft}
                onChange={(e) => setRefDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddReference()
                  if (e.key === 'Escape') { setAddingRef(false); setRefDraft('') }
                }}
                onBlur={() => { if (!refDraft.trim()) { setAddingRef(false); setRefDraft('') } }}
                placeholder="@levelsio, @marc_louvion..."
                className="flex-1 border-b border-primary bg-transparent py-1 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAddingRef(true)}
              className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant transition-colors hover:text-primary"
            >
              <Plus size={12} />
              Adicionar referência
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
