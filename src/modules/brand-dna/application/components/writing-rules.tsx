'use client'

import { useState, useRef, useEffect } from 'react'
import { CheckCircle, XCircle, Plus, X } from 'lucide-react'

interface WritingRulesProps {
  alwaysUse: string[]
  neverUse: string[]
  onAlwaysUseChange: (rules: string[]) => void
  onNeverUseChange: (rules: string[]) => void
}

function RuleList({
  id,
  label,
  icon: Icon,
  iconClass,
  rules,
  onChange,
}: Readonly<{
  id: string
  label: string
  icon: typeof CheckCircle
  iconClass: string
  rules: string[]
  onChange: (rules: string[]) => void
}>) {
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (adding) inputRef.current?.focus()
  }, [adding])

  function handleAdd() {
    const trimmed = draft.trim()
    if (!trimmed) return
    onChange([...rules, trimmed])
    setDraft('')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function handleRemove(index: number) {
    onChange(rules.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <p className="flex items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        <Icon size={12} className={`mr-2 ${iconClass}`} />
        {label}
      </p>

      <div className="min-h-[80px] rounded-lg border border-outline-variant/10 bg-surface-container-low p-3">
        {rules.length === 0 && !adding && (
          <p className="py-2 text-center text-xs text-on-surface-variant/40">
            Nenhuma regra ainda
          </p>
        )}

        <ul className="space-y-1.5">
          {rules.map((rule, i) => (
            <li key={`${id}-${i}`} className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-surface-bright/30">
              <span className="flex-1 text-sm text-on-surface">{rule}</span>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label={`Remover: ${rule}`}
              >
                <X size={14} className="text-on-surface-variant hover:text-error" />
              </button>
            </li>
          ))}
        </ul>

        {adding ? (
          <div className="mt-1.5 flex items-center gap-2 px-2">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd()
                if (e.key === 'Escape') { setAdding(false); setDraft('') }
              }}
              onBlur={() => { if (!draft.trim()) { setAdding(false); setDraft('') } }}
              placeholder="Digite uma regra e pressione Enter"
              className="flex-1 border-b border-primary bg-transparent py-1 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="mt-1.5 flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-on-surface-variant transition-colors hover:bg-surface-bright/30"
          >
            <Plus size={12} />
            Adicionar regra
          </button>
        )}
      </div>
    </div>
  )
}

export function WritingRules({
  alwaysUse,
  neverUse,
  onAlwaysUseChange,
  onNeverUseChange,
}: Readonly<WritingRulesProps>) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <RuleList
        id="always"
        label="Sempre Usar"
        icon={CheckCircle}
        iconClass="text-tertiary"
        rules={alwaysUse}
        onChange={onAlwaysUseChange}
      />
      <RuleList
        id="never"
        label="Nunca Usar"
        icon={XCircle}
        iconClass="text-error"
        rules={neverUse}
        onChange={onNeverUseChange}
      />
    </div>
  )
}
