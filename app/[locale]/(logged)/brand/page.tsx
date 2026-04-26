'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
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
  DEFAULT_LOGO,
} from '@modules/brand-dna/application/types'
import type {
  TonalitySlider,
  BrandColors,
  FontSelection,
  Persona,
  ImageStyle,
  WritingRules as WritingRulesType,
  ReferenceItem,
  LearnedPattern,
  Brand,
} from '@modules/brand-dna/application/types'
import {
  useBrandList,
  useBrand,
  useCreateBrand,
  useUpdateBrand,
} from '@modules/brand-dna/application/hooks/use-brand'

/* ── Helpers ─────────────────────────────────────────── */

function extractState(brand: Brand) {
  return {
    name: brand.name,
    sliders: brand.tonality ?? DEFAULT_TONALITY,
    colors: brand.visualIdentity?.colors ?? DEFAULT_COLORS,
    fonts: brand.visualIdentity?.fonts ?? DEFAULT_FONTS,
    persona: brand.persona ?? DEFAULT_PERSONA,
    audience: brand.audience ?? '',
    writingRules: brand.writingRules ?? DEFAULT_WRITING_RULES,
    imageStyle: (brand.visualIdentity?.defaultImageStyle ?? 'photographic') as ImageStyle,
    anchors: brand.references?.anchors ?? [],
    antiPatterns: brand.references?.antiPatterns ?? [],
    learnedPatterns: brand.references?.learnedPatterns ?? [],
  }
}

/* ── Page ─────────────────────────────────────────────── */

export default function BrandDnaPage() {
  /* ── Server state ──────────────────────────────────── */
  const { data: brandList, isLoading: isListLoading } = useBrandList()
  const activeBrandId = brandList?.items.find((b) => b.isActive)?.id ?? brandList?.items[0]?.id
  const { data: brand, isLoading: isBrandLoading } = useBrand(activeBrandId)
  const createMutation = useCreateBrand()
  const updateMutation = useUpdateBrand()

  const isNewBrand = brandList !== undefined && brandList.items.length === 0
  const isLoading = isListLoading || (!isNewBrand && isBrandLoading)
  const isSaving = createMutation.isPending || updateMutation.isPending

  /* ── Local (editable) state ────────────────────────── */
  const [name, setName] = useState('')
  const [sliders, setSliders] = useState<TonalitySlider[]>(DEFAULT_TONALITY)
  const [colors, setColors] = useState<BrandColors>(DEFAULT_COLORS)
  const [fonts, setFonts] = useState<FontSelection[]>(DEFAULT_FONTS)
  const [persona, setPersona] = useState<Persona>(DEFAULT_PERSONA)
  const [audience, setAudience] = useState('')
  const [writingRules, setWritingRules] = useState<WritingRulesType>(DEFAULT_WRITING_RULES)
  const [imageStyle, setImageStyle] = useState<ImageStyle>('photographic')
  const [anchors, setAnchors] = useState<ReferenceItem[]>([])
  const [antiPatterns, setAntiPatterns] = useState<ReferenceItem[]>([])
  const [learnedPatterns, setLearnedPatterns] = useState<LearnedPattern[]>([])

  /* ── Snapshot for dirty detection ──────────────────── */
  const snapshotRef = useRef('')

  function buildJson() {
    return JSON.stringify({
      name, sliders, colors, fonts, persona, audience, writingRules,
      imageStyle, anchors, antiPatterns, learnedPatterns,
    })
  }

  function takeSnapshot() {
    snapshotRef.current = buildJson()
  }

  const hasChanges = snapshotRef.current !== '' && snapshotRef.current !== buildJson()

  /* ── Hydrate local state from server ───────────────── */
  useEffect(() => {
    if (!brand) return
    const s = extractState(brand)
    setName(s.name)
    setSliders(s.sliders)
    setColors(s.colors)
    setFonts(s.fonts)
    setPersona(s.persona)
    setAudience(s.audience)
    setWritingRules(s.writingRules)
    setImageStyle(s.imageStyle)
    setAnchors(s.anchors)
    setAntiPatterns(s.antiPatterns)
    setLearnedPatterns(s.learnedPatterns)
  }, [brand])

  /* snapshot after hydration or when entering create mode */
  useEffect(() => {
    if (brand || isNewBrand) takeSnapshot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, isNewBrand])

  /* ── Build payload ─────────────────────────────────── */
  function buildPayload() {
    return {
      name,
      persona,
      audience,
      tonality: sliders,
      writingRules,
      references: { anchors, antiPatterns, learnedPatterns },
      visualIdentity: {
        logo: brand?.visualIdentity?.logo ?? DEFAULT_LOGO,
        colors,
        fonts,
        defaultImageStyle: imageStyle,
      },
    }
  }

  /* ── Handlers ──────────────────────────────────────── */
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

  const handleSave = useCallback(() => {
    if (!name.trim()) return

    if (brand) {
      updateMutation.mutate(
        {
          id: brand.id,
          data: {
            ...buildPayload(),
            productId: brand.productId,
            language: brand.language,
            secondaryLanguage: brand.secondaryLanguage,
          },
        },
        { onSuccess: () => takeSnapshot() },
      )
    } else {
      createMutation.mutate(buildPayload(), {
        onSuccess: () => takeSnapshot(),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, name, persona, audience, sliders, writingRules, anchors, antiPatterns, learnedPatterns, colors, fonts, imageStyle, updateMutation, createMutation])

  const handleDiscard = useCallback(() => {
    if (brand) {
      const s = extractState(brand)
      setName(s.name)
      setSliders(s.sliders)
      setColors(s.colors)
      setFonts(s.fonts)
      setPersona(s.persona)
      setAudience(s.audience)
      setWritingRules(s.writingRules)
      setImageStyle(s.imageStyle)
      setAnchors(s.anchors)
      setAntiPatterns(s.antiPatterns)
      setLearnedPatterns(s.learnedPatterns)
    } else {
      setName('')
      setSliders(DEFAULT_TONALITY)
      setColors(DEFAULT_COLORS)
      setFonts(DEFAULT_FONTS)
      setPersona(DEFAULT_PERSONA)
      setAudience('')
      setWritingRules(DEFAULT_WRITING_RULES)
      setImageStyle('photographic')
      setAnchors([])
      setAntiPatterns([])
      setLearnedPatterns([])
    }
    takeSnapshot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand])

  /* ── Loading state ─────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-12 no-scrollbar lg:p-12">
      <BrandPageHeader name={name} onNameChange={setName} />

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

            <ReferencePosts
              anchors={anchors}
              antiPatterns={antiPatterns}
              learnedPatterns={learnedPatterns}
              onAnchorsChange={setAnchors}
              onAntiPatternsChange={setAntiPatterns}
              onLearnedPatternsChange={setLearnedPatterns}
              onApplyRule={handleApplyRule}
            />
          </section>

          <TypographyPreview fonts={fonts} onFontChange={handleFontChange} />
        </div>
      </div>

      <SaveBar
        brandName={name || 'Brand DNA'}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  )
}
