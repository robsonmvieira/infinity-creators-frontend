'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Upload, Search, Type } from 'lucide-react'
import { GOOGLE_FONTS_POPULAR } from '../types'
import type { FontSelection } from '../types'

interface TypographyPreviewProps {
  fonts: FontSelection[]
  onFontChange: (role: 'headline' | 'body', fontName: string, source: 'google' | 'custom') => void
}

function FontDropdown({
  font,
  onSelect,
}: Readonly<{
  font: FontSelection
  onSelect: (fontName: string, source: 'google' | 'custom') => void
}>) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const filtered = GOOGLE_FONTS_POPULAR.filter((f) =>
    f.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-lg bg-surface-bright px-3 py-1.5 text-xs font-medium text-on-surface-variant transition-colors hover:text-on-surface"
      >
        <span>{font.fontName}</span>
        {font.source === 'custom' && (
          <span className="rounded bg-tertiary/10 px-1 py-0.5 text-[8px] font-bold uppercase text-tertiary">
            Custom
          </span>
        )}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-lg border border-outline-variant/10 bg-surface-container p-3 shadow-2xl shadow-black/30">
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2">
            <Search size={12} className="text-on-surface-variant" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fonts..."
              className="flex-1 border-none bg-transparent text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="no-scrollbar mb-2 max-h-36 space-y-0.5 overflow-y-auto">
            {filtered.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  onSelect(name, 'google')
                  setIsOpen(false)
                  setSearch('')
                }}
                className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                  font.fontName === name && font.source === 'google'
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-on-surface hover:bg-surface-bright'
                }`}
              >
                {name}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-xs text-on-surface-variant">
                No fonts found for &quot;{search}&quot;
              </p>
            )}
          </div>

          <div className="border-t border-outline-variant/10 pt-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-outline-variant/20 px-3 py-2 text-xs text-on-surface-variant transition-colors hover:border-primary/50 hover:text-on-surface">
              <Upload size={12} />
              <span>Upload font (.ttf, .otf, .woff2)</span>
              <input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const name = file.name.replace(/\.(ttf|otf|woff2?)$/i, '')
                    onSelect(name, 'custom')
                    setIsOpen(false)
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export function TypographyPreview({ fonts, onFontChange }: Readonly<TypographyPreviewProps>) {
  const [previewText, setPreviewText] = useState(
    'Type something to preview your brand typography...',
  )

  const headlineFont = fonts.find((f) => f.role === 'headline')
  const bodyFont = fonts.find((f) => f.role === 'body')

  return (
    <section className="rounded-xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
          Typography
        </h3>
        <div className="flex items-center gap-3">
          {headlineFont && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Headline
              </span>
              <FontDropdown
                font={headlineFont}
                onSelect={(name, source) => onFontChange('headline', name, source)}
              />
            </div>
          )}
          {bodyFont && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Body
              </span>
              <FontDropdown
                font={bodyFont}
                onSelect={(name, source) => onFontChange('body', name, source)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Preview input */}
      <div className="mb-6 flex items-center gap-3 rounded-lg bg-surface-container-low px-4 py-3">
        <Type size={16} className="shrink-0 text-on-surface-variant" />
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Type to preview..."
          className="flex-1 border-none bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Live preview */}
      <div className="space-y-4 rounded-lg bg-surface-container-low p-6">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Headline &middot; {headlineFont?.fontName ?? 'Inter'} Black
          </p>
          <p className="text-3xl font-black leading-tight tracking-tight text-on-surface">
            {previewText || 'Type something to preview...'}
          </p>
        </div>

        <div className="border-t border-outline-variant/10 pt-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Body &middot; {bodyFont?.fontName ?? 'Inter'} Regular
          </p>
          <p className="text-base font-normal leading-relaxed text-on-surface">
            {previewText || 'Type something to preview...'}
          </p>
        </div>
      </div>
    </section>
  )
}
