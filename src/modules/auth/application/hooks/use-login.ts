'use client'

import { useMutation } from '@tanstack/react-query'
import { login } from '../../infra/auth-service'
import type { LoginRequest } from '../types'

export function useLogin() {
  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
  })
}
