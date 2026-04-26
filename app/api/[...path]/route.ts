import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
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

/* ── Refresh token logic ──────────────────────────────── */

interface RefreshResult {
  accessToken: string
  refreshToken: string
}

let refreshPromise: Promise<RefreshResult | null> | null = null

async function tryRefreshToken(currentRefreshToken: string): Promise<RefreshResult | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: currentRefreshToken }),
    })

    if (!response.ok) return null

    const data = await response.json()
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    }
  } catch {
    return null
  }
}

function tryRefreshWithLock(currentRefreshToken: string): Promise<RefreshResult | null> {
  if (refreshPromise !== null) return refreshPromise

  refreshPromise = tryRefreshToken(currentRefreshToken).finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

function setTokenCookies(response: NextResponse, tokens: RefreshResult) {
  response.cookies.set('access_token', tokens.accessToken, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 30,
  })
  response.cookies.set('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

/* ── Proxy ────────────────────────────────────────────── */

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await params
  const apiPath = path.join('/')

  const sanitized = sanitizePath(apiPath)
  if (!sanitized) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  if (!validateCsrf(request)) {
    return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 })
  }

  const url = new URL(sanitized, BACKEND_URL)
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  function buildHeaders(token?: string) {
    const headers = new Headers()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    headers.set('Content-Type', request.headers.get('Content-Type') || 'application/json')
    headers.set('Accept', request.headers.get('Accept') || 'application/json')
    return headers
  }

  const isBodyMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)
  const body = isBodyMethod ? await request.text() : undefined

  let response = await fetch(url.toString(), {
    method: request.method,
    headers: buildHeaders(accessToken),
    body: body || undefined,
  })

  // Token refresh on 401
  let newTokens: RefreshResult | null = null
  if (response.status === 401 && refreshToken) {
    newTokens = await tryRefreshWithLock(refreshToken)
    if (newTokens) {
      response = await fetch(url.toString(), {
        method: request.method,
        headers: buildHeaders(newTokens.accessToken),
        body: body || undefined,
      })
    }
  }

  // SSE passthrough
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('text/event-stream')) {
    const sseResponse = new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
    if (newTokens) setTokenCookies(sseResponse, newTokens)
    return sseResponse
  }

  // Response size check
  const contentLength = response.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
    return NextResponse.json({ error: 'Response too large' }, { status: 502 })
  }

  const responseBody = await response.text()

  const nextResponse = new NextResponse(responseBody, {
    status: response.status,
    headers: { 'Content-Type': contentType || 'application/json' },
  })

  // Set refreshed cookies so browser gets the new tokens
  if (newTokens) setTokenCookies(nextResponse, newTokens)

  return nextResponse
}

export const GET = proxyRequest
export const POST = proxyRequest
export const PUT = proxyRequest
export const PATCH = proxyRequest
export const DELETE = proxyRequest
