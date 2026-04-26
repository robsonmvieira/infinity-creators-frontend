import { AlertCircle } from 'lucide-react'

interface AuthErrorProps {
  message: string | null
}

export function AuthError({ message }: Readonly<AuthErrorProps>) {
  if (!message) return null

  return (
    <div
      role="alert"
      className="flex items-center gap-2 rounded-lg bg-error/10 px-4 py-3 text-sm text-error"
    >
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  )
}
