'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listBrands,
  getBrand,
  createBrand,
  updateBrand,
  patchBrand,
  deleteBrand,
  activateBrand,
  getBrandPrompt,
} from '../../infra/brand-service'
import type {
  CreateBrandRequest,
  UpdateBrandRequest,
  PatchBrandRequest,
} from '../types'

export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  list: (skip: number, limit: number) => [...brandKeys.lists(), { skip, limit }] as const,
  details: () => [...brandKeys.all, 'detail'] as const,
  detail: (id: string) => [...brandKeys.details(), id] as const,
  prompts: () => [...brandKeys.all, 'prompt'] as const,
  prompt: (id: string) => [...brandKeys.prompts(), id] as const,
} as const

export function useBrandList(skip = 0, limit = 20) {
  return useQuery({
    queryKey: brandKeys.list(skip, limit),
    queryFn: () => listBrands(skip, limit),
  })
}

export function useBrand(id: string | undefined) {
  return useQuery({
    queryKey: brandKeys.detail(id!),
    queryFn: () => getBrand(id!),
    enabled: !!id,
  })
}

export function useCreateBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateBrandRequest) => createBrand(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() })
    },
  })
}

export function useUpdateBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBrandRequest }) => updateBrand(id, data),
    onSuccess: (brand) => {
      queryClient.setQueryData(brandKeys.detail(brand.id), brand)
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() })
    },
  })
}

export function usePatchBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PatchBrandRequest }) => patchBrand(id, data),
    onSuccess: (brand) => {
      queryClient.setQueryData(brandKeys.detail(brand.id), brand)
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() })
    },
  })
}

export function useDeleteBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all })
    },
  })
}

export function useActivateBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => activateBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all })
    },
  })
}

export function useBrandPrompt(id: string | undefined) {
  return useQuery({
    queryKey: brandKeys.prompt(id!),
    queryFn: () => getBrandPrompt(id!),
    enabled: !!id,
  })
}
