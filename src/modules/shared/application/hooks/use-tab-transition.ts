'use client'

import { useRef, useCallback, useLayoutEffect } from 'react'
import gsap from 'gsap'

export function useTabTransition<T extends string>(activeTab: T) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prevTab = useRef<T>(activeTab)

  useLayoutEffect(() => {
    if (!containerRef.current || prevTab.current === activeTab) return

    const el = containerRef.current

    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    )

    prevTab.current = activeTab
  }, [activeTab])

  return containerRef
}
