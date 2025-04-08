import { OverviewCards } from "@/components/overview-cards"
import { ActiveProtocols } from "@/components/active-protocols"
import { DataInsights } from "@/components/data-insights"
import { UpcomingTasks } from "@/components/upcoming-tasks"
import { CallHistory } from "@/components/call-history"

export function DashboardContent() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
          <OverviewCards />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Active Protocols</h2>
          <ActiveProtocols />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Data Insights</h2>
          <DataInsights />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <UpcomingTasks />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Call History</h2>
        <CallHistory />
      </div>
    </div>
  )
}

