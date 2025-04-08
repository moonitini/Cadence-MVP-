"use server"

import { revalidatePath } from "next/cache"

type CallStatus = "scheduled" | "in-progress" | "completed" | "failed" | "cancelled"

interface CallData {
  id: string
  patientId: string
  patientName: string
  phoneNumber: string
  protocol: string
  status: CallStatus
  scheduledTime?: string
  startTime?: string
  endTime?: string
  duration?: string
  notes?: string
}

// Mock database for storing call data
const callsDatabase: CallData[] = [
  {
    id: "1",
    patientId: "p1",
    patientName: "John Doe",
    phoneNumber: "+1234567890",
    protocol: "Onboarding",
    status: "completed",
    startTime: "2025-04-05T09:30:00Z",
    endTime: "2025-04-05T09:43:00Z",
    duration: "01:37",
    notes: "Patient declined to participate",
  },
  // More mock data can be added here
]

export async function initiateCall(patientId: string, protocol: string, phoneNumber: string) {
  try {
    // Get the Retell API key from environment variables
    const apiKey = process.env.RETELL_API_KEY

    if (!apiKey) {
      throw new Error("Retell API key is not configured")
    }

    // Find patient in our mock database
    const patient = {
      id: patientId,
      name: "John Doe",
      phoneNumber: phoneNumber, // Use the provided phone number
    }

    // Generate a webhook URL that works in both development and production
    const baseUrl = process.env.VERCEL_URL
      ? process.env.VERCEL_URL.startsWith("http")
        ? process.env.VERCEL_URL
        : `http://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    console.log("Using webhook URL base:", baseUrl)
    const webhookUrl = `${baseUrl}/api/retell-webhook`

    console.log("Initiating call to Retell API with webhook URL:", webhookUrl)

    // Call the Retell API to initiate a call
    const response = await fetch("https://api.retellai.com/v1/calls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        llm_webhook_url: webhookUrl,
        phone_number: patient.phoneNumber,
        agent_id: getAgentIdForProtocol(protocol),
        metadata: {
          patientId,
          protocol,
        },
      }),
    })

    const responseText = await response.text()
    console.log("Retell API response:", responseText)

    let callData
    try {
      callData = JSON.parse(responseText)
    } catch (e) {
      console.error("Failed to parse Retell API response:", e)
      throw new Error(`Failed to parse Retell API response: ${responseText}`)
    }

    if (!response.ok) {
      throw new Error(`Failed to initiate call: ${callData.message || response.statusText}`)
    }

    // Store call data in our database
    const newCall: CallData = {
      id: callData.id || `mock-${Date.now()}`, // Fallback for testing
      patientId,
      patientName: patient.name,
      phoneNumber: patient.phoneNumber,
      protocol,
      status: "scheduled",
      scheduledTime: new Date().toISOString(),
    }

    callsDatabase.push(newCall)

    // Revalidate the dashboard page to show the new call
    revalidatePath("/")

    return { success: true, callId: newCall.id }
  } catch (error) {
    console.error("Error initiating call:", error)

    // For demo purposes, create a mock call even if the API call fails
    const mockCallId = `mock-${Date.now()}`
    const patient = {
      id: patientId,
      name: "John Doe",
      phoneNumber: phoneNumber,
    }

    const newCall: CallData = {
      id: mockCallId,
      patientId,
      patientName: patient.name,
      phoneNumber: patient.phoneNumber,
      protocol,
      status: "scheduled",
      scheduledTime: new Date().toISOString(),
      notes: "Demo mode: This is a simulated call",
    }

    callsDatabase.push(newCall)
    revalidatePath("/")

    return {
      success: true,
      callId: mockCallId,
      demoMode: true,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getCallHistory() {
  // In a real app, this would fetch from a database
  return callsDatabase
}

export async function updateCallStatus(callId: string, status: CallStatus, notes?: string) {
  const callIndex = callsDatabase.findIndex((call) => call.id === callId)

  if (callIndex === -1) {
    return { success: false, error: "Call not found" }
  }

  callsDatabase[callIndex] = {
    ...callsDatabase[callIndex],
    status,
    notes,
  }

  if (status === "completed") {
    const startTime = new Date(callsDatabase[callIndex].startTime || new Date())
    const endTime = new Date()
    const durationMs = endTime.getTime() - startTime.getTime()
    const minutes = Math.floor(durationMs / 60000)
    const seconds = Math.floor((durationMs % 60000) / 1000)

    callsDatabase[callIndex].endTime = endTime.toISOString()
    callsDatabase[callIndex].duration = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  revalidatePath("/")

  return { success: true }
}

// Helper function to get the appropriate Retell agent ID for a protocol
function getAgentIdForProtocol(protocol: string): string {
  // Using a default agent ID for all protocols in this example
  // In a real implementation, you would use different agent IDs for different protocols
  return "agent_default"
}

