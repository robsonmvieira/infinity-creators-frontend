'use client'

import { Paperclip, Sparkles, Link as LinkIcon, Mic, ChevronDown, Loader2 } from 'lucide-react'
import {
  MAX_CHARS,
  FORMAT_OPTIONS,
  CATEGORY_OPTIONS,
  LANGUAGE_OPTIONS,
  PLATFORM_FORMAT_INFERENCE,
} from '../types'
import type {
  InputTab,
  Platform,
  ContentFormat,
  ContentCategory,
  ContentLanguage,
} from '../types'

interface ContentInputCardProps {
  activeTab: InputTab
  value: string
  onChange: (value: string) => void
  format: ContentFormat
  onFormatChange: (format: ContentFormat) => void
  category: ContentCategory
  onCategoryChange: (category: ContentCategory) => void
  language: ContentLanguage
  onLanguageChange: (language: ContentLanguage) => void
  selectedPlatforms: Platform[]
  onExpand: () => void
  isExpanding: boolean
}

function SmallSelect<T extends string>({
  id,
  value,
  onChange,
  options,
}: Readonly<{
  id: string
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
}>) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-10 cursor-pointer appearance-none rounded-lg border border-outline-variant/15 bg-surface-container-low pl-4 pr-10 text-xs font-medium text-on-surface focus:ring-1 focus:ring-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
    </div>
  )
}

export function ContentInputCard({
  activeTab,
  value,
  onChange,
  format,
  onFormatChange,
  category,
  onCategoryChange,
  language,
  onLanguageChange,
  selectedPlatforms,
  onExpand,
  isExpanding,
}: Readonly<ContentInputCardProps>) {
  const charCount = value.length
  const charPercent = (charCount / MAX_CHARS) * 100

  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="flex min-h-[400px] flex-col rounded-xl bg-surface-container p-8 ghost-border">
        <label htmlFor="content-input" className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          Contexto & Detalhes
        </label>

        {/* Tab-specific input */}
        {activeTab === 'text' && (
          <textarea
            id="content-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={MAX_CHARS}
            className="flex-1 resize-none border-none bg-transparent text-xl font-medium leading-relaxed text-on-surface placeholder:text-surface-bright focus:ring-0 focus:outline-none"
            placeholder="O que vamos criar hoje? Cole um changelog, compartilhe uma ideia crua, ou descreva o que aconteceu..."
          />
        )}

        {activeTab === 'url' && (
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-center gap-3 rounded-lg bg-surface-container-low p-4">
              <LinkIcon size={18} className="shrink-0 text-on-surface-variant" />
              <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Cole uma URL: GitHub release, blog post, changelog, RSS feed..."
                className="flex-1 border-none bg-transparent text-sm font-medium text-on-surface outline-none placeholder:text-surface-bright"
              />
            </div>
            <p className="text-xs text-on-surface-variant">
              GitHub, blog posts, RSS feeds, ou qualquer URL pública
            </p>
          </div>
        )}

        {activeTab === 'audio' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <button
              type="button"
              className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-primary text-on-surface transition-transform hover:scale-105 active:scale-95"
              aria-label="Gravar áudio"
            >
              <Mic size={28} />
            </button>
            <p className="text-sm font-medium text-on-surface-variant">
              Clique para gravar sua ideia
            </p>
          </div>
        )}

        {/* Bottom bar: actions + counter */}
        <div className="mt-8 flex items-center justify-between border-t border-outline-variant/15 pt-8">
          <div className="flex gap-4">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary"
            >
              <Paperclip size={14} />
              <span>ANEXAR ARQUIVOS</span>
            </button>
            <button
              type="button"
              onClick={onExpand}
              disabled={isExpanding || !value.trim()}
              className="flex cursor-pointer items-center gap-2 text-xs font-bold text-on-surface-variant transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isExpanding ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              <span>{isExpanding ? 'EXPANDINDO...' : 'EXPANDIR IDEIA'}</span>
            </button>
          </div>
          {activeTab === 'text' && (
            <span className={`font-mono text-xs uppercase ${charPercent >= 90 ? 'text-amber-500' : 'text-on-surface-variant'}`}>
              {charCount} / {MAX_CHARS} caracteres
            </span>
          )}
        </div>

        {/* Format selectors row */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-outline-variant/15 pt-6">
          <SmallSelect id="format-select" value={format} onChange={onFormatChange} options={FORMAT_OPTIONS} />
          <SmallSelect id="category-select" value={category} onChange={onCategoryChange} options={CATEGORY_OPTIONS} />
          <SmallSelect id="language-select" value={language} onChange={onLanguageChange} options={LANGUAGE_OPTIONS} />
        </div>

        {/* Format inference per platform */}
        {format === 'auto' && selectedPlatforms.length > 0 && (
          <p className="mt-3 text-[10px] text-on-surface-variant">
            {selectedPlatforms
              .map((p) => {
                const label = p.charAt(0).toUpperCase() + p.slice(1)
                const fmt = PLATFORM_FORMAT_INFERENCE[p]
                const fmtLabel = FORMAT_OPTIONS.find((f) => f.value === fmt)?.label ?? fmt
                return `${label} → ${fmtLabel}`
              })
              .join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
}
