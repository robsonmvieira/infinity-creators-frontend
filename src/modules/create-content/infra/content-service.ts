import { container, TYPES } from '@modules/shared/infra'
import type { HttpClient } from '@modules/shared/infra'
import type {
  ExpandRequest,
  ExpandResponse,
  GenerateRequest,
  GenerateAcceptedResponse,
  GeneratePollResponse,
  FinalizeRequest,
  ContentListResponse,
} from '../application/types'
import { contentListApiSchema } from './content-schemas'

function getHttpClient(): HttpClient {
  return container.get<HttpClient>(TYPES.HttpClient)
}

export async function expandContent(request: ExpandRequest): Promise<ExpandResponse> {
  const http = getHttpClient()
  return http.post<ExpandResponse>('content/expand', request)
}

export async function generateContent(request: GenerateRequest): Promise<GenerateAcceptedResponse> {
  const http = getHttpClient()
  return http.post<GenerateAcceptedResponse>('content/generate', request)
}

export async function pollGenerateResult(requestId: string): Promise<GeneratePollResponse> {
  const http = getHttpClient()
  return http.get<GeneratePollResponse>(`content/generate/${requestId}`)
}

export async function finalizeContent(request: FinalizeRequest): Promise<void> {
  const http = getHttpClient()
  await http.postNoContent('content/finalize', request)
}

export async function deleteContent(requestId: string): Promise<void> {
  const http = getHttpClient()
  await http.deleteNoContent(`content/generate/${requestId}`)
}

export async function listContents(
  params: { brandId?: string; skip?: number; limit?: number } = {},
): Promise<ContentListResponse> {
  const http = getHttpClient()
  const searchParams: Record<string, string> = {
    skip: String(params.skip ?? 0),
    limit: String(params.limit ?? 20),
  }
  if (params.brandId) searchParams.brandId = params.brandId

  const raw = await http.get('content', { searchParams })
  const parsed = contentListApiSchema.parse(raw)
  return {
    items: parsed.items,
    total: parsed.total,
    skip: parsed.skip,
    limit: parsed.limit,
    hasMore: parsed.has_more,
  }
}
