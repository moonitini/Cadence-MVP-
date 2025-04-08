import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <DashboardContent />
    </div>
  )
}

