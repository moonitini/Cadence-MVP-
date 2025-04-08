"use client"

import { useState } from "react"
import { Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { initiateCall } from "@/app/actions/retell-actions"
import { toast } from "@/components/ui/use-toast"

interface CallInitiatorProps {
  patients: Array<{ id: string; name: string }>
  protocols: Array<{ id: string; name: string }>
  onClose: () => void
}

export function CallInitiator({ patients, protocols, onClose }: CallInitiatorProps) {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedProtocol, setSelectedProtocol] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInitiateCall = async () => {
    if (!selectedPatient || !selectedProtocol || !phoneNumber) {
      toast({
        title: "Missing information",
        description: "Please select a patient, protocol, and enter a phone number",
        variant: "destructive",
      })
      return
    }

    // Basic phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(phoneNumber)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number in E.164 format (e.g., +1234567890)",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await initiateCall(selectedPatient, selectedProtocol, phoneNumber)

      if (result.success) {
        if (result.demoMode) {
          toast({
            title: "Demo Mode: Call simulated",
            description:
              "A simulated call has been added to your call history. In production, this would initiate a real call via Retell.",
          })
        } else {
          toast({
            title: "Call initiated",
            description: "The call has been scheduled and will begin shortly",
          })
        }
        onClose()
      } else {
        toast({
          title: "Failed to initiate call",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Initiate Call</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Patient</label>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger>
              <SelectValue placeholder="Select a patient" />
            </SelectTrigger>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Protocol</label>
          <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
            <SelectTrigger>
              <SelectValue placeholder="Select a protocol" />
            </SelectTrigger>
            <SelectContent>
              {protocols.map((protocol) => (
                <SelectItem key={protocol.id} value={protocol.id}>
                  {protocol.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            type="tel"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs text-gray-500">Enter phone number in E.164 format (e.g., +1234567890)</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleInitiateCall} disabled={isLoading}>
          {isLoading ? (
            "Initiating..."
          ) : (
            <>
              <Phone className="mr-2 h-4 w-4" />
              Initiate Call
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

