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
  { value: 'editorial-authority', label: 'Editorial Authority' },
  { value: 'hype', label: 'Hype / High Energy' },
  { value: 'minimalist', label: 'Minimalist / Stoic' },
  { value: 'technical', label: 'Technical / Deep Dive' },
]

export const MAX_TOKENS = 2500
