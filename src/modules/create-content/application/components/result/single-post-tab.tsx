'use client'

import { Pencil, Check } from 'lucide-react'
import type {
  SinglePostResult,
  SinglePostCopyVariation,
  StyleOption,
  ImageOption,
  BackgroundOption,
  ColorOption,
} from '../../types'

/* ── Noise grain SVG ───────────────────────────────── */

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Post Preview ──────────────────────────────────── */

function PostPreview({
  copy,
  style,
  backgroundCss,
  textColor,
  brandFooter,
  editedTitle,
  editedSubtitle,
  onEditTitle,
  onEditSubtitle,
}: Readonly<{
  copy: SinglePostCopyVariation
  style: StyleOption
  backgroundCss: string
  textColor: string
  brandFooter: SinglePostResult['brandFooter']
  editedTitle?: string
  editedSubtitle?: string
  onEditTitle: (v: string) => void
  onEditSubtitle: (v: string) => void
}>) {
  const title = editedTitle ?? copy.title
  const subtitle = editedSubtitle ?? copy.subtitle ?? ''
  const isCodeHero = style.layout.type === 'code-hero'
  const isCenteredBlur = style.layout.type === 'centered-blur'
  const isBold = style.layout.type === 'full-text'

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
      {/* Background */}
      <div className="absolute inset-0" style={{ background: backgroundCss, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {/* Blur layer for code-hero / centered-blur */}
      {(isCodeHero || isCenteredBlur) && (
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{
        background: isCodeHero || isCenteredBlur
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: NOISE_SVG, backgroundSize: '128px 128px' }} />

      {/* Content — 3 zones: top label, center title, bottom footer */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-10 py-10 text-center">
        {/* TOP — Label */}
        <div className="pt-4">
          {copy.label && (
            <span className="text-[13px] font-medium tracking-[0.15em]" style={{ color: `${textColor}99` }}>
              {copy.label}
            </span>
          )}
        </div>

        {/* CENTER — Title group */}
        <div className="w-full">
          {/* Subtitle above (ex: "faltam apenas") */}
          {(subtitle || copy.subtitle) && (
            <div className="group relative mb-2">
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onEditSubtitle(e.currentTarget.textContent ?? '')}
                className="rounded-md border border-dashed border-transparent text-[15px] font-medium tracking-wide outline-none transition-colors hover:border-white/20 focus:border-primary"
                style={{ color: `${textColor}bb` }}
              >
                {subtitle}
              </div>
            </div>
          )}

          {/* Title — giant */}
          <div className="group relative">
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onEditTitle(e.currentTarget.textContent ?? '')}
              className="rounded-md border border-dashed border-transparent text-7xl font-black leading-[0.95] outline-none transition-colors hover:border-white/20 focus:border-primary"
              style={{ color: textColor }}
            >
              {title}
            </div>
            <Pencil size={12} className="absolute -right-6 top-2 text-white/0 group-hover:text-white/30" />
            {editedTitle && <span className="absolute -right-6 -top-2 text-[9px] text-amber-400">editado</span>}
          </div>
        </div>

        {/* BOTTOM — Footer text or brand */}
        <div className="pb-2">
          {copy.footerText ? (
            <p className="text-[14px] font-medium" style={{ color: `${textColor}88` }}>
              {copy.footerText}
            </p>
          ) : brandFooter ? (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-zinc-800 text-[12px] font-bold text-white">
                {brandFooter.displayName.charAt(0)}
              </div>
              <span className="text-[11px] font-semibold text-white/80">{brandFooter.handle}</span>
              <span className="text-[10px] text-white/20">|</span>
              <span className="text-[10px] text-white/35">{brandFooter.displayName}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* ── Option Card (reusable) ────────────────────────── */

function OptionCard({
  isSelected,
  onClick,
  children,
}: Readonly<{
  isSelected: boolean
  onClick: () => void
  children: React.ReactNode
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all ${
        isSelected
          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
          : 'ring-1 ring-outline-variant/15 hover:ring-outline-variant/30'
      }`}
    >
      {isSelected && (
        <div className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check size={12} className="text-white" />
        </div>
      )}
      {children}
    </button>
  )
}

/* ── SinglePostTab ─────────────────────────────────── */

interface SinglePostTabProps {
  result: SinglePostResult
  selectedStyleId: string
  onStyleChange: (id: string) => void
  selectedImageId: string
  onImageChange: (id: string) => void
  selectedColorId: string
  onColorChange: (id: string) => void
  selectedCopyId: string
  onCopyChange: (id: string) => void
  editedTitle: string | null
  editedSubtitle: string | null
  editedCaption: string | null
  onEditTitle: (v: string) => void
  onEditSubtitle: (v: string) => void
  onEditCaption: (v: string) => void
}

export function SinglePostTab({
  result,
  selectedStyleId,
  onStyleChange,
  selectedImageId,
  onImageChange,
  selectedColorId,
  onColorChange,
  selectedCopyId,
  onCopyChange,
  editedTitle,
  editedSubtitle,
  editedCaption,
  onEditTitle,
  onEditSubtitle,
  onEditCaption,
}: Readonly<SinglePostTabProps>) {
  const style = result.styles.find((s) => s.id === selectedStyleId) ?? result.styles[0]
  const copy = result.copyVariations.find((c) => c.id === selectedCopyId) ?? result.copyVariations[0]
  const color = result.colorOptions.find((c) => c.id === selectedColorId) ?? result.colorOptions[0]
  const caption = editedCaption ?? copy?.caption ?? ''
  const captionCharCount = caption.length

  // Resolve background
  let backgroundCss = '#000'
  const img = result.imageOptions.find((i) => i.id === selectedImageId)
  if (img?.url) {
    backgroundCss = `url(${img.url})`
  } else {
    const bg = result.backgroundOptions.find((b) => b.id === selectedImageId)
    if (bg) backgroundCss = bg.css
  }

  if (!style || !copy) return null

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT — Preview */}
      <div className="col-span-5">
        <div className="mx-auto max-w-[400px]">
          <PostPreview
            copy={copy}
            style={style}
            backgroundCss={backgroundCss}
            textColor={color.hex}
            brandFooter={result.brandFooter}
            editedTitle={editedTitle ?? undefined}
            editedSubtitle={editedSubtitle ?? undefined}
            onEditTitle={onEditTitle}
            onEditSubtitle={onEditSubtitle}
          />
          <p className="mt-2 text-center text-[10px] text-on-surface-variant">
            1080 × 1080px · 1:1
          </p>
        </div>
      </div>

      {/* RIGHT — Options */}
      <div className="col-span-7 space-y-5">
        {/* Styles */}
        {result.styles.length > 1 && (
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Estilo Visual
            </p>
            <div className="flex gap-2">
              {result.styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStyleChange(s.id)}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    selectedStyleId === s.id
                      ? 'border-2 border-primary bg-primary/5 text-on-surface'
                      : 'border border-outline-variant/15 bg-surface-container-low text-on-surface-variant hover:border-outline-variant/30'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Background / Images */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Fundo
          </p>
          <div className="grid grid-cols-4 gap-2">
            {result.imageOptions.map((opt) => (
              <OptionCard key={opt.id} isSelected={selectedImageId === opt.id} onClick={() => onImageChange(opt.id)}>
                <div className="aspect-square w-full" style={{ background: `url(${opt.url}) center/cover` }} />
                <div className="bg-surface-container-low px-1.5 py-1">
                  <p className={`text-center text-[9px] font-medium ${selectedImageId === opt.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>{opt.label}</p>
                </div>
              </OptionCard>
            ))}
            {result.backgroundOptions.map((opt) => (
              <OptionCard key={opt.id} isSelected={selectedImageId === opt.id} onClick={() => onImageChange(opt.id)}>
                <div className="aspect-square w-full" style={{ background: opt.css }} />
                <div className="bg-surface-container-low px-1.5 py-1">
                  <p className={`text-center text-[9px] font-medium ${selectedImageId === opt.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>{opt.label}</p>
                </div>
              </OptionCard>
            ))}
          </div>
        </div>

        {/* Color options */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Cor do Texto
          </p>
          <div className="flex gap-2">
            {result.colorOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onColorChange(c.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                  selectedColorId === c.id
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'ring-1 ring-outline-variant/15 hover:ring-outline-variant/30'
                }`}
              >
                <div className="h-4 w-4 rounded-full border border-outline-variant/20" style={{ backgroundColor: c.hex }} />
                <span className={`text-[10px] font-medium ${selectedColorId === c.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Copy variations */}
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
                <p className="mt-0.5 text-[10px] text-on-surface-variant">{c.description}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-on-surface-variant">
                  "{c.title}"
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="rounded-xl bg-surface-container p-4 ghost-border">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Caption
            {editedCaption && <span className="ml-2 text-[9px] normal-case tracking-normal text-amber-400">editado</span>}
          </p>
          <textarea
            value={caption}
            onChange={(e) => onEditCaption(e.target.value)}
            className="min-h-[100px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low p-3 text-sm leading-relaxed text-on-surface no-scrollbar focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className={`mt-1 text-right text-[10px] ${captionCharCount > 1760 ? (captionCharCount > 2200 ? 'text-error' : 'text-amber-400') : 'text-on-surface-variant'}`}>
            {captionCharCount} / 2200
          </p>
        </div>
      </div>
    </div>
  )
}
