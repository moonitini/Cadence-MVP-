"use client"

import { useState } from "react"
import { Check, Search } from "lucide-react"

type Step = "create" | "template" | "patients" | "success"

type NewProtocolModalProps = {
  onClose: () => void
  onAddProtocol: (protocolData: {
    name: string
    template: string
    patientCount: number
  }) => void
}

export function NewProtocolModal({ onClose, onAddProtocol }: NewProtocolModalProps) {
  const [step, setStep] = useState<Step>("create")
  const [protocolName, setProtocolName] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [teamMembers, setTeamMembers] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])

  const handleNext = () => {
    if (step === "create") setStep("template")
    else if (step === "template") setStep("patients")
    else if (step === "patients") {
      // Create the protocol before showing success
      onAddProtocol({
        name: protocolName || "New Protocol",
        template: selectedTemplate || "default",
        patientCount: selectedPatients.length || 4, // Default to 4 if none selected
      })
      setStep("success")
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const togglePatient = (id: string) => {
    if (selectedPatients.includes(id)) {
      setSelectedPatients(selectedPatients.filter((patientId) => patientId !== id))
    } else {
      setSelectedPatients([...selectedPatients, id])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {step === "create" && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">Create New Protocol</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Protocol Name</label>
                <input
                  type="text"
                  placeholder="Enter your protocol name"
                  className="w-full p-2 border rounded-md"
                  value={protocolName}
                  onChange={(e) => setProtocolName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start & End Date</label>
                <div className="relative">
                  <select
                    className="w-full p-2 border rounded-md appearance-none"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a date range
                    </option>
                    <option value="next-7-days">Next 7 days</option>
                    <option value="next-14-days">Next 14 days</option>
                    <option value="next-30-days">Next 30 days</option>
                    <option value="custom">Custom range</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assign Team Members</label>
                <div className="relative">
                  <select
                    className="w-full p-2 border rounded-md appearance-none"
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose team members
                    </option>
                    <option value="all">All team members</option>
                    <option value="nurses">Nurses only</option>
                    <option value="doctors">Doctors only</option>
                    <option value="custom">Custom selection</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <button onClick={handleCancel} className="px-4 py-2 border rounded-md text-sm">
                Cancel
              </button>
              <button onClick={handleNext} className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm">
                Next
              </button>
            </div>
          </>
        )}

        {step === "template" && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">Select a Call Template</h2>
            <div className="space-y-3">
              <label className="flex items-start p-3 border rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="template"
                  className="mt-1 mr-3"
                  value="onboarding"
                  checked={selectedTemplate === "onboarding"}
                  onChange={() => setSelectedTemplate("onboarding")}
                />
                <div>
                  <div className="font-medium">Onboarding Survey</div>
                  <div className="text-sm text-gray-500">
                    Standardized patient onboarding survey for collecting personal information
                  </div>
                </div>
              </label>

              <label className="flex items-start p-3 border rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="template"
                  className="mt-1 mr-3"
                  value="followup"
                  checked={selectedTemplate === "followup"}
                  onChange={() => setSelectedTemplate("followup")}
                />
                <div>
                  <div className="font-medium">Follow-Up Reminder</div>
                  <div className="text-sm text-gray-500">
                    Quick phone call to remind patients of an upcoming appointment or procedure
                  </div>
                </div>
              </label>

              <label className="flex items-start p-3 border rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="template"
                  className="mt-1 mr-3"
                  value="retention"
                  checked={selectedTemplate === "retention"}
                  onChange={() => setSelectedTemplate("retention")}
                />
                <div>
                  <div className="font-medium">Retention Check-in</div>
                  <div className="text-sm text-gray-500">
                    Scheduled phone call to collect qualitative data about a patient's experience throughout a study
                  </div>
                </div>
              </label>
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <button onClick={handleCancel} className="px-4 py-2 border rounded-md text-sm">
                Cancel
              </button>
              <button onClick={handleNext} className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm">
                Next
              </button>
            </div>
          </>
        )}

        {step === "patients" && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">Assign Patients</h2>
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search for existing patients..."
                className="w-full pl-9 pr-4 py-2 border rounded-md"
              />
            </div>
            <div className="border rounded-md overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b last:border-b-0">
                  <div>
                    <div>John Smith</div>
                    <div className="text-sm text-gray-500">ID: 12345</div>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={selectedPatients.includes(`patient-${i}`)}
                    onChange={() => togglePatient(`patient-${i}`)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <button onClick={handleCancel} className="px-4 py-2 border rounded-md text-sm">
                Cancel
              </button>
              <button onClick={handleNext} className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm">
                Next
              </button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Protocol Created Successfully</h2>
            <p className="text-gray-500 mb-6">You're all set. You can now begin scheduling calls.</p>
            <button onClick={handleCancel} className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

