/* ── Persona ───────────────────────────────────────── */

export interface Persona {
  name: string
  displayName: string
  handle: string
  avatarUrl: string
  bio: string
  styleReferences: string[]
}

/* ── Tonality ──────────────────────────────────────── */

export interface TonalitySlider {
  id: string
  labelLeft: string
  labelRight: string
  value: number
}

/* ── Writing Rules ─────────────────────────────────── */

export interface WritingRules {
  alwaysUse: string[]
  neverUse: string[]
}

/* ── References ────────────────────────────────────── */

export type SourceType = 'notion' | 'x' | 'manual' | 'url'
export type PatternStatus = 'suggested' | 'applied' | 'dismissed'

export interface ReferenceItem {
  id: string
  title: string
  content: string
  sourceType: SourceType
  sourceUrl?: string
  annotation: string
  tags: { label: string; variant: 'primary' | 'neutral' | 'danger' }[]
}

export interface LearnedPattern {
  id: string
  text: string
  edits: number
  status: PatternStatus
  appliedRuleId: string | null
}

/* ── Visual Identity ───────────────────────────────── */

export interface BrandLogo {
  url: string
  variants: {
    dark?: string
    light?: string
  }
}

export interface BrandColors {
  brand: string
  background: string
  text: string
}

export type BrandColorRole = keyof BrandColors

/* ── Image Style ───────────────────────────────────── */

export type ImageStyle = 'photographic' | 'illustration' | '3d-isometric'

export interface ImageStyleOption {
  value: ImageStyle
  label: string
  description: string
}

export const IMAGE_STYLE_OPTIONS: ImageStyleOption[] = [
  { value: 'photographic', label: 'Fotográfico', description: 'Fotos reais de workspace, pessoas, café' },
  { value: 'illustration', label: 'Ilustração', description: 'Ilustrações flat/vetoriais de cenários' },
  { value: '3d-isometric', label: '3D Isométrico', description: 'Cenas 3D isométricas de tech' },
]

export interface FontSelection {
  role: 'headline' | 'body'
  fontName: string
  source: 'google' | 'custom'
}

export interface PalettePreset {
  id: string
  name: string
  colors: string[]
}

/* ── Defaults ──────────────────────────────────────── */

/* ── Visual Identity ─────────────────────────────── */

export interface VisualIdentity {
  logo: BrandLogo
  colors: BrandColors
  fonts: FontSelection[]
  defaultImageStyle: ImageStyle
}

/* ── References (aggregate) ──────────────────────── */

export interface References {
  anchors: ReferenceItem[]
  antiPatterns: ReferenceItem[]
  learnedPatterns: LearnedPattern[]
}

/* ── Brand (API entity) ──────────────────────────── */

export interface Brand {
  id: string
  name: string
  productId: string
  language: string
  secondaryLanguage: string | null
  persona: Persona | null
  audience: string | null
  tonality: TonalitySlider[] | null
  writingRules: WritingRules | null
  references: References | null
  visualIdentity: VisualIdentity | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface BrandListItem {
  id: string
  name: string
  language: string
  isActive: boolean
  createdAt: string
}

export interface BrandListResponse {
  items: BrandListItem[]
  total: number
  skip: number
  limit: number
  hasMore: boolean
}

export interface BrandPromptResponse {
  prompt: string
}

/* ── Request types ───────────────────────────────── */

export interface CreateBrandRequest {
  name: string
  productId?: string
  language?: string
  secondaryLanguage?: string | null
  persona?: Persona
  audience?: string
  tonality?: TonalitySlider[]
  writingRules?: WritingRules
  references?: References
  visualIdentity?: Partial<VisualIdentity>
}

export type UpdateBrandRequest = CreateBrandRequest

export type PatchBrandRequest = Partial<CreateBrandRequest>

/* ── Defaults ──────────────────────────────────────── */

export const DEFAULT_PERSONA: Persona = {
  name: 'O Arquiteto Visionário',
  displayName: '',
  handle: '',
  avatarUrl: '',
  bio: '',
  styleReferences: [],
}

export const DEFAULT_WRITING_RULES: WritingRules = {
  alwaysUse: ['Verbos ativos', 'Metáforas cinéticas', 'Ritmo editorial'],
  neverUse: ['Jargões', 'Emojis em títulos', 'Voz passiva'],
}

export const DEFAULT_COLORS: BrandColors = {
  brand: '#a3a6ff',
  background: '#1a1a1d',
  text: '#f9f5f8',
}

export const DEFAULT_FONTS: FontSelection[] = [
  { role: 'headline', fontName: 'Inter', source: 'google' },
  { role: 'body', fontName: 'Inter', source: 'google' },
]

export const DEFAULT_TONALITY: TonalitySlider[] = [
  { id: 'formality', labelLeft: 'Formal', labelRight: 'Casual', value: 65 },
  { id: 'professionalism', labelLeft: 'Profissional', labelRight: 'Espirituoso', value: 30 },
  { id: 'detail', labelLeft: 'Minimalista', labelRight: 'Detalhado', value: 80 },
]

export const DEFAULT_LOGO: BrandLogo = {
  url: '',
  variants: {},
}

export const GOOGLE_FONTS_POPULAR = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
  'Source Sans 3', 'Raleway', 'Nunito', 'Playfair Display', 'Merriweather',
  'DM Sans', 'Space Grotesk', 'Manrope', 'Outfit', 'Sora',
  'Libre Baskerville', 'Crimson Text', 'Work Sans', 'Barlow',
  'Fira Sans', 'Rubik', 'Karla', 'Josefin Sans', 'Bitter',
  'Mulish', 'Quicksand', 'Lexend', 'Cabin', 'Archivo',
] as const

export const PALETTE_PRESETS: PalettePreset[] = [
  { id: 'p01', name: 'Sunset Editorial', colors: ['#4a1942', '#c9b458', '#d4a843', '#e07b39', '#e84d6e'] },
  { id: 'p02', name: 'Ocean Depth', colors: ['#3d4a4f', '#2a7c8a', '#45a5a5', '#6cc4b0', '#c5e55a'] },
  { id: 'p03', name: 'Fresh Mint', colors: ['#c5e55a', '#a8d86b', '#5cc99c', '#4aa5a0', '#3d5a6e'] },
  { id: 'p04', name: 'Autumn Bold', colors: ['#e85535', '#c9b458', '#d4d480', '#7db57c', '#8c2e2e'] },
  { id: 'p05', name: 'Earthy Muted', colors: ['#8fb5ab', '#6b7c58', '#b5aa8c', '#d4cbb0', '#a0b0a5'] },
  { id: 'p06', name: 'Teal Rose', colors: ['#45a5a5', '#6fb89f', '#b5aa8c', '#e8a0b5', '#e84d8c'] },
  { id: 'p07', name: 'Pastel Dream', colors: ['#c5e5d0', '#b0d8c8', '#cbc8be', '#d5d060', '#e84d8c'] },
  { id: 'p08', name: 'Neon Contrast', colors: ['#2a2d3a', '#e84d8c', '#6b7c58', '#4a4a5a', '#8c8c9a'] },
  { id: 'p09', name: 'Storm Cloud', colors: ['#9a9aa5', '#e84d8c', '#5a5a6a', '#3d3d4a', '#707580'] },
  { id: 'p10', name: 'Sky Blue', colors: ['#b5b5be', '#c8c8d0', '#65b5e5', '#80cdf0', '#a5ddf8'] },
  { id: 'p11', name: 'Warm Harvest', colors: ['#3a2535', '#e8754a', '#f0a050', '#e5e080', '#3fa5a0'] },
  { id: 'p12', name: 'Classic Mono', colors: ['#e5ebbc', '#d0d8a8', '#b5c090', '#8a9a70', '#5a6a50'] },
  { id: 'p13', name: 'Cyber Punk', colors: ['#a3a6ff', '#ff67ad', '#ffb148', '#6063ee', '#e0458e'] },
  { id: 'p14', name: 'Forest Night', colors: ['#1a2e1a', '#2d5a3a', '#4a8c5a', '#7cb87c', '#b5e0a5'] },
  { id: 'p15', name: 'Coral Reef', colors: ['#ff6b6b', '#ffa07a', '#ffd93d', '#6bcb77', '#4d96ff'] },
  { id: 'p16', name: 'Midnight Jazz', colors: ['#0d1b2a', '#1b2838', '#354f6a', '#548ca8', '#8ec5e8'] },
  { id: 'p17', name: 'Berry Bliss', colors: ['#5c0a3b', '#8a1253', '#c23a7a', '#e87aaa', '#f5b8d0'] },
  { id: 'p18', name: 'Sand Dune', colors: ['#d4a574', '#c49060', '#a87040', '#8c5830', '#6a4020'] },
  { id: 'p19', name: 'Lavender Haze', colors: ['#e6e0f3', '#c4b5e0', '#9b8ec4', '#7a6aaf', '#5a4a8a'] },
  { id: 'p20', name: 'Electric Citrus', colors: ['#f7ff00', '#ff6b35', '#f72585', '#7209b7', '#3a0ca3'] },
  { id: 'p21', name: 'Nordic Frost', colors: ['#d8e2dc', '#a8c5b8', '#8ab0a0', '#5a8a7a', '#2d5a4a'] },
  { id: 'p22', name: 'Golden Hour', colors: ['#ffecd2', '#fcb69f', '#ff8a65', '#e65100', '#bf360c'] },
  { id: 'p23', name: 'Tokyo Neon', colors: ['#0a0a1a', '#ff006e', '#8338ec', '#3a86ff', '#00f5d4'] },
  { id: 'p24', name: 'Sage Garden', colors: ['#f0ead6', '#ddd5b8', '#aab89c', '#7a9c78', '#4a6e4a'] },
  { id: 'p25', name: 'Candy Pop', colors: ['#ff70a6', '#ff9770', '#ffd670', '#e9ff70', '#70d6ff'] },
  { id: 'p26', name: 'Deep Ocean', colors: ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#48cae4'] },
  { id: 'p27', name: 'Terracotta', colors: ['#8c4a2f', '#c2703e', '#d9a066', '#e8c99b', '#f5e6d0'] },
  { id: 'p28', name: 'Aurora', colors: ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'] },
  { id: 'p29', name: 'Rose Gold', colors: ['#f9e4d4', '#e8b4a2', '#d4917a', '#b76e5c', '#8c4a3a'] },
  { id: 'p30', name: 'Vintage Paper', colors: ['#f5f0e8', '#e8dcc8', '#c4a882', '#9c7c5c', '#6b5340'] },
  { id: 'p31', name: 'Ice Cream', colors: ['#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#cdb4db'] },
  { id: 'p32', name: 'Jungle Luxe', colors: ['#1b4332', '#2d6a4f', '#40916c', '#52b788', '#95d5b2'] },
  { id: 'p33', name: 'Plum Velvet', colors: ['#2d0040', '#4a0066', '#7b2d8e', '#b55baa', '#e8a0cc'] },
  { id: 'p34', name: 'Monochrome', colors: ['#1a1a1a', '#404040', '#737373', '#a6a6a6', '#d9d9d9'] },
  { id: 'p35', name: 'Sunset Beach', colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'] },
  { id: 'p36', name: 'Retro Wave', colors: ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429'] },
]
