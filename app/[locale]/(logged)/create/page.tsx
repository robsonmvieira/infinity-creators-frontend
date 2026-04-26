'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  CreationHeader,
  CreationTabs,
  ContentInputCard,
  PlatformSelector,
  ToneSelector,
  ImageStyleSelector,
  GenerateButton,
  BrandSelector,
} from '@modules/create-content/application/components'
import {
  useExpandContent,
  useGenerateContent,
  useGeneratePoll,
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
import { useBrandList, useBrand } from '@modules/brand-dna/application/hooks/use-brand'
import { useRouter } from '@/src/i18n/navigation'

export default function CreateContentPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<InputTab>('text')
  const [inputValue, setInputValue] = useState('')
  const [expandedContent, setExpandedContent] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram'])
  const [tonePreset, setTonePreset] = useState<TonePreset>('dna-default')
  const [format, setFormat] = useState<ContentFormat>('auto')
  const [category, setCategory] = useState<ContentCategory>('builder-in-public')
  const [language, setLanguage] = useState<ContentLanguage>('pt-BR')
  const [imageStyle, setImageStyle] = useState<ImageStyle>('photographic')

  /* ── Brand context ──────────────────────────────── */
  const { data: brandList } = useBrandList()
  const defaultBrandId = brandList?.items.find((b) => b.isActive)?.id ?? brandList?.items[0]?.id
  const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>(undefined)
  const brandId = selectedBrandId ?? defaultBrandId
  const { data: activeBrand } = useBrand(brandId)

  const productId = activeBrand?.productId || activeBrand?.id || ''
  const productName = activeBrand?.name || 'Sua Marca'
  const hasBrandDna = !!activeBrand?.persona || !!activeBrand?.tonality
  const brandDnaVersion = activeBrand?.updatedAt || ''

  /* ── Mutations ──────────────────────────────────── */
  const expandMutation = useExpandContent()
  const generateMutation = useGenerateContent()

  /* ── Polling ────────────────────────────────────── */
  const [pollingRequestId, setPollingRequestId] = useState<string | null>(null)
  const { data: pollResult } = useGeneratePoll(pollingRequestId)

  const isPolling = !!pollingRequestId && pollResult?.status !== 'COMPLETED' && pollResult?.status !== 'FAILED'
  const isGenerating = generateMutation.isPending || isPolling

  useEffect(() => {
    if (!pollResult) return

    if (pollResult.status === 'COMPLETED') {
      setPollingRequestId(null)
      router.push(`/create/result?requestId=${pollResult.requestId}`)
    }

    if (pollResult.status === 'FAILED') {
      setPollingRequestId(null)
    }
  }, [pollResult, router])

  /* ── Validations ─────────────────────────────────── */

  const hasInput = inputValue.trim().length > 0
  const hasPlatforms = selectedPlatforms.length > 0
  const withinCharLimit = inputValue.length <= MAX_CHARS
  const canGenerate = hasInput && hasPlatforms && withinCharLimit && !isGenerating

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
      onSuccess: (data) => {
        setPollingRequestId(data.requestId)
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

  /* ── Polling status label ───────────────────────── */
  function getGeneratingLabel(): string {
    if (generateMutation.isPending) return 'Enviando...'
    if (pollResult?.status === 'PROCESSING') return 'Gerando conteúdo...'
    if (isPolling) return 'Aguardando...'
    return 'Gerar Conteúdo'
  }

  return (
    <div className="flex-1 px-6 pb-24 pt-12 md:px-8">
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CreationHeader />
          {brandList && brandList.items.length > 0 && (
            <BrandSelector
              brands={brandList.items}
              selectedId={brandId}
              onSelect={setSelectedBrandId}
            />
          )}
        </div>

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

        {pollResult?.status === 'FAILED' && (
          <div role="alert" className="mx-auto mt-6 max-w-lg rounded-lg bg-error/10 px-4 py-3 text-center text-sm text-error">
            {pollResult.errorMessage || 'Erro ao gerar conteúdo. Tente novamente.'}
          </div>
        )}

        <GenerateButton
          productName={productName}
          hasBrandDna={hasBrandDna}
          disabled={!canGenerate}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          label={getGeneratingLabel()}
        />
      </div>
    </div>
  )
}
