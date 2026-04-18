import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'
const MAX_RESPONSE_SIZE = 10 * 1024 * 1024 // 10MB

const SAFE_PATH_REGEX = /^[a-zA-Z0-9\-_/]+$/

function sanitizePath(path: string): string | null {
  if (path.includes('..') || path.includes('//')) return null
  if (!SAFE_PATH_REGEX.test(path)) return null
  return path
}

function validateCsrf(request: NextRequest): boolean {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) return true

  const headerToken = request.headers.get('x-csrf-token')
  const cookieToken = request.cookies.get('csrf_token')?.value

  if (!headerToken || !cookieToken) return false
  return headerToken === cookieToken
}

let refreshPromise: Promise<boolean> | null = null

async function tryRefreshToken(
  cookieStore: NextRequest['cookies'],
): Promise<boolean> {
  const refreshToken = cookieStore.get('refresh_token')?.value
  if (!refreshToken) return false

  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    return response.ok
  } catch {
    return false
  }
}

async function tryRefreshTokenWithLock(
  cookieStore: NextRequest['cookies'],
): Promise<boolean> {
  if (refreshPromise !== null) return refreshPromise

  refreshPromise = tryRefreshToken(cookieStore).finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await params
  const apiPath = path.join('/')

  const sanitized = sanitizePath(apiPath)
  if (!sanitized) {
    return NextResponse.json(
      { error: 'Invalid path' },
      { status: 400 },
    )
  }

  if (!validateCsrf(request)) {
    return NextResponse.json(
      { error: 'CSRF validation failed' },
      { status: 403 },
    )
  }

  const url = new URL(sanitized, BACKEND_URL)
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  const headers = new Headers()
  const accessToken = request.cookies.get('access_token')?.value
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }
  headers.set('Content-Type', request.headers.get('Content-Type') || 'application/json')
  headers.set('Accept', request.headers.get('Accept') || 'application/json')

  const isBodyMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)
  const body = isBodyMethod ? await request.text() : undefined

  let response = await fetch(url.toString(), {
    method: request.method,
    headers,
    body: body || undefined,
  })

  // Token refresh on 401
  if (response.status === 401 && accessToken) {
    const refreshed = await tryRefreshTokenWithLock(request.cookies)
    if (refreshed) {
      const newAccessToken = request.cookies.get('access_token')?.value
      if (newAccessToken) {
        headers.set('Authorization', `Bearer ${newAccessToken}`)
      }
      response = await fetch(url.toString(), {
        method: request.method,
        headers,
        body: body || undefined,
      })
    }
  }

  // SSE passthrough
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('text/event-stream')) {
    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  }

  // Response size check
  const contentLength = response.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
    return NextResponse.json(
      { error: 'Response too large' },
      { status: 502 },
    )
  }

  const responseBody = await response.text()

  return new NextResponse(responseBody, {
    status: response.status,
    headers: {
      'Content-Type': contentType || 'application/json',
    },
  })
}

export const GET = proxyRequest
export const POST = proxyRequest
export const PUT = proxyRequest
export const PATCH = proxyRequest
export const DELETE = proxyRequest
