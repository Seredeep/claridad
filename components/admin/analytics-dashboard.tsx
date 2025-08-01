"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AnalyticsDashboardProps {
  users: any[]
}

export function AnalyticsDashboard({ users }: AnalyticsDashboardProps) {
  // Process data for charts
  const signupsByDay = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const dailySignups = Object.entries(signupsByDay)
    .map(([date, count]) => ({
      date,
      signups: count,
    }))
    .slice(-7) // Last 7 days

  const interestData = users.reduce((acc, user) => {
    if (user.interest) {
      acc[user.interest] = (acc[user.interest] || 0) + 1
    }
    return acc
  }, {})

  const interestChart = Object.entries(interestData).map(([interest, count]) => ({
    name: interest.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    value: count,
  }))

  const locationData = users.reduce((acc, user) => {
    const location = user.location.split(",")[0].trim() // Get city part
    acc[location] = (acc[location] || 0) + 1
    return acc
  }, {})

  const topLocations = Object.entries(locationData)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([location, count]) => ({
      location,
      users: count,
    }))

  const COLORS = ["#58eda2", "#4dd396", "#42c78a", "#37bb7e", "#2caf72"]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#58eda2]">{users.length}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#58eda2]">
              {
                users.filter((u) => {
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return new Date(u.createdAt) > weekAgo
                }).length
              }
            </div>
            <p className="text-xs text-gray-500">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#58eda2]">
              {users.filter((u) => u.status === "approved").length}
            </div>
            <p className="text-xs text-gray-500">Ready for launch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#58eda2]">
              {users.length > 0
                ? Math.round((users.filter((u) => u.status === "approved").length / users.length) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-gray-500">Approval rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Signups (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySignups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="signups" stroke="#58eda2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={interestChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {interestChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topLocations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#58eda2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
