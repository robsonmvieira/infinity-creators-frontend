'use client'

import { useEffect } from 'react'
import { useUserPreferencesStore } from '../stores/user-preferences.store'

export function UserPreferencesEffect() {
  const density = useUserPreferencesStore((s) => s.density)
  const textScale = useUserPreferencesStore((s) => s.textScale)
  const reduceMotion = useUserPreferencesStore((s) => s.reduceMotion)

  useEffect(() => {
    document.documentElement.setAttribute('data-density', density)
    document.documentElement.style.fontSize = `${textScale * 100}%`
  }, [density, textScale])

  useEffect(() => {
    if (reduceMotion !== null) {
      document.documentElement.setAttribute('data-reduce-motion', String(reduceMotion))
    } else {
      document.documentElement.removeAttribute('data-reduce-motion')
    }
  }, [reduceMotion])

  return null
}
