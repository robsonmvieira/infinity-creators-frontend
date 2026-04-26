import type { LoginRequest, LoginResponse } from '../application/types'

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erro ao fazer login' }))
    throw new Error(error.detail || 'Credenciais inválidas')
  }

  return response.json()
}
