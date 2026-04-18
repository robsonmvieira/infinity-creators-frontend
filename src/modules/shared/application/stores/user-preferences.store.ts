import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferencesState {
  displayName: string | null
  density: 'comfortable' | 'standard' | 'compact'
  textScale: number
  reduceMotion: boolean | null
  nativeLanguage: string | null

  setDisplayName(name: string | null): void
  setDensity(d: 'comfortable' | 'standard' | 'compact'): void
  setTextScale(s: number): void
  setReduceMotion(r: boolean | null): void
  setNativeLanguage(lang: string | null): void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      displayName: null,
      density: 'standard',
      textScale: 1,
      reduceMotion: null,
      nativeLanguage: null,

      setDisplayName: (name) => set({ displayName: name }),
      setDensity: (d) => set({ density: d }),
      setTextScale: (s) => set({ textScale: Math.max(0.8, Math.min(1.3, s)) }),
      setReduceMotion: (r) => set({ reduceMotion: r }),
      setNativeLanguage: (lang) => set({ nativeLanguage: lang }),
    }),
    {
      name: 'user-preferences',
      partialize: (state) => ({
        displayName: state.displayName,
        density: state.density,
        textScale: state.textScale,
        reduceMotion: state.reduceMotion,
      }),
    },
  ),
)
