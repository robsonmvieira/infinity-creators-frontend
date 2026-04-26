'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from '@/src/i18n/navigation'
import { useLogin } from '../hooks/use-login'
import { LoginHeader } from './login-header'
import { EmailInput } from './email-input'
import { PasswordInput } from './password-input'
import { AuthError } from './auth-error'
import { Link } from '@/src/i18n/navigation'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const loginMutation = useLogin()

  const errorMessage = loginMutation.error?.message ?? null
  const canSubmit = email.trim() !== '' && password.trim() !== ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    loginMutation.mutate(
      { email: email.trim(), password },
      { onSuccess: () => router.push('/dashboard') },
    )
  }

  return (
    <div className="w-full max-w-sm px-6 sm:px-0">
      <LoginHeader />

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthError message={errorMessage} />

        <EmailInput
          id="login-email"
          value={email}
          onChange={setEmail}
          label="Email"
        />

        <PasswordInput
          id="login-password"
          value={password}
          onChange={setPassword}
          label="Senha"
          placeholder="Sua senha"
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-primary transition-colors hover:text-primary/80"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loginMutation.isPending}
          className="brand-gradient flex h-11 w-full items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
        >
          {loginMutation.isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-on-surface-variant">
        Ainda nao tem conta?{' '}
        <Link
          href="/register"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          Criar conta
        </Link>
      </p>
    </div>
  )
}
