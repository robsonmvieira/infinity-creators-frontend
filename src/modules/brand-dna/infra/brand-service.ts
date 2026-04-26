import { container, TYPES } from '@modules/shared/infra'
import type { HttpClient } from '@modules/shared/infra'
import type {
  Brand,
  BrandListItem,
  BrandListResponse,
  BrandPromptResponse,
  CreateBrandRequest,
  UpdateBrandRequest,
  PatchBrandRequest,
} from '../application/types'
import {
  brandApiSchema,
  brandListApiSchema,
  brandPromptApiSchema,
  type BrandApiResponse,
} from './brand-schemas'

function getHttpClient(): HttpClient {
  return container.get<HttpClient>(TYPES.HttpClient)
}

/* ── Mapper (snake_case API → camelCase entity) ────── */

function toBrand(raw: BrandApiResponse): Brand {
  return {
    id: raw.id,
    name: raw.name,
    productId: raw.product_id,
    language: raw.language,
    secondaryLanguage: raw.secondary_language,
    persona: raw.persona,
    audience: raw.audience,
    tonality: raw.tonality,
    writingRules: raw.writing_rules,
    references: raw.references,
    visualIdentity: raw.visual_identity,
    isActive: raw.is_active,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  }
}

function toBrandListItem(raw: { id: string; name: string; language: string; is_active: boolean; created_at: string }): BrandListItem {
  return {
    id: raw.id,
    name: raw.name,
    language: raw.language,
    isActive: raw.is_active,
    createdAt: raw.created_at,
  }
}

/* ── API calls ────────────────────────────────────── */

export async function createBrand(request: CreateBrandRequest): Promise<Brand> {
  const http = getHttpClient()
  const raw = await http.post('brands', request)
  return toBrand(brandApiSchema.parse(raw))
}

export async function listBrands(skip = 0, limit = 20): Promise<BrandListResponse> {
  const http = getHttpClient()
  const raw = await http.get('brands', { searchParams: { skip: String(skip), limit: String(limit) } })
  const parsed = brandListApiSchema.parse(raw)
  return {
    items: parsed.items.map(toBrandListItem),
    total: parsed.total,
    skip: parsed.skip,
    limit: parsed.limit,
    hasMore: parsed.has_more,
  }
}

export async function getBrand(id: string): Promise<Brand> {
  const http = getHttpClient()
  const raw = await http.get(`brands/${id}`)
  return toBrand(brandApiSchema.parse(raw))
}

export async function updateBrand(id: string, request: UpdateBrandRequest): Promise<Brand> {
  const http = getHttpClient()
  const raw = await http.put(`brands/${id}`, request)
  return toBrand(brandApiSchema.parse(raw))
}

export async function patchBrand(id: string, request: PatchBrandRequest): Promise<Brand> {
  const http = getHttpClient()
  const raw = await http.patch(`brands/${id}`, request)
  return toBrand(brandApiSchema.parse(raw))
}

export async function deleteBrand(id: string): Promise<void> {
  const http = getHttpClient()
  await http.deleteNoContent(`brands/${id}`)
}

export async function activateBrand(id: string): Promise<Brand> {
  const http = getHttpClient()
  const raw = await http.put(`brands/${id}/activate`)
  return toBrand(brandApiSchema.parse(raw))
}

export async function getBrandPrompt(id: string): Promise<BrandPromptResponse> {
  const http = getHttpClient()
  const raw = await http.get(`brands/${id}/prompt`)
  return brandPromptApiSchema.parse(raw)
}
