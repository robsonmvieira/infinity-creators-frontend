'use client'

import { useState, useCallback } from 'react'
import {
  BrandPageHeader,
  LogoUpload,
  ColorPalette,
  ImageStyleSelector,
  TypographyPreview,
  TonalitySliders,
  PersonaInput,
  AudienceTextarea,
  WritingRules,
  ReferencePosts,
  SaveBar,
} from '@modules/brand-dna/application/components'
import {
  DEFAULT_TONALITY,
  DEFAULT_COLORS,
  DEFAULT_FONTS,
  DEFAULT_PERSONA,
  DEFAULT_WRITING_RULES,
} from '@modules/brand-dna/application/types'
import type {
  TonalitySlider,
  BrandColors,
  FontSelection,
  Persona,
  ImageStyle,
  WritingRules as WritingRulesType,
} from '@modules/brand-dna/application/types'

export default function BrandDnaPage() {
  const [sliders, setSliders] = useState<TonalitySlider[]>(DEFAULT_TONALITY)
  const [colors, setColors] = useState<BrandColors>(DEFAULT_COLORS)
  const [fonts, setFonts] = useState<FontSelection[]>(DEFAULT_FONTS)
  const [persona, setPersona] = useState<Persona>(DEFAULT_PERSONA)
  const [audience, setAudience] = useState('')
  const [writingRules, setWritingRules] = useState<WritingRulesType>(DEFAULT_WRITING_RULES)
  const [imageStyle, setImageStyle] = useState<ImageStyle>('photographic')

  const handleSliderChange = useCallback((id: string, value: number) => {
    setSliders((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value } : s)),
    )
  }, [])

  const handleFontChange = useCallback(
    (role: 'headline' | 'body', fontName: string, source: 'google' | 'custom') => {
      setFonts((prev) =>
        prev.map((f) => (f.role === role ? { ...f, fontName, source } : f)),
      )
    },
    [],
  )

  const handleApplyRule = useCallback(
    (rule: string, target: 'always' | 'never') => {
      setWritingRules((prev) => ({
        ...prev,
        [target === 'always' ? 'alwaysUse' : 'neverUse']: [
          ...prev[target === 'always' ? 'alwaysUse' : 'neverUse'],
          rule,
        ],
      }))
    },
    [],
  )

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-12 no-scrollbar lg:p-12">
      <BrandPageHeader />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left Column: Visual DNA — fixed width */}
        <div className="w-full space-y-8 lg:w-80 lg:shrink-0">
          <LogoUpload />
          <ColorPalette colors={colors} onColorsChange={setColors} />
          <ImageStyleSelector value={imageStyle} onChange={setImageStyle} />
        </div>

        {/* Right Column: Voice DNA + Typography — fills remaining space */}
        <div className="min-w-0 flex-1 space-y-5">
          <section className="rounded-xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">
                Voz DNA & Tonalidade
              </h3>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-tertiary shadow-[0_0_8px_#ffb148]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Motor IA Ativo
                </span>
              </div>
            </div>

            <TonalitySliders
              sliders={sliders}
              onSliderChange={handleSliderChange}
            />

            <PersonaInput value={persona} onChange={setPersona} />

            <AudienceTextarea value={audience} onChange={setAudience} />

            <WritingRules
              alwaysUse={writingRules.alwaysUse}
              neverUse={writingRules.neverUse}
              onAlwaysUseChange={(rules) => setWritingRules((prev) => ({ ...prev, alwaysUse: rules }))}
              onNeverUseChange={(rules) => setWritingRules((prev) => ({ ...prev, neverUse: rules }))}
            />

            <ReferencePosts onApplyRule={handleApplyRule} />
          </section>

          <TypographyPreview fonts={fonts} onFontChange={handleFontChange} />
        </div>
      </div>

      <SaveBar />
    </div>
  )
}
