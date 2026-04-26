export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="dot-grid relative flex min-h-dvh flex-1 flex-col items-center justify-center px-4 py-12">
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Card */}
      <div className="glass ghost-border relative z-10 w-full max-w-md rounded-2xl p-8 shadow-xl shadow-black/5 sm:p-10 dark:shadow-black/30">
        {children}
      </div>
    </div>
  )
}
