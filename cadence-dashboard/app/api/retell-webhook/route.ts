import { type NextRequest, NextResponse } from "next/server"
import { updateCallStatus } from "@/app/actions/retell-actions"

export async function POST(request: NextRequest) {
  try {
    console.log("Received webhook from Retell")

    const body = await request.json()
    console.log("Webhook payload:", JSON.stringify(body, null, 2))

    // Validate the request
    if (!body.call_id) {
      console.error("Invalid webhook request: missing call_id")
      return NextResponse.json({ error: "Invalid request - missing call_id" }, { status: 400 })
    }

    // Handle different webhook events
    switch (body.event) {
      case "call.started":
        console.log(`Call ${body.call_id} started`)
        await updateCallStatus(body.call_id, "in-progress")
        break
      case "call.completed":
        console.log(`Call ${body.call_id} completed`)
        await updateCallStatus(body.call_id, "completed", body.summary || "")
        break
      case "call.failed":
        console.log(`Call ${body.call_id} failed: ${body.error || "Unknown error"}`)
        await updateCallStatus(body.call_id, "failed", body.error || "")
        break
      default:
        console.log(`Received unhandled event type: ${body.event}`)
        // Handle other events as needed
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

