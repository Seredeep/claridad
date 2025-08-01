"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toggleUserEnabled } from "@/app/actions/admin"

interface WaitlistUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  location: string
  interest: string
  feedback: string
  enabled: boolean
  createdAt: Date
}

interface WaitlistTableProps {
  users: WaitlistUser[]
}

export function WaitlistTable({ users }: WaitlistTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [enabledFilter, setEnabledFilter] = useState("all")
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set())

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEnabled = enabledFilter === "all" || 
      (enabledFilter === "enabled" && user.enabled) || 
      (enabledFilter === "disabled" && !user.enabled)

    return matchesSearch && matchesEnabled
  })

  const handleToggleEnabled = async (userId: string, currentEnabled: boolean) => {
    setUpdatingUsers(prev => new Set(prev).add(userId))
    await toggleUserEnabled(userId, currentEnabled)
    setUpdatingUsers(prev => {
      const newSet = new Set(prev)
      newSet.delete(userId)
      return newSet
    })
  }

  const enabledCount = users.filter(user => user.enabled).length
  const disabledCount = users.filter(user => !user.enabled).length

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                Enabled: {enabledCount}
              </Badge>
              <Badge variant="secondary" className="bg-gray-300">
                Disabled: {disabledCount}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={enabledFilter} onValueChange={setEnabledFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="enabled">Enabled Only</SelectItem>
                  <SelectItem value="disabled">Disabled Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Location</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Interest</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className={!user.enabled ? "bg-gray-50" : ""}>
                  <td className="py-4 text-sm text-gray-900">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-4 text-sm text-gray-900 font-medium">{user.email}</td>
                  <td className="py-4 text-sm text-gray-900">{user.location}</td>
                  <td className="py-4 text-sm text-gray-900">{user.interest || "N/A"}</td>
                  <td className="py-4">
                    <Badge
                      variant={user.enabled ? "default" : "secondary"}
                      className={user.enabled ? "bg-green-500 hover:bg-green-600" : "bg-gray-300"}
                    >
                      {user.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-4">
                    <Button
                      variant={user.enabled ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggleEnabled(user._id, user.enabled)}
                      disabled={updatingUsers.has(user._id)}
                      className={user.enabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                    >
                      {updatingUsers.has(user._id) ? "..." : (user.enabled ? "Disable" : "Enable")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-8 text-center text-gray-500">No users found matching your criteria.</div>
        )}
      </div>
    </div>
  )
}
