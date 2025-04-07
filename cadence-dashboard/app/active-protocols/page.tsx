"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Grid, Home, List, Phone, Plus, Search, Settings, Users, BarChart3 } from "lucide-react"
import { NewProtocolModal } from "@/components/new-protocol-modal"

// Define protocol type
type Protocol = {
  id: string
  name: string
  status: "Active" | "Completed" | "Draft"
  patientsEnrolled: number
  callsCompleted: string
  successRate: string
}

export default function ActiveProtocols() {
  const [showModal, setShowModal] = useState(false)
  // Initialize with existing protocols
  const [protocols, setProtocols] = useState<Protocol[]>([
    {
      id: "1",
      name: "Insurance Policy Updates",
      status: "Completed",
      patientsEnrolled: 132,
      callsCompleted: "127/132",
      successRate: "96%",
    },
    {
      id: "2",
      name: "Appointment Reminders",
      status: "Active",
      patientsEnrolled: 132,
      callsCompleted: "22/132",
      successRate: "57%",
    },
    {
      id: "3",
      name: "Clinic Feedback Survey",
      status: "Draft",
      patientsEnrolled: 0,
      callsCompleted: "-",
      successRate: "-",
    },
  ])

  // Function to add a new protocol
  const handleAddProtocol = (protocolData: {
    name: string
    template: string
    patientCount: number
  }) => {
    const newProtocol: Protocol = {
      id: Date.now().toString(),
      name: protocolData.name,
      status: "Active",
      patientsEnrolled: protocolData.patientCount,
      callsCompleted: `0/${protocolData.patientCount}`,
      successRate: "0%",
    }

    setProtocols([newProtocol, ...protocols])
    setShowModal(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-primary font-semibold text-lg flex items-center">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="mr-2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Cadence
            </div>
          </div>

          <div className="flex items-center justify-between border rounded-md p-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 p-1 rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <div className="text-sm">
                <div>Lavalab Clinic</div>
                <div className="text-xs text-gray-500">Workspace</div>
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        <nav className="p-2">
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-3 w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Home size={18} />
              <span>Dashboard</span>
            </Link>

            <div>
              <button className="flex items-center justify-between w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>Call Manager</span>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              <div className="ml-9 mt-1 space-y-1 text-sm text-gray-600">
                <Link href="/active-protocols" className="block py-1 text-teal-600">
                  Active Protocols
                </Link>
                <div className="py-1">Call Monitor</div>
                <div className="py-1">Transcripts</div>
              </div>
            </div>

            <button className="flex items-center gap-3 w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Users size={18} />
              <span>Patients</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <BarChart3 size={18} />
              <span>Data & Insights</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Active Protocols</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search your protocols..."
                  className="pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="p-2 border rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <button
                className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md text-sm"
                onClick={() => setShowModal(true)}
              >
                <Plus size={16} />
                <span>New Protocol</span>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex border-b">
              <button className="px-4 py-2 text-sm font-medium border-b-2 border-gray-900">All Protocols</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500">Active</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500">Completed</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500">Drafts</button>
              <div className="ml-auto flex">
                <button className="p-2 border-r bg-gray-100">
                  <List size={16} />
                </button>
                <button className="p-2">
                  <Grid size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-500">
                  <th className="py-3 px-4 font-medium">Protocol Name</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Patients Enrolled</th>
                  <th className="py-3 px-4 font-medium">Calls Completed</th>
                  <th className="py-3 px-4 font-medium">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {protocols.map((protocol) => (
                  <tr key={protocol.id} className="border-b">
                    <td className="py-4 px-4">{protocol.name}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${
                          protocol.status === "Active"
                            ? "bg-blue-100 text-blue-800"
                            : protocol.status === "Completed"
                              ? "bg-teal-100 text-teal-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {protocol.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">{protocol.patientsEnrolled}</td>
                    <td className="py-4 px-4">{protocol.callsCompleted}</td>
                    <td className="py-4 px-4">{protocol.successRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && <NewProtocolModal onClose={() => setShowModal(false)} onAddProtocol={handleAddProtocol} />}
    </div>
  )
}

