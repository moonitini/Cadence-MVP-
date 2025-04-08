"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Phone, ChevronDown, Users, BarChart2, Settings } from "lucide-react"

export function Sidebar() {
  const [isCallManagerOpen, setIsCallManagerOpen] = useState(true)

  return (
    <div className="w-64 h-full border-r bg-white flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">Cadence</h1>
      </div>

      <div className="p-4 border-b">
        <div className="flex items-center gap-2 p-2 rounded-md border">
          <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-600 text-sm">WS</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">[Trial Name]</p>
            <p className="text-xs text-gray-500">Workspace</p>
          </div>
          <button>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          <li>
            <Link href="#" className="flex items-center gap-3 p-2 rounded-md bg-gray-100 text-gray-900 font-medium">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => setIsCallManagerOpen(!isCallManagerOpen)}
              className="w-full flex items-center justify-between p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span>Call Manager</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${isCallManagerOpen ? "rotate-180" : ""}`} />
            </button>

            {isCallManagerOpen && (
              <ul className="pl-9 mt-1 space-y-1">
                <li>
                  <Link href="#" className="block p-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Active Protocols
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block p-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Call Monitor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block p-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Transcripts
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Users size={20} />
              <span>Patients</span>
            </Link>
          </li>

          <li>
            <Link href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <BarChart2 size={20} />
              <span>Data & Insights</span>
            </Link>
          </li>

          <li>
            <Link href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

