import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function UpcomingTasks() {
  const tasks = [
    "Create Pre-Study Protocol",
    "Create Pre-Study Protocol",
    "Create Pre-Study Protocol",
    "Create Pre-Study Protocol",
    "Create Pre-Study Protocol",
    "Create Pre-Study Protocol",
  ]

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center gap-2">
            <Checkbox id={`task-${index}`} />
            <label htmlFor={`task-${index}`} className="text-sm">
              {task}
            </label>
          </div>
        ))}
      </div>
    </Card>
  )
}

