import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/src/i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

const AUTH_PATHS = ['/login', '/register', '/forgot-password', '/reset-password']
const PROTECTED_PATHS = ['/dashboard', '/settings', '/brand', '/create', '/calendar', '/library']

function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some((path) => pathname.endsWith(path))
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((path) => pathname.includes(path))
}

function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString('base64')
}

function generateCsrfToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString('hex')
}

function buildCspHeader(nonce: string): string {
  const isDev = process.env.NODE_ENV === 'development'
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ].join('; ')
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for API routes and static assets
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Run next-intl middleware first
  const response = intlMiddleware(request)

  // Generate CSP nonce (skip CSP in development — Next.js injects inline
  // scripts without nonces during dev, which strict-dynamic blocks)
  const nonce = generateNonce()
  response.headers.set('x-nonce', nonce)
  if (process.env.NODE_ENV !== 'development') {
    response.headers.set('Content-Security-Policy', buildCspHeader(nonce))
  }

  // CSRF token cookie
  const existingCsrf = request.cookies.get('csrf_token')?.value
  if (!existingCsrf) {
    const csrfToken = generateCsrfToken()
    response.cookies.set('csrf_token', csrfToken, {
      httpOnly: false, // Must be readable by JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
  }

  // Route protection
  const hasAccessToken = request.cookies.has('access_token')

  if (isProtectedPath(pathname) && !hasAccessToken) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthPath(pathname) && hasAccessToken) {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // No-cache for auth pages
  if (isAuthPath(pathname)) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
}
