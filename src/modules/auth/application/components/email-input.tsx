interface EmailInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
}

export function EmailInput({
  id,
  value,
  onChange,
  label,
  placeholder = 'seu@email.com',
}: Readonly<EmailInputProps>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-on-surface"
      >
        {label}
      </label>
      <input
        id={id}
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="email"
        className="h-11 w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
