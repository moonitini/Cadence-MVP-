"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, Phone, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CallInitiator } from "@/components/call-initiator"
import { CallDetails } from "@/components/call-details"
import { getCallHistory } from "@/app/actions/retell-actions"

interface Call {
  id: string
  patientName: string
  status: string
  protocol: string
  duration?: string
  startTime?: string
  endTime?: string
}

export function CallHistory() {
  const [calls, setCalls] = useState<Call[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false)
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const callData = await getCallHistory()
        setCalls(callData)
      } catch (error) {
        console.error("Error fetching calls:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCalls()

    // Set up polling to refresh call data every 10 seconds
    const intervalId = setInterval(fetchCalls, 10000)

    return () => clearInterval(intervalId)
  }, [])

  const filteredCalls = calls.filter(
    (call) =>
      call.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.protocol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    const today = new Date()

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Mock data for the CallInitiator component
  const mockPatients = [
    { id: "p1", name: "John Doe" },
    { id: "p2", name: "Jane Smith" },
    { id: "p3", name: "Robert Johnson" },
  ]

  const mockProtocols = [
    { id: "Patient Recruitment", name: "Patient Recruitment" },
    { id: "Onboarding Survey", name: "Onboarding Survey" },
    { id: "Post-Study Survey", name: "Post-Study Survey" },
  ]

  if (selectedCallId) {
    return <CallDetails callId={selectedCallId} onBack={() => setSelectedCallId(null)} />
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search your calls..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Call
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CallInitiator
              patients={mockPatients}
              protocols={mockProtocols}
              onClose={() => setIsCallDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <Button variant="outline" size="icon">
          <SlidersHorizontal size={18} />
        </Button>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading calls...</div>
        ) : filteredCalls.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? "No calls match your search" : "No calls found"}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-y">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Patient Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Protocol</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Duration</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCalls.map((call) => (
                <tr key={call.id}>
                  <td className="py-3 px-4 text-sm">{call.patientName}</td>
                  <td className="py-3 px-4 text-sm">{getStatusBadge(call.status)}</td>
                  <td className="py-3 px-4 text-sm">{call.protocol}</td>
                  <td className="py-3 px-4 text-sm">{call.duration || "-"}</td>
                  <td className="py-3 px-4 text-sm">{formatDate(call.startTime)}</td>
                  <td className="py-3 px-4 text-sm">
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setSelectedCallId(call.id)}>
                      <Phone size={16} className="mr-1" />
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  )
}

