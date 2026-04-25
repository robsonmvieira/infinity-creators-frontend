import { container, TYPES } from '@modules/shared/infra'
import type { HttpClient } from '@modules/shared/infra'
import type {
  ExpandRequest,
  ExpandResponse,
  GenerateRequest,
  GenerateResponse,
  FinalizeRequest,
} from '../application/types'

function getHttpClient(): HttpClient {
  return container.get<HttpClient>(TYPES.HttpClient)
}

export async function expandContent(request: ExpandRequest): Promise<ExpandResponse> {
  const http = getHttpClient()
  return http.post<ExpandResponse>('content/expand', request)
}

export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
  const http = getHttpClient()
  return http.post<GenerateResponse>('content/generate', request)
}

export async function finalizeContent(request: FinalizeRequest): Promise<void> {
  const http = getHttpClient()
  await http.postNoContent('content/finalize', request)
}
