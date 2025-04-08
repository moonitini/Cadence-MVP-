"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Play } from "lucide-react"

interface CallDetailsProps {
  callId: string
  onBack: () => void
}

interface CallData {
  id: string
  patientName: string
  phoneNumber: string
  protocol: string
  status: string
  duration?: string
  startTime?: string
  endTime?: string
  notes?: string
  transcript?: string
  recordingUrl?: string
}

export function CallDetails({ callId, onBack }: CallDetailsProps) {
  const [call, setCall] = useState<CallData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch call details from your API
    // For demo purposes, we're using mock data
    const fetchCallDetails = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setCall({
          id: callId,
          patientName: "John Doe",
          phoneNumber: "+1234567890",
          protocol: "Onboarding Survey",
          status: "completed",
          duration: "01:37",
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 97000).toISOString(),
          notes: "Patient expressed interest in the trial but had concerns about the time commitment.",
          transcript:
            "Agent: Hello, this is Cadence calling about the clinical trial. How are you today?\n\nPatient: I'm doing well, thank you. What's this about?\n\nAgent: I'm calling about the diabetes management trial you expressed interest in. Do you have a few minutes to discuss?\n\nPatient: Yes, I'm interested but concerned about the time commitment.\n\nAgent: I understand. The trial requires only two visits to the clinic and daily medication tracking through our app. Most participants spend about 10 minutes per day on trial activities.",
          recordingUrl: "#",
        })
      } catch (error) {
        console.error("Error fetching call details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCallDetails()
  }, [callId])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!call) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p>Call not found</p>
            <Button onClick={onBack} variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Call History
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <Button onClick={onBack} variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <CardTitle>Call with {call.patientName}</CardTitle>
        </div>
        <Badge
          variant="outline"
          className={
            call.status === "completed"
              ? "bg-green-50 text-green-700 border-green-200"
              : call.status === "in-progress"
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Protocol</h3>
            <p>{call.protocol}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
            <p>{call.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Start Time</h3>
            <p>{formatDate(call.startTime)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
            <p>{call.duration}</p>
          </div>
        </div>

        {call.notes && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
            <div className="p-3 bg-gray-50 rounded-md">
              <p>{call.notes}</p>
            </div>
          </div>
        )}

        {call.recordingUrl && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Recording</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Play Recording
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        )}

        {call.transcript && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Transcript</h3>
            <div className="p-3 bg-gray-50 rounded-md whitespace-pre-line">
              <p>{call.transcript}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

