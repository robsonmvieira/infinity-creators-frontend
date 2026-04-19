import {
  WelcomeHero,
  StatsRow,
  NextScheduledCard,
  RecentContentTable,
  PerformanceCard,
  QuickActionBar,
} from '@modules/dashboard/application/components'
import {
  MOCK_STATS,
  MOCK_RECENT_CONTENT,
  MOCK_PERFORMANCE,
} from '@modules/dashboard/application/mock-data'

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 pb-28 no-scrollbar lg:p-8">
      <div className="space-y-12">
        <WelcomeHero />

        <StatsRow stats={MOCK_STATS} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <NextScheduledCard />
            <RecentContentTable items={MOCK_RECENT_CONTENT} />
          </div>

          <div>
            <PerformanceCard metrics={MOCK_PERFORMANCE} />
          </div>
        </div>
      </div>

      <QuickActionBar />
    </div>
  )
}
