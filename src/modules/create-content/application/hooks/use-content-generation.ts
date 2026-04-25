'use client'

import { useMutation } from '@tanstack/react-query'
import { expandContent, generateContent, finalizeContent } from '../../infra/content-service'
import type { ExpandRequest, GenerateRequest, FinalizeRequest } from '../types'

export function useExpandContent() {
  return useMutation({
    mutationFn: (request: ExpandRequest) => expandContent(request),
  })
}

export function useGenerateContent() {
  return useMutation({
    mutationFn: (request: GenerateRequest) => generateContent(request),
  })
}

export function useFinalizeContent() {
  return useMutation({
    mutationFn: (request: FinalizeRequest) => finalizeContent(request),
  })
}
