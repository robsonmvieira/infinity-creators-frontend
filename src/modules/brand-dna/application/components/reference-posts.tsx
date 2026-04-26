'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  FileText,
  Globe,
  AtSign,
  MoreHorizontal,
  MessageSquare,
  Plus,
  Brain,
  Lightbulb,
  Info,
  Trash2,
  X,
  Link as LinkIcon,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ReferenceItem, LearnedPattern, SourceType } from '../types'

/* ── Props ─────────────────────────────────────────── */

interface ReferencePostsProps {
  anchors: ReferenceItem[]
  antiPatterns: ReferenceItem[]
  learnedPatterns: LearnedPattern[]
  onAnchorsChange: (anchors: ReferenceItem[]) => void
  onAntiPatternsChange: (antiPatterns: ReferenceItem[]) => void
  onLearnedPatternsChange: (patterns: LearnedPattern[]) => void
  onApplyRule?: (rule: string, target: 'always' | 'never') => void
}

/* ── Icon Map ──────────────────────────────────────── */

const SOURCE_ICON_MAP: Record<SourceType, typeof FileText> = {
  manual: FileText,
  notion: FileText,
  x: AtSign,
  url: Globe,
}

/* ── Helpers ───────────────────────────────────────── */

let nextId = 100
function genId() {
  return `ref-${++nextId}`
}

function detectSourceType(url: string): SourceType {
  const lower = url.toLowerCase()
  if (lower.includes('notion.so') || lower.includes('notion.site')) return 'notion'
  if (lower.includes('x.com') || lower.includes('twitter.com')) return 'x'
  if (lower.includes('http') || lower.includes('www')) return 'url'
  return 'manual'
}

function formatSourceDisplay(sourceType: SourceType, sourceUrl?: string): string {
  const labels: Record<SourceType, string> = {
    notion: 'Vinculado via Notion',
    x: 'Importado do X',
    url: 'Importado via link',
    manual: 'Colado manualmente',
  }
  const base = labels[sourceType]
  return sourceUrl ? `${base} · ${new URL(sourceUrl).hostname}` : base
}

function safeFormatSource(sourceType: SourceType, sourceUrl?: string): string {
  try {
    return formatSourceDisplay(sourceType, sourceUrl)
  } catch {
    return sourceUrl ? `Vinculado · ${sourceUrl}` : 'Colado manualmente'
  }
}

/* ── Sub-components ────────────────────────────────── */

function SectionLabel({
  dotColor,
  label,
  description,
}: Readonly<{
  dotColor: string
  label: string
  description: string
}>) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          {label}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-on-surface-variant">{description}</p>
    </div>
  )
}

function Tag({ label, variant }: Readonly<{ label: string; variant: 'primary' | 'neutral' | 'danger' }>) {
  const styles = {
    primary: 'bg-primary/10 text-primary',
    neutral: 'bg-surface-bright/50 text-on-surface-variant',
    danger: 'bg-error/10 text-error',
  }
  return (
    <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${styles[variant]}`}>
      {label}
    </span>
  )
}

function EditableAnnotation({
  value,
  placeholder,
  onChange,
}: Readonly<{
  value: string
  placeholder: string
  onChange: (value: string) => void
}>) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function commit() {
    onChange(draft.trim() || value)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="mt-3 flex items-start gap-2">
        <MessageSquare size={12} className="mt-1.5 shrink-0 text-on-surface-variant" />
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
          className="w-full border-b border-primary bg-transparent pb-0.5 text-xs italic text-on-surface outline-none"
          placeholder={placeholder}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => { setDraft(value); setEditing(true) }}
      className="mt-3 flex w-full items-start gap-2 text-left"
    >
      <MessageSquare size={12} className="mt-0.5 shrink-0 text-on-surface-variant" />
      <p className="w-full border-b border-dashed border-outline-variant/20 pb-0.5 text-xs italic text-on-surface-variant transition-colors hover:text-on-surface">
        {value || <span className="not-italic text-on-surface-variant/40">{placeholder}</span>}
      </p>
    </button>
  )
}

function ReferenceCard({
  item,
  isDanger,
  onRemove,
  onAnnotationChange,
  onContentChange,
}: Readonly<{
  item: ReferenceItem
  isDanger?: boolean
  onRemove: () => void
  onAnnotationChange: (annotation: string) => void
  onContentChange: (content: string) => void
}>) {
  const [expanded, setExpanded] = useState(false)
  const Icon = SOURCE_ICON_MAP[item.sourceType]
  const iconContainerClass = isDanger ? 'bg-error/10' : 'bg-surface-bright/50'
  const iconClass = isDanger ? 'text-error' : 'text-primary'
  const displaySource = safeFormatSource(item.sourceType, item.sourceUrl)

  return (
    <div className="rounded-xl border border-outline-variant/10 bg-surface-container p-4">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${iconContainerClass}`}>
            <Icon size={14} className={iconClass} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-on-surface">{item.title}</p>
            <p className="text-[10px] text-on-surface-variant">{displaySource}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-surface-bright/50"
            aria-label="Opções"
          >
            <MoreHorizontal size={14} className="text-on-surface-variant" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem variant="destructive" onClick={onRemove}>
              <Trash2 size={12} />
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-2 flex items-center gap-1 text-[10px] font-medium text-primary transition-colors hover:text-primary/80"
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {item.content ? 'Editar conteúdo' : 'Adicionar conteúdo (usado como few-shot)'}
      </button>

      {expanded && (
        <textarea
          value={item.content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Cole o texto completo ou o trecho principal. A IA usa isso como exemplo de few-shot para reproduzir seu tom."
          className="mt-2 min-h-[100px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low p-3 text-xs leading-relaxed text-on-surface no-scrollbar placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      )}

      {/* Editable annotation */}
      <EditableAnnotation
        value={item.annotation}
        placeholder="O que você gosta nesse texto? (ajuda a IA a entender)"
        onChange={onAnnotationChange}
      />

      {/* Tags row */}
      <div className="mt-2 flex gap-1.5">
        {item.tags.map((tag) => (
          <Tag key={tag.label} label={tag.label} variant={tag.variant} />
        ))}
      </div>
    </div>
  )
}

function AddReferenceForm({
  isDanger,
  onAdd,
  onCancel,
}: Readonly<{
  isDanger?: boolean
  onAdd: (item: Omit<ReferenceItem, 'id'>) => void
  onCancel: () => void
}>) {
  const [title, setTitle] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [content, setContent] = useState('')
  const [annotation, setAnnotation] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => { titleRef.current?.focus() }, [])

  function handleSubmit() {
    if (!title.trim()) return
    const sourceType = sourceUrl.trim() ? detectSourceType(sourceUrl) : 'manual'

    const tags: ReferenceItem['tags'] = isDanger
      ? [{ label: 'Anti-padrão', variant: 'danger' }]
      : [{ label: 'Meu texto', variant: 'primary' }]

    onAdd({
      title: title.trim(),
      content: content.trim(),
      sourceType,
      sourceUrl: sourceUrl.trim() || undefined,
      annotation: annotation.trim(),
      tags,
    })
  }

  return (
    <div className="rounded-xl border border-primary/30 bg-surface-container p-4">
      <div className="space-y-3">
        <div>
          <label htmlFor="ref-title" className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Título
          </label>
          <input
            ref={titleRef}
            id="ref-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') onCancel() }}
            placeholder="Ex: Manifesto sobre criação de conteúdo"
            className="w-full rounded-lg border border-outline-variant/10 bg-surface-container-low px-3 py-2 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="ref-source" className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            <LinkIcon size={10} />
            Fonte / Link (opcional)
          </label>
          <input
            id="ref-source"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="Link do Notion, X, ou deixe vazio"
            className="w-full rounded-lg border border-outline-variant/10 bg-surface-container-low px-3 py-2 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="ref-content" className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            <FileText size={10} />
            Conteúdo (few-shot para a IA)
          </label>
          <textarea
            id="ref-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Cole o texto completo ou trecho principal..."
            className="min-h-[80px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low px-3 py-2 text-sm text-on-surface no-scrollbar outline-none placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="ref-annotation" className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            <MessageSquare size={10} />
            Anotação
          </label>
          <input
            id="ref-annotation"
            value={annotation}
            onChange={(e) => setAnnotation(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && title.trim()) handleSubmit() }}
            placeholder="O que você gosta (ou não) nesse texto?"
            className="w-full rounded-lg border border-outline-variant/10 bg-surface-container-low px-3 py-2 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X size={14} />
          Cancelar
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={!title.trim()}>
          <Plus size={14} />
          Adicionar
        </Button>
      </div>
    </div>
  )
}

function AddButton({
  label,
  hint,
  onClick,
}: Readonly<{ label: string; hint: string; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-outline-variant/20 p-3 transition-colors hover:border-primary/30"
    >
      <div className="flex items-center gap-2">
        <Plus size={14} className="text-on-surface-variant" />
        <span className="text-xs text-on-surface-variant">{label}</span>
      </div>
      <span className="text-[10px] text-on-surface-variant/60">{hint}</span>
    </button>
  )
}

function PatternRow({
  pattern,
  onApply,
  onDismiss,
}: Readonly<{
  pattern: LearnedPattern
  onApply: () => void
  onDismiss: () => void
}>) {
  if (pattern.status !== 'suggested') return null

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant/10 bg-surface-container px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        <Lightbulb size={12} className="shrink-0 text-tertiary" />
        <span className="truncate text-xs text-on-surface">{pattern.text}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="text-[10px] text-on-surface-variant">
          {pattern.edits} edições
        </span>
        <Button variant="ghost" size="xs" onClick={onDismiss} aria-label="Ignorar">
          <EyeOff size={12} />
        </Button>
        <Button variant="ghost" size="xs" onClick={onApply}>
          Aplicar como regra
        </Button>
      </div>
    </div>
  )
}

/* ── Main Component ────────────────────────────────── */

export function ReferencePosts({
  anchors,
  antiPatterns,
  learnedPatterns,
  onAnchorsChange,
  onAntiPatternsChange,
  onLearnedPatternsChange,
  onApplyRule,
}: Readonly<ReferencePostsProps>) {
  const [addingAnchor, setAddingAnchor] = useState(false)
  const [addingAntiPattern, setAddingAntiPattern] = useState(false)

  const suggestedPatterns = learnedPatterns.filter((p) => p.status === 'suggested')

  const removeAnchor = useCallback((id: string) => {
    onAnchorsChange(anchors.filter((item) => item.id !== id))
  }, [anchors, onAnchorsChange])

  const removeAntiPattern = useCallback((id: string) => {
    onAntiPatternsChange(antiPatterns.filter((item) => item.id !== id))
  }, [antiPatterns, onAntiPatternsChange])

  const updateAnchor = useCallback((id: string, patch: Partial<ReferenceItem>) => {
    onAnchorsChange(anchors.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }, [anchors, onAnchorsChange])

  const updateAntiPattern = useCallback((id: string, patch: Partial<ReferenceItem>) => {
    onAntiPatternsChange(antiPatterns.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }, [antiPatterns, onAntiPatternsChange])

  const addAnchor = useCallback((data: Omit<ReferenceItem, 'id'>) => {
    onAnchorsChange([...anchors, { ...data, id: genId() }])
    setAddingAnchor(false)
  }, [anchors, onAnchorsChange])

  const addAntiPattern = useCallback((data: Omit<ReferenceItem, 'id'>) => {
    onAntiPatternsChange([...antiPatterns, { ...data, id: genId() }])
    setAddingAntiPattern(false)
  }, [antiPatterns, onAntiPatternsChange])

  const applyPattern = useCallback((pattern: LearnedPattern) => {
    onLearnedPatternsChange(learnedPatterns.map((p) =>
      p.id === pattern.id ? { ...p, status: 'applied' as const } : p,
    ))
    onApplyRule?.(pattern.text, 'always')
  }, [learnedPatterns, onLearnedPatternsChange, onApplyRule])

  const dismissPattern = useCallback((id: string) => {
    onLearnedPatternsChange(learnedPatterns.map((p) =>
      p.id === id ? { ...p, status: 'dismissed' as const } : p,
    ))
  }, [learnedPatterns, onLearnedPatternsChange])

  return (
    <div className="mt-6">
      {/* Section header */}
      <div className="mb-6">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          Referências de Ouro
        </h4>
        <p className="mt-1 text-xs text-on-surface-variant">
          Textos reais que ensinam a IA a escrever como você. Quanto mais exemplos, melhor o resultado.
        </p>
      </div>

      {/* Sub-section 1: Textos-âncora */}
      <section className="mb-8">
        <SectionLabel
          dotColor="bg-tertiary"
          label="Textos que definem meu tom"
          description="Posts, threads, trechos que representam exatamente o tom que você quer."
        />
        <div className="mt-3 space-y-2">
          {anchors.map((item) => (
            <ReferenceCard
              key={item.id}
              item={item}
              onRemove={() => removeAnchor(item.id)}
              onAnnotationChange={(annotation) => updateAnchor(item.id, { annotation })}
              onContentChange={(content) => updateAnchor(item.id, { content })}
            />
          ))}
          {addingAnchor ? (
            <AddReferenceForm
              onAdd={addAnchor}
              onCancel={() => setAddingAnchor(false)}
            />
          ) : (
            <AddButton
              label="Adicionar texto-âncora"
              hint="Cole texto, link do Notion, link do X, ou arraste arquivo"
              onClick={() => setAddingAnchor(true)}
            />
          )}
        </div>
      </section>

      {/* Sub-section 2: Anti-padrões */}
      <section className="mb-8">
        <SectionLabel
          dotColor="bg-error"
          label="O que nunca quero parecer"
          description="Exemplos do tom errado. A IA usa como contraste."
        />
        <div className="mt-3 space-y-2">
          {antiPatterns.map((item) => (
            <ReferenceCard
              key={item.id}
              item={item}
              isDanger
              onRemove={() => removeAntiPattern(item.id)}
              onAnnotationChange={(annotation) => updateAntiPattern(item.id, { annotation })}
              onContentChange={(content) => updateAntiPattern(item.id, { content })}
            />
          ))}
          {addingAntiPattern ? (
            <AddReferenceForm
              isDanger
              onAdd={addAntiPattern}
              onCancel={() => setAddingAntiPattern(false)}
            />
          ) : (
            <AddButton
              label="Adicionar anti-padrão"
              hint="Cole texto ou link de exemplo do que evitar"
              onClick={() => setAddingAntiPattern(true)}
            />
          )}
        </div>
      </section>

      {/* Sub-section 3: Aprendizados automáticos */}
      <section className="mb-4">
        <SectionLabel
          dotColor="bg-tertiary"
          label="Aprendizados do sistema"
          description="Padrões detectados nas suas edições. O sistema aprende com cada correção."
        />

        {suggestedPatterns.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-outline-variant/20 bg-surface-container p-6">
            <Brain size={20} className="text-on-surface-variant" />
            <p className="mt-2 text-center text-sm text-on-surface-variant">
              Nenhum aprendizado pendente
            </p>
            <p className="mt-1 max-w-xs text-center text-[10px] text-on-surface-variant/60">
              Quando você editar textos gerados pela IA, o sistema detecta padrões automaticamente.
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-1.5">
            {suggestedPatterns.map((p) => (
              <PatternRow
                key={p.id}
                pattern={p}
                onApply={() => applyPattern(p)}
                onDismiss={() => dismissPattern(p.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Bottom note */}
      <div className="mt-4 flex items-center gap-2">
        <Info size={12} className="shrink-0 text-on-surface-variant" />
        <p className="text-[10px] text-on-surface-variant">
          Referências alimentam o prompt da IA. Mais referências + anotações = conteúdo mais próximo da sua voz.
        </p>
      </div>
    </div>
  )
}
