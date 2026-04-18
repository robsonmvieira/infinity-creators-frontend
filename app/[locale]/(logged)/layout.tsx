export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-full flex-1">
      {/* TODO: Sidebar */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
