export type InputTab = 'text' | 'audio' | 'url' | 'screenshot'

export type Platform = 'instagram' | 'threads' | 'x' | 'tiktok'

export type Tone =
  | 'editorial-authority'
  | 'hype'
  | 'minimalist'
  | 'technical'

export interface ToneOption {
  value: Tone
  label: string
}

export const TONE_OPTIONS: ToneOption[] = [
  { value: 'editorial-authority', label: 'Autoridade Editorial' },
  { value: 'hype', label: 'Hype / Alta Energia' },
  { value: 'minimalist', label: 'Minimalista / Estoico' },
  { value: 'technical', label: 'Tecnico / Deep Dive' },
]

export const MAX_TOKENS = 2500
