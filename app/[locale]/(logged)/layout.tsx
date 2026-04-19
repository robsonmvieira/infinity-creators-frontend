import { Sidebar } from '@/components/layout/sidebar'
import { TopBar } from '@/components/layout/top-bar'
import { MobileNav } from '@/components/layout/mobile-nav'

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
        <TopBar />
        <div className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</div>
      </main>
      <MobileNav />
    </div>
  )
}
