"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WaitlistTable } from "@/components/admin/waitlist-table"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

interface AdminTabsProps {
  users: any[]
}

export function AdminTabs({ users }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <>
      <div className="mb-6">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            onClick={() => setActiveTab("users")}
            className={activeTab === "users" ? "bg-[#58eda2] hover:bg-[#4dd396] text-white" : ""}
          >
            User Management
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "ghost"}
            onClick={() => setActiveTab("analytics")}
            className={activeTab === "analytics" ? "bg-[#58eda2] hover:bg-[#4dd396] text-white" : ""}
          >
            Analytics
          </Button>
        </div>
      </div>

      {activeTab === "users" ? <WaitlistTable users={users} /> : <AnalyticsDashboard users={users} />}
    </>
  )
}
