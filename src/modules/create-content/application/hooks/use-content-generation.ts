'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  expandContent,
  generateContent,
  pollGenerateResult,
  finalizeContent,
  deleteContent,
  listContents,
} from '../../infra/content-service'
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

export function useGeneratePoll(requestId: string | null) {
  return useQuery({
    queryKey: ['content', 'generate', 'poll', requestId],
    queryFn: () => pollGenerateResult(requestId!),
    enabled: !!requestId,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (status === 'COMPLETED' || status === 'FAILED') return false
      return 3000
    },
  })
}

export function useFinalizeContent() {
  return useMutation({
    mutationFn: (request: FinalizeRequest) => finalizeContent(request),
  })
}

export const contentKeys = {
  all: ['contents'] as const,
  lists: () => [...contentKeys.all, 'list'] as const,
  list: (params: { brandId?: string; skip?: number; limit?: number }) =>
    [...contentKeys.lists(), params] as const,
} as const

export function useContentList(params: { brandId?: string; skip?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: contentKeys.list(params),
    queryFn: () => listContents(params),
  })
}

export function useDeleteContent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestId: string) => deleteContent(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.lists() })
    },
  })
}
