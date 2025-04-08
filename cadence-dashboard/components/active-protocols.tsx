import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ActiveProtocols() {
  const protocols = [
    {
      name: "Patient Recruitment",
      completed: 123,
      total: 200,
      percentage: 62,
    },
    {
      name: "Onboarding Survey",
      completed: 123,
      total: 200,
      percentage: 62,
    },
    {
      name: "Post-Study Survey",
      completed: 123,
      total: 200,
      percentage: 62,
    },
  ]

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {protocols.map((protocol, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{protocol.name}</span>
              <span className="text-sm text-gray-500">
                {protocol.completed}/{protocol.total} Contacted
              </span>
            </div>
            <Progress value={protocol.percentage} className="h-2 bg-gray-100" indicatorClassName="bg-teal-500" />
          </div>
        ))}
      </div>
    </Card>
  )
}

