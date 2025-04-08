import { Circle, CheckCircle, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export function OverviewCards() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Circle className="text-gray-400" />
          <div className="font-medium">32 Calls Scheduled</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-teal-500" />
          <div className="font-medium">12 Calls Completed</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <div className="font-medium">7 Pending Follow-Ups</div>
        </div>
      </Card>
    </div>
  )
}

