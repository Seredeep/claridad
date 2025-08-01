"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toggleUserEnabled } from "@/app/actions/admin"
import { LogOut, Mail, Users } from "lucide-react"
import { adminLogout } from "@/app/actions/admin"
import { ThemeToggle } from "@/components/theme-toggle"
import { ClaridadLogo } from "@/components/claridad-logo"

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

interface AdminPanelProps {
  users: WaitlistUser[]
}

export function AdminPanel({ users }: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("users")
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set())

  const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleToggleEnabled = async (userId: string, currentEnabled: boolean) => {
    setUpdatingUsers(prev => new Set(prev).add(userId))
    await toggleUserEnabled(userId, currentEnabled)
    setUpdatingUsers(prev => {
      const newSet = new Set(prev)
      newSet.delete(userId)
      return newSet
    })
  }

  const enabledUsers = users.filter((u) => u.enabled)
  const disabledUsers = users.filter((u) => !u.enabled)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-3">
              <ClaridadLogo size="sm" />
              <h1 className="text-xl font-semibold text-foreground kiona-font">CLARIDAD ADMIN ({users.length})</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <form action={adminLogout}>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-card p-6 shadow border">
            <div className="text-2xl font-bold text-[#FF9B17]">{users.length}</div>
            <div className="text-sm text-muted-foreground">Total Signups</div>
          </div>
          <div className="rounded-lg bg-card p-6 shadow border">
            <div className="text-2xl font-bold text-[#FF9B17]">{disabledUsers.length}</div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </div>
          <div className="rounded-lg bg-card p-6 shadow border">
            <div className="text-2xl font-bold text-[#FF9B17]">{enabledUsers.length}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              onClick={() => setActiveTab("users")}
              className={
                activeTab === "users" ? "bg-[#FF9B17] hover:bg-[#FF9B17]/90 text-white" : "hover:bg-muted-foreground/10"
              }
            >
              <Users className="h-4 w-4 mr-2" />
              User Management
            </Button>
            <Button
              variant={activeTab === "emails" ? "default" : "ghost"}
              onClick={() => setActiveTab("emails")}
              className={
                activeTab === "emails"
                  ? "bg-[#FF9B17] hover:bg-[#FF9B17]/90 text-white"
                  : "hover:bg-muted-foreground/10"
              }
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Panel
            </Button>
          </div>
        </div>

        {activeTab === "users" ? (
          <div>
            <div className="mb-6">
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="rounded-lg bg-card shadow overflow-hidden border">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className={!user.enabled ? "bg-gray-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={user.enabled ? "default" : "secondary"}
                          className={user.enabled ? "bg-green-500 hover:bg-green-600" : "bg-gray-300"}
                        >
                          {user.enabled ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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

              {filteredUsers.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  {searchTerm ? "No users found matching your search." : "No users yet."}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-lg bg-card p-6 shadow border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Email Campaign Panel</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Send to:</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users ({users.length})</SelectItem>
                        <SelectItem value="enabled">Active Users ({enabledUsers.length})</SelectItem>
                        <SelectItem value="disabled">Inactive Users ({disabledUsers.length})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Subject:</label>
                    <Input placeholder="Email subject" className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Message:</label>
                  <textarea
                    className="mt-1 w-full h-24 px-3 py-2 border border-input bg-background rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF9B17] focus:border-transparent"
                    placeholder="Your message here..."
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-[#FF9B17] hover:bg-[#FF9B17]/90 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-card shadow border">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Email History</h3>
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No emails sent yet</p>
                  <p className="text-sm">Email campaigns will appear here once sent</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
