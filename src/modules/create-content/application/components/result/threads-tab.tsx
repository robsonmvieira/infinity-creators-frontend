'use client'

import { Heart, MessageCircle, Repeat2, Share, Check } from 'lucide-react'
import type { PostResult, ImageOption } from '../../types'

interface ThreadsTabProps {
  result: PostResult
  selectedCopyId: string
  onCopyChange: (id: string) => void
  selectedImageId: string | null
  onImageChange: (id: string) => void
  editedText: string | null
  onTextEdit: (text: string) => void
}

export function ThreadsTab({
  result,
  selectedCopyId,
  onCopyChange,
  selectedImageId,
  onImageChange,
  editedText,
  onTextEdit,
}: Readonly<ThreadsTabProps>) {
  const copy = result.copyVariations.find((c) => c.id === selectedCopyId) ?? result.copyVariations[0]
  const text = editedText ?? copy?.text ?? ''
  const charCount = text.length
  const brandFooter = result.brandFooter
  const selectedImg = result.imageOptions.find((i) => i.id === selectedImageId)

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT — Mock Threads post */}
      <div className="col-span-5 rounded-xl border border-outline-variant/10 bg-surface-container p-5 ghost-border">
        {/* Author row */}
        {brandFooter && (
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-sm font-bold text-white">
              {brandFooter.displayName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">{brandFooter.displayName}</p>
              <p className="text-xs text-on-surface-variant">{brandFooter.handle}</p>
            </div>
            <span className="ml-auto text-xs text-on-surface-variant">agora</span>
          </div>
        )}

        {/* Editable text (always first — Threads pattern) */}
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextEdit(e.currentTarget.textContent ?? '')}
          className="min-h-[80px] whitespace-pre-line border border-dashed border-transparent text-sm leading-relaxed text-on-surface outline-none transition-colors hover:border-outline-variant/20 focus:border-primary"
        >
          {text}
        </div>

        {/* Post image (optional, below text) */}
        {selectedImg && (
          <div
            className="mt-4 aspect-square w-full overflow-hidden rounded-lg bg-surface-container-low"
            style={{ background: `url(${selectedImg.url}) center/cover` }}
          />
        )}

        {/* Mock engagement */}
        <div className="mt-4 flex gap-6 border-t border-outline-variant/10 pt-3">
          <span className="flex items-center gap-1 text-xs text-on-surface-variant"><Heart size={14} /> —</span>
          <span className="flex items-center gap-1 text-xs text-on-surface-variant"><MessageCircle size={14} /> —</span>
          <span className="flex items-center gap-1 text-xs text-on-surface-variant"><Repeat2 size={14} /> —</span>
          <span className="flex items-center gap-1 text-xs text-on-surface-variant"><Share size={14} /></span>
        </div>

        <p className="mt-2 text-right text-[10px] text-on-surface-variant">
          <span className={charCount > 400 ? 'text-amber-400' : ''}>{charCount}</span> / 500
        </p>
      </div>

      {/* RIGHT — Options */}
      <div className="col-span-7 space-y-5">
        {/* Image options */}
        {result.imageOptions.length > 0 && (
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Foto do Post
            </p>
            <div className="grid grid-cols-3 gap-2">
              {/* Option: no image */}
              <button
                type="button"
                onClick={() => onImageChange('')}
                className={`cursor-pointer overflow-hidden rounded-xl transition-all ${
                  !selectedImageId || selectedImageId === ''
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'ring-1 ring-outline-variant/15 hover:ring-outline-variant/30'
                }`}
              >
                <div className="flex aspect-square w-full items-center justify-center bg-surface-container-low">
                  <span className="text-xs text-on-surface-variant">Sem foto</span>
                </div>
                {(!selectedImageId || selectedImageId === '') && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <div className="bg-surface-container-low px-2 py-1.5">
                  <p className={`text-center text-[10px] font-medium ${!selectedImageId || selectedImageId === '' ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                    Só texto
                  </p>
                </div>
              </button>

              {result.imageOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onImageChange(opt.id)}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all ${
                    selectedImageId === opt.id
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'ring-1 ring-outline-variant/15 hover:ring-outline-variant/30'
                  }`}
                >
                  <div
                    className="aspect-square w-full"
                    style={{ background: `url(${opt.url}) center/cover` }}
                  />
                  {selectedImageId === opt.id && (
                    <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                  <div className="bg-surface-container-low px-2 py-1.5">
                    <p className={`text-center text-[10px] font-medium ${selectedImageId === opt.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {opt.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Copy options */}
        {result.copyVariations.length > 1 && (
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Variação de Texto
            </p>
            <div className="grid grid-cols-1 gap-2">
              {result.copyVariations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCopyChange(c.id)}
                  className={`cursor-pointer rounded-xl p-3 text-left transition-all ${
                    selectedCopyId === c.id
                      ? 'border-2 border-primary bg-primary/5'
                      : 'border border-outline-variant/15 bg-surface-container-low hover:border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${selectedCopyId === c.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {c.name}
                    </span>
                    {selectedCopyId === c.id && <Check size={14} className="text-primary" />}
                  </div>
                  <p className="mt-1 text-[10px] text-on-surface-variant">{c.description}</p>
                  <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
                    "{c.text.split('\n')[0]}"
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
