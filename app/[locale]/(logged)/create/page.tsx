'use client'

import { useState, useCallback } from 'react'
import {
  CreationHeader,
  CreationTabs,
  ContentInputCard,
  PlatformSelector,
  ToneSelector,
  ImageStyleSelector,
  GenerateButton,
} from '@modules/create-content/application/components'
import {
  useExpandContent,
  useGenerateContent,
} from '@modules/create-content/application/hooks/use-content-generation'
import { buildGeneratePayload } from '@modules/create-content/application/helpers/build-generate-payload'
import { MAX_CHARS } from '@modules/create-content/application/types'
import type {
  InputTab,
  Platform,
  TonePreset,
  ContentFormat,
  ContentCategory,
  ContentLanguage,
} from '@modules/create-content/application/types'
import type { ImageStyle } from '@modules/brand-dna/application/types'

export default function CreateContentPage() {
  const [activeTab, setActiveTab] = useState<InputTab>('text')
  const [inputValue, setInputValue] = useState('')
  const [expandedContent, setExpandedContent] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram'])
  const [tonePreset, setTonePreset] = useState<TonePreset>('dna-default')
  const [format, setFormat] = useState<ContentFormat>('auto')
  const [category, setCategory] = useState<ContentCategory>('builder-in-public')
  const [language, setLanguage] = useState<ContentLanguage>('pt-BR')
  const [imageStyle, setImageStyle] = useState<ImageStyle>('photographic')

  // TODO: replace with real product context from store/API
  const productId = 'drillingo'
  const productName = 'Drillingo'
  const hasBrandDna = true
  const brandDnaVersion = '2026-04-21T14:30:00Z'

  const expandMutation = useExpandContent()
  const generateMutation = useGenerateContent()

  /* ── Validations ─────────────────────────────────── */

  const hasInput = inputValue.trim().length > 0
  const hasPlatforms = selectedPlatforms.length > 0
  const withinCharLimit = inputValue.length <= MAX_CHARS
  const canGenerate = hasInput && hasPlatforms && withinCharLimit && !generateMutation.isPending

  /* ── Handlers ────────────────────────────────────── */

  const handlePlatformToggle = useCallback((platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform],
    )
  }, [])

  const handleExpand = useCallback(() => {
    if (!inputValue.trim()) return

    expandMutation.mutate(
      {
        productId,
        content: inputValue,
        mode: activeTab,
        language: language === 'both' ? 'pt-BR' : language,
      },
      {
        onSuccess: (data) => {
          setExpandedContent(data.expandedContent)
          setInputValue(data.expandedContent)
        },
      },
    )
  }, [inputValue, activeTab, language, productId, expandMutation])

  const handleGenerate = useCallback(() => {
    if (!canGenerate) return

    const payload = buildGeneratePayload({
      productId,
      brandDnaVersion,
      activeTab,
      inputValue,
      expandedContent,
      selectedPlatforms,
      format,
      category,
      language,
      tonePreset,
    })

    generateMutation.mutate(payload, {
      onSuccess: (_data) => {
        // TODO: navigate to results page or show results view
      },
    })
  }, [
    canGenerate,
    productId,
    brandDnaVersion,
    activeTab,
    inputValue,
    expandedContent,
    selectedPlatforms,
    format,
    category,
    language,
    tonePreset,
    generateMutation,
  ])

  return (
    <div className="flex-1 px-6 pb-24 pt-12 md:px-8">
      <div className="w-full max-w-6xl">
        <CreationHeader />

        <CreationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-12 gap-6">
          <ContentInputCard
            activeTab={activeTab}
            value={inputValue}
            onChange={setInputValue}
            format={format}
            onFormatChange={setFormat}
            category={category}
            onCategoryChange={setCategory}
            language={language}
            onLanguageChange={setLanguage}
            selectedPlatforms={selectedPlatforms}
            onExpand={handleExpand}
            isExpanding={expandMutation.isPending}
          />

          <div className="col-span-12 space-y-6 lg:col-span-4">
            <PlatformSelector
              selected={selectedPlatforms}
              onToggle={handlePlatformToggle}
            />
            <ToneSelector
              value={tonePreset}
              onChange={setTonePreset}
              productName={productName}
            />
            {(format === 'auto' || ['carousel', 'reel', 'story'].includes(format)) && (
              <ImageStyleSelector value={imageStyle} onChange={setImageStyle} />
            )}
          </div>
        </div>

        <GenerateButton
          productName={productName}
          hasBrandDna={hasBrandDna}
          disabled={!canGenerate}
          isGenerating={generateMutation.isPending}
          onGenerate={handleGenerate}
        />
      </div>
    </div>
  )
}
