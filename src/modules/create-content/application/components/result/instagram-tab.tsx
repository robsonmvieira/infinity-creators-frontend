'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Pencil, Check } from 'lucide-react'
import type {
  CarouselResult,
  SlideData,
  SlideCopyVariation,
  StyleOption,
  SlideSelection,
} from '../../types'

/* ── Noise grain SVG ───────────────────────────────── */

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/* ── Slide Preview ─────────────────────────────────── */

function SlidePreview({
  slide,
  copy,
  style,
  selectedImageId,
  brandFooter,
  slideNumber,
  totalSlides,
  editedTitle,
  editedText,
  onEditTitle,
  onEditText,
}: Readonly<{
  slide: SlideData
  copy: SlideCopyVariation
  style: StyleOption
  selectedImageId: string
  brandFooter: CarouselResult['brandFooter']
  slideNumber: number
  totalSlides: number
  editedTitle?: string
  editedText?: string
  onEditTitle: (value: string) => void
  onEditText: (value: string) => void
}>) {
  const title = editedTitle ?? copy.title
  const text = editedText ?? copy.text
  const isOverlay = style.layout.type === 'overlay'
  const isSplit = style.layout.type === 'split'
  const isBold = style.layout.type === 'full-text'

  // Resolve background
  const img = slide.imageOptions.find((i) => i.id === selectedImageId)
  const bgOpt = slide.backgroundOptions?.find((b) => b.id === selectedImageId)
  const bgStyle: React.CSSProperties = img?.url
    ? { backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: bgOpt?.css ?? '#000' }

  return (
    <div className="relative aspect-[1080/1350] overflow-hidden rounded-lg" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
      {/* Background */}
      <div className="absolute inset-0" style={bgStyle} />

      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: NOISE_SVG, backgroundSize: '128px 128px' }} />

      {/* Overlay gradient */}
      {(isOverlay || isSplit) && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.75) 72%, rgba(0,0,0,0.92) 100%)' }} />
      )}

      {/* Slide counter */}
      {style.layout.hasSlideNumber && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-white/[0.08] px-2.5 py-1 font-mono text-[10px] font-medium text-white/40 backdrop-blur-sm">
          {slideNumber} / {totalSlides}
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex h-full flex-col ${isBold ? 'items-center justify-center px-8' : ''}`}>
        {isBold ? (
          <div className="text-center">
            <div className="group relative">
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onEditTitle(e.currentTarget.textContent ?? '')}
                className="rounded-md border border-dashed border-transparent text-[28px] font-extrabold leading-tight text-white outline-none transition-colors hover:border-white/20 focus:border-primary"
              >
                {title}
              </div>
              <Pencil size={10} className="absolute -right-5 top-1 text-white/0 group-hover:text-white/30" />
            </div>
            {brandFooter && (
              <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.08] pt-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-zinc-800 text-[12px] font-bold text-white">
                  {brandFooter.displayName.charAt(0)}
                </div>
                <span className="text-[11px] font-semibold text-white/80">{brandFooter.handle}</span>
                <span className="text-[10px] text-white/20">|</span>
                <span className="text-[10px] text-white/35">{brandFooter.displayName}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex-1" />
            <div className="px-7 pb-7">
              {/* Tag */}
              {copy.tag && (
                <span className="mb-3 inline-block rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm">
                  {copy.tag}
                </span>
              )}

              {/* Title — editable */}
              <div className="group relative">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onEditTitle(e.currentTarget.textContent ?? '')}
                  className="mb-3.5 rounded-md border border-dashed border-transparent text-[26px] font-extrabold leading-[1.22] text-white outline-none transition-colors hover:border-white/20 focus:border-primary"
                >
                  {title}
                </div>
                <Pencil size={10} className="absolute -right-5 top-1 text-white/0 group-hover:text-white/30" />
                {editedTitle && <span className="absolute -right-5 -top-3 text-[9px] text-amber-400">editado</span>}
              </div>

              {/* Text — editable */}
              <div className="group relative">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onEditText(e.currentTarget.textContent ?? '')}
                  className="rounded-md border border-dashed border-transparent text-[14.5px] leading-[1.6] text-white/[0.72] outline-none transition-colors hover:border-white/20 focus:border-primary"
                >
                  {text}
                </div>
                <Pencil size={10} className="absolute -right-5 top-1 text-white/0 group-hover:text-white/30" />
              </div>

              {/* Brand footer */}
              {brandFooter && (
                <div className="mt-[18px] flex items-center gap-2 border-t border-white/[0.08] pt-[14px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-zinc-800 text-[12px] font-bold text-white">
                    {brandFooter.displayName.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-px">
                    <span className="text-[11px] font-semibold text-white/80">{brandFooter.handle}</span>
                    <span className="text-[10px] text-white/40">{brandFooter.displayName}</span>
                  </div>
                  {style.layout.hasSlideNumber && (
                    <span className="ml-auto rounded-full bg-white/[0.08] px-2.5 py-1 text-[10px] font-medium text-white/40">
                      {slideNumber} / {totalSlides}
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Image Option Card ─────────────────────────────── */

function ImageOptionCard({
  option,
  isSelected,
  onClick,
}: Readonly<{
  option: { id: string; label: string; url?: string; css?: string }
  isSelected: boolean
  onClick: () => void
}>) {
  const bg = option.url ? `url(${option.url})` : option.css ?? '#333'

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
      <div
        className="aspect-[4/5] w-full"
        style={{ background: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      {isSelected && (
        <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check size={12} className="text-white" />
        </div>
      )}
      <div className="bg-surface-container-low px-2 py-1.5">
        <p className={`text-center text-[10px] font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          {option.label}
        </p>
      </div>
    </button>
  )
}

/* ── Copy Option Card ──────────────────────────────── */

function CopyOptionCard({
  copy,
  isSelected,
  onClick,
}: Readonly<{
  copy: SlideCopyVariation
  isSelected: boolean
  onClick: () => void
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-3 text-left transition-all ${
        isSelected
          ? 'border-2 border-primary bg-primary/5'
          : 'border border-outline-variant/15 bg-surface-container-low hover:border-outline-variant/30'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          {copy.name}
        </span>
        {isSelected && <Check size={14} className="text-primary" />}
      </div>
      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
        {copy.title}
      </p>
    </button>
  )
}

/* ── Instagram Tab ─────────────────────────────────── */

interface InstagramTabProps {
  result: CarouselResult
  slideSelections: Map<number, { imageId: string; copyId: string; editedTitle?: string; editedText?: string }>
  onSlideSelection: (slideNumber: number, patch: { imageId?: string; copyId?: string; editedTitle?: string; editedText?: string }) => void
}

export function InstagramTab({
  result,
  slideSelections,
  onSlideSelection,
}: Readonly<InstagramTabProps>) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const slides = result.slides
  const total = slides.length
  const safeIndex = Math.min(currentSlideIndex, total - 1)
  const slide = slides[safeIndex]
  const style = result.styles[0] // TODO: style selection global

  if (!slide) return null

  const sel = slideSelections.get(slide.slideNumber) ?? {
    imageId: slide.imageOptions[0]?.id ?? '',
    copyId: slide.copyVariations[0]?.id ?? '',
  }

  const activeCopy = slide.copyVariations.find((c) => c.id === sel.copyId) ?? slide.copyVariations[0]

  // All image/bg options for this slide
  const allImageOptions: { id: string; label: string; url?: string; css?: string }[] = [
    ...slide.imageOptions.map((o) => ({ ...o, css: undefined })),
    ...(slide.backgroundOptions ?? []).map((o) => ({ ...o, url: undefined })),
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT — Preview (contido para caber na viewport) */}
      <div className="col-span-5">
        <div className="mx-auto max-w-[340px]">
        <SlidePreview
          slide={slide}
          copy={activeCopy}
          style={style}
          selectedImageId={sel.imageId}
          brandFooter={result.brandFooter}
          slideNumber={safeIndex + 1}
          totalSlides={total}
          editedTitle={sel.editedTitle}
          editedText={sel.editedText}
          onEditTitle={(v) => onSlideSelection(slide.slideNumber, { editedTitle: v })}
          onEditText={(v) => onSlideSelection(slide.slideNumber, { editedText: v })}
        />

        {/* Navigation */}
        {total > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => setCurrentSlideIndex(Math.max(0, safeIndex - 1))}
              disabled={safeIndex === 0}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-outline-variant/12 text-white transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-[0.15]"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-[5px]">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`h-[7px] cursor-pointer rounded-full transition-all duration-300 ${
                    i === safeIndex ? 'w-5 bg-white' : 'w-[7px] bg-white/[0.15]'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentSlideIndex(Math.min(total - 1, safeIndex + 1))}
              disabled={safeIndex === total - 1}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-outline-variant/12 text-white transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-[0.15]"
              aria-label="Próximo slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <p className="mt-2 text-center text-[10px] text-on-surface-variant">
          Slide {safeIndex + 1} de {total} · 1080 × 1350px
        </p>
        </div>
      </div>

      {/* RIGHT — Options for this slide */}
      <div className="col-span-7 space-y-5">
        {/* Slide label */}
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-on-surface">
            Slide {safeIndex + 1}
            {activeCopy.tag && <span className="ml-2 text-xs font-normal text-on-surface-variant">— {activeCopy.tag}</span>}
          </h4>
          <span className="rounded-md border border-outline-variant/15 px-2 py-0.5 text-[10px] text-on-surface-variant">
            {total} slides
          </span>
        </div>

        {/* Image options */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Foto / Fundo
          </p>
          <div className="grid grid-cols-3 gap-2">
            {allImageOptions.map((opt) => (
              <ImageOptionCard
                key={opt.id}
                option={opt}
                isSelected={sel.imageId === opt.id}
                onClick={() => onSlideSelection(slide.slideNumber, { imageId: opt.id })}
              />
            ))}
          </div>
        </div>

        {/* Copy options */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Variação de Texto
          </p>
          <div className="grid grid-cols-1 gap-2">
            {slide.copyVariations.map((copy) => (
              <CopyOptionCard
                key={copy.id}
                copy={copy}
                isSelected={sel.copyId === copy.id}
                onClick={() => onSlideSelection(slide.slideNumber, { copyId: copy.id })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
