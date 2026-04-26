'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label: string
  autoComplete?: string
}

export function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  label,
  autoComplete = 'current-password',
}: Readonly<PasswordInputProps>) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-on-surface"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-11 w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 pr-11 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-on-surface"
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}
