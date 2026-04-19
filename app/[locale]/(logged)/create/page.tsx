'use client'

import { useState, useCallback } from 'react'
import {
  CreationHeader,
  CreationTabs,
  ContentInputCard,
  PlatformSelector,
  ToneSelector,
  AdvancedParameters,
  GenerateButton,
  FloatingAssistant,
} from '@modules/create-content/application/components'
import type { InputTab, Platform, Tone } from '@modules/create-content/application/types'

export default function CreateContentPage() {
  const [activeTab, setActiveTab] = useState<InputTab>('text')
  const [inputValue, setInputValue] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram'])
  const [tone, setTone] = useState<Tone>('editorial-authority')

  const handlePlatformToggle = useCallback((platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform],
    )
  }, [])

  return (
    <div className="flex-1 px-6 pb-24 pt-12 md:px-8">
      <div className="w-full max-w-6xl">
        <CreationHeader />

        <CreationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-12 gap-6">
          <ContentInputCard value={inputValue} onChange={setInputValue} />

          <div className="col-span-12 space-y-6 lg:col-span-4">
            <PlatformSelector
              selected={selectedPlatforms}
              onToggle={handlePlatformToggle}
            />
            <ToneSelector value={tone} onChange={setTone} />
            <AdvancedParameters />
          </div>
        </div>

        <GenerateButton />
      </div>

      <FloatingAssistant />
    </div>
  )
}
