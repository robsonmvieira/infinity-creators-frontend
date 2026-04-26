import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    return new NextResponse(error, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await response.json()

  const res = NextResponse.json({ success: true })

  res.cookies.set('access_token', data.access_token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 30, // 30 min
  })

  res.cookies.set('refresh_token', data.refresh_token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return res
}
