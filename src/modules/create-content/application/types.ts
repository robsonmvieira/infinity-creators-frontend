/* ── Input ──────────────────────────────────────────── */

export type InputTab = 'text' | 'url' | 'audio'

export type Platform = 'instagram' | 'threads' | 'x' | 'tiktok'

export type ContentFormat =
  | 'auto'
  | 'carousel'
  | 'post'
  | 'thread'
  | 'reel'
  | 'story'

export type ContentCategory =
  | 'builder-in-public'
  | 'feature-launch'
  | 'tip'
  | 'milestone'
  | 'behind-the-scenes'
  | 'engagement'

export type ContentLanguage = 'pt-BR' | 'en' | 'both'

export const MAX_CHARS = 5000

/* ── Format Options ────────────────────────────────── */

export interface FormatOption {
  value: ContentFormat
  label: string
}

export const FORMAT_OPTIONS: FormatOption[] = [
  { value: 'auto', label: 'Auto-detectar' },
  { value: 'carousel', label: 'Carrossel' },
  { value: 'post', label: 'Post' },
  { value: 'thread', label: 'Thread' },
  { value: 'reel', label: 'Reel' },
  { value: 'story', label: 'Story' },
]

/* ── Category Options ──────────────────────────────── */

export interface CategoryOption {
  value: ContentCategory
  label: string
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'builder-in-public', label: 'Builder in Public' },
  { value: 'feature-launch', label: 'Feature Launch' },
  { value: 'tip', label: 'Dica' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'behind-the-scenes', label: 'Bastidores' },
  { value: 'engagement', label: 'Engajamento' },
]

/* ── Language Options ──────────────────────────────── */

export interface LanguageOption {
  value: ContentLanguage
  label: string
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'pt-BR', label: 'Português (BR)' },
  { value: 'en', label: 'English' },
  { value: 'both', label: 'Ambos' },
]

/* ── Tone Override ─────────────────────────────────── */

export type TonePreset =
  | 'dna-default'
  | 'more-formal'
  | 'more-casual'
  | 'concise'
  | 'narrative'

export interface ToneOverrideOption {
  value: TonePreset
  label: string
  description: string
  deltas: { formality: number; detail: number; professionalism: number }
}

export const TONE_OVERRIDE_OPTIONS: ToneOverrideOption[] = [
  {
    value: 'dna-default',
    label: 'DNA padrão',
    description: 'Usa o tom configurado em Marca & DNA',
    deltas: { formality: 0, detail: 0, professionalism: 0 },
  },
  {
    value: 'more-formal',
    label: 'Mais formal',
    description: 'Aumenta formalidade e detalhe',
    deltas: { formality: 20, detail: 10, professionalism: 0 },
  },
  {
    value: 'more-casual',
    label: 'Mais casual',
    description: 'Reduz formalidade',
    deltas: { formality: -20, detail: 0, professionalism: 0 },
  },
  {
    value: 'concise',
    label: 'Conciso',
    description: 'Menos detalhamento, mais direto',
    deltas: { formality: 0, detail: -30, professionalism: 0 },
  },
  {
    value: 'narrative',
    label: 'Narrativo',
    description: 'Mais detalhado e exploratório',
    deltas: { formality: 0, detail: 30, professionalism: 0 },
  },
]

/* ── Platform config (for format inference display) ── */

export const PLATFORM_FORMAT_INFERENCE: Record<Platform, ContentFormat> = {
  instagram: 'carousel',
  threads: 'post',
  x: 'thread',
  tiktok: 'reel',
}

/* ── API: /expand ──────────────────────────────────── */

export interface ExpandRequest {
  productId: string
  content: string
  mode: InputTab
  language: string
}

export interface ExpandResponse {
  expandedContent: string
  originalContent: string
  model: string
  tokensUsed: number
}

/* ── API: /generate ────────────────────────────────── */

export interface PlatformConfig {
  id: Platform
  enabled: boolean
  format: ContentFormat
  formatOverride: ContentFormat | null
}

export interface GenerateRequest {
  requestId: string
  productId: string
  brandDnaVersion: string
  input: {
    mode: InputTab
    content: string | null
    expandedContent: string | null
    sourceUrl: string | null
    audioTranscript: string | null
    audioMeta: {
      durationMs: number
      language: string
      fileKey: string
    } | null
  }
  platforms: PlatformConfig[]
  content: {
    category: ContentCategory | 'auto'
    language: string
    secondaryLanguage: string | null
  }
  tone: {
    source: 'brand-dna'
    override: {
      preset: string
      deltas: { formality: number; professionalism: number; detail: number }
    } | null
  }
  options: {
    variations: number
    includeCta: boolean
    extraHashtags: string[]
  }
}

/* ── API: /generate response ───────────────────────── */

export type FormatSource = 'auto' | 'user' | 'override'

export interface ReviewFlag {
  type: string
  rule?: string
  detail: string
  severity: 'warning' | 'error'
}

export interface ReviewResult {
  passed: boolean
  flags: ReviewFlag[]
}

export interface ImageOption {
  id: string
  label: string
  url: string
}

export interface BackgroundOption {
  id: string
  label: string
  css: string
}

export interface SlideCopyVariation {
  id: string
  name: string
  tag: string
  title: string
  text: string
}

export interface SlideData {
  slideNumber: number
  imageOptions: ImageOption[]
  backgroundOptions?: BackgroundOption[]
  copyVariations: SlideCopyVariation[]
}

export interface StyleLayout {
  type: 'overlay' | 'split' | 'full-text' | 'code-hero' | 'centered-blur'
  hasSlideNumber: boolean
}

export interface StyleOption {
  id: string
  name: string
  layout: StyleLayout
}

export interface PostCopyVariation {
  id: string
  name: string
  description: string
  text: string
  hashtags?: string[]
}

export interface BrandFooter {
  avatarUrl: string
  handle: string
  displayName: string
}

export interface SinglePostCopyVariation {
  id: string
  name: string
  description: string
  label?: string
  title: string
  subtitle?: string
  footerText?: string
  caption: string
  hashtags?: string[]
}

export interface ColorOption {
  id: string
  label: string
  hex: string
}

export interface SinglePostResult {
  platformId: 'instagram'
  format: 'post'
  formatSource: FormatSource
  styles: StyleOption[]
  imageOptions: ImageOption[]
  backgroundOptions: BackgroundOption[]
  colorOptions: ColorOption[]
  copyVariations: SinglePostCopyVariation[]
  brandFooter: BrandFooter | null
  review: ReviewResult
}

export interface CarouselResult {
  platformId: 'instagram'
  format: 'carousel'
  formatSource: FormatSource
  styles: StyleOption[]
  slides: SlideData[]
  caption: {
    copyVariations: PostCopyVariation[]
  }
  brandFooter: BrandFooter | null
  review: ReviewResult
}

export interface PostResult {
  platformId: 'threads'
  format: 'post'
  formatSource: FormatSource
  imageOptions: ImageOption[]
  copyVariations: PostCopyVariation[]
  brandFooter: BrandFooter | null
  review: ReviewResult
}

export interface ThreadResult {
  platformId: 'x'
  format: 'thread'
  formatSource: FormatSource
  tweets: {
    copyVariations: { id: string; name: string; tweets: string[] }[]
  }
  brandFooter: BrandFooter | null
  review: ReviewResult
}

export type PlatformResult = CarouselResult | SinglePostResult | PostResult | ThreadResult

export interface BrandDnaWarning {
  type: string
  usedVersion: string
  requestedVersion: string
  message: string
}

/* ── API: /generate accepted (202) ─────────────────── */

export type GenerateStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'

export interface GenerateAcceptedResponse {
  requestId: string
  status: 'PENDING'
}

/* ── API: /generate poll result ────────────────────── */

export interface GeneratePollResponse {
  requestId: string
  status: GenerateStatus
  results: PlatformResult[] | null
  meta: {
    totalTokens: number
    writeModel: string
    routeModel: string
    reviewModel: string
    latencyMs: number
    category: string
    categorySource: 'user' | 'auto'
  } | null
  brandDnaVersion: string | null
  brandDnaWarning: BrandDnaWarning | null
  errorMessage: string | null
}

export interface GenerateResponse {
  requestId: string
  status: 'completed' | 'error'
  brandDnaVersion: string
  brandDnaWarning: BrandDnaWarning | null
  results: PlatformResult[]
  meta: {
    totalTokens: number
    writeModel: string
    routeModel: string
    reviewModel: string
    latencyMs: number
    category: string
    categorySource: 'user' | 'auto'
  }
}

/* ── API: /content list ───────────────────────────── */

export interface ContentListItem {
  id: string
  requestId: string
  brandId: string | null
  status: GenerateStatus
  imageStyle: string
  contentMeta: {
    category: string
    language: string
  }
  platforms: Platform[]
  errorMessage: string | null
  createdAt: string
  updatedAt: string
}

export interface ContentListResponse {
  items: ContentListItem[]
  total: number
  skip: number
  limit: number
  hasMore: boolean
}

/* ── API: /finalize ────────────────────────────────── */

export interface SlideSelection {
  slideNumber: number
  imageId: string
  copyId: string
  editedTitle?: string
  editedText?: string
}

export interface PlatformSelection {
  platformId: Platform
  styleId: string | null
  slideSelections: SlideSelection[] | null
  captionCopyId: string | null
  editedCaption: string | null
  imageId: string | null
  copyId: string | null
  editedText: string | null
  tweetsCopyId: string | null
}

export type FinalizeAction = 'schedule' | 'publish-now' | 'save-draft'

export interface FinalizeRequest {
  requestId: string
  selections: PlatformSelection[]
  action: FinalizeAction
  scheduleAt: string | null
}
