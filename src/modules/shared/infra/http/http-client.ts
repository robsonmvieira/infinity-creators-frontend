import ky from 'ky'

export interface HttpClient {
  get<T>(url: string, options?: { searchParams?: Record<string, string> }): Promise<T>
  post<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T>
  postNoContent(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<void>
  put<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T>
  patch<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T>
  delete<T>(url: string, options?: { searchParams?: Record<string, string> }): Promise<T>
  deleteNoContent(url: string, options?: { searchParams?: Record<string, string> }): Promise<void>
  upload<T>(url: string, formData: FormData, options?: { searchParams?: Record<string, string> }): Promise<T>
  uploadNoContent(url: string, formData: FormData, options?: { searchParams?: Record<string, string> }): Promise<void>
}

const STATE_CHANGING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

function getCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = /(?:^|;\s*)csrf_token=([^;]*)/.exec(document.cookie)
  return match?.[1]
}

export class KyHttpClient implements HttpClient {
  private readonly api = ky.create({
    prefix: '/api/',
    timeout: 30_000,
    retry: { limit: 2, methods: ['get', 'put', 'head', 'delete', 'options'] },
    hooks: {
      beforeRequest: [
        ({ request }) => {
          if (STATE_CHANGING_METHODS.has(request.method)) {
            const token = getCsrfToken()
            if (token) request.headers.set('x-csrf-token', token)
          }
        },
      ],
    },
  })

  async get<T>(url: string, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.get(url, { searchParams: options?.searchParams }).json<T>()
  }

  async post<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.post(url, { json: body, searchParams: options?.searchParams }).json<T>()
  }

  async postNoContent(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<void> {
    await this.api.post(url, { json: body, searchParams: options?.searchParams })
  }

  async put<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.put(url, { json: body, searchParams: options?.searchParams }).json<T>()
  }

  async patch<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.patch(url, { json: body, searchParams: options?.searchParams }).json<T>()
  }

  async delete<T>(url: string, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.delete(url, { searchParams: options?.searchParams }).json<T>()
  }

  async deleteNoContent(url: string, options?: { searchParams?: Record<string, string> }): Promise<void> {
    await this.api.delete(url, { searchParams: options?.searchParams })
  }

  async upload<T>(url: string, formData: FormData, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.post(url, { body: formData, searchParams: options?.searchParams }).json<T>()
  }

  async uploadNoContent(url: string, formData: FormData, options?: { searchParams?: Record<string, string> }): Promise<void> {
    await this.api.post(url, { body: formData, searchParams: options?.searchParams })
  }
}
