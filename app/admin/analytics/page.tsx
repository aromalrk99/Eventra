"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { ArrowLeft } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const { currentUser, events, tickets } = useStore()

  if (!currentUser || currentUser.role !== "admin") {
    router.push("/login")
    return null
  }

  const chartData = [
    { month: "Jan", events: 5, tickets: 120, revenue: 6000 },
    { month: "Feb", events: 8, tickets: 200, revenue: 10000 },
    { month: "Mar", events: 12, tickets: 350, revenue: 17500 },
  ]

  const categoryData = [
    { name: "Technology", value: 45 },
    { name: "Music", value: 30 },
    { name: "Business", value: 20 },
    { name: "Art", value: 15 },
    { name: "Sports", value: 25 },
  ]

  return (
    <div className="min-h-screen bg-muted-light">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container py-12">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">Platform Analytics</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="p-6">
            <p className="text-sm text-muted mb-2">Total Events</p>
            <p className="text-3xl font-bold">{events.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted mb-2">Total Tickets Sold</p>
            <p className="text-3xl font-bold">{tickets.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted mb-2">Platform Revenue</p>
            <p className="text-3xl font-bold text-primary">${tickets.length * 50}</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Growth Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="events" stroke="#2563EB" name="Events" />
                <Line type="monotone" dataKey="tickets" stroke="#10B981" name="Tickets" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Revenue Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2563EB" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Events by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563EB" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
