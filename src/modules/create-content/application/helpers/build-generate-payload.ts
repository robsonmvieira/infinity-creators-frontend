import { TONE_OVERRIDE_OPTIONS } from '../types'
import type {
  InputTab,
  Platform,
  ContentFormat,
  ContentCategory,
  ContentLanguage,
  TonePreset,
  GenerateRequest,
  PlatformConfig,
} from '../types'

const ALL_PLATFORMS: Platform[] = ['instagram', 'threads', 'x', 'tiktok']

interface BuildPayloadParams {
  productId: string
  brandDnaVersion: string
  activeTab: InputTab
  inputValue: string
  expandedContent: string | null
  selectedPlatforms: Platform[]
  format: ContentFormat
  category: ContentCategory
  language: ContentLanguage
  tonePreset: TonePreset
}

export function buildGeneratePayload(params: BuildPayloadParams): GenerateRequest {
  const {
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
  } = params

  const toneOption = TONE_OVERRIDE_OPTIONS.find((o) => o.value === tonePreset)
  const hasOverride = tonePreset !== 'dna-default' && toneOption

  const platforms: PlatformConfig[] = ALL_PLATFORMS.map((id) => ({
    id,
    enabled: selectedPlatforms.includes(id),
    format,
    formatOverride: null,
  }))

  const secondaryLanguage = language === 'both' ? 'en' : null
  const primaryLanguage = language === 'both' ? 'pt-BR' : language

  return {
    requestId: crypto.randomUUID(),
    productId,
    brandDnaVersion,
    input: {
      mode: activeTab,
      content: activeTab === 'text' ? inputValue : null,
      expandedContent: activeTab === 'text' ? expandedContent : null,
      sourceUrl: activeTab === 'url' ? inputValue : null,
      audioTranscript: activeTab === 'audio' ? inputValue : null,
      audioMeta: null,
    },
    platforms,
    content: {
      category,
      language: primaryLanguage,
      secondaryLanguage,
    },
    tone: {
      source: 'brand-dna',
      override: hasOverride
        ? { preset: toneOption.value, deltas: toneOption.deltas }
        : null,
    },
    options: {
      variations: 1,
      includeCta: false,
      extraHashtags: [],
    },
  }
}
