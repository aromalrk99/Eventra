'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const router = useRouter();
  const { currentUser, events, tickets } = useStore();

  if (!currentUser || currentUser.role !== 'organizer') {
    router.push('/login');
    return null;
  }

  const myEvents = events.filter((e) => e.organizerId === currentUser.id);
  const myTickets = tickets.filter((t) =>
    myEvents.some((e) => e.id === t.eventId)
  );

  const chartData = myEvents.map((event) => ({
    name: event.title.substring(0, 15),
    sold: event.ticketsSold,
    available: event.capacity - event.ticketsSold,
  }));

  const revenueData = myEvents.map((event) => ({
    name: event.title.substring(0, 15),
    revenue: event.ticketsSold * event.price,
  }));

  const COLORS = ['#2563EB', '#10B981'];

  return (
    <div className="min-h-screen bg-muted-light">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <Link href="/organizer/dashboard">
            <Button variant="outline" size="sm">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="container py-12">
        <Link href="/organizer/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="p-6">
            <p className="text-sm text-muted mb-2">Total Events</p>
            <p className="text-3xl font-bold">{myEvents.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted mb-2">Total Tickets Sold</p>
            <p className="text-3xl font-bold">{myTickets.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">
              ${revenueData.reduce((sum, d) => sum + d.revenue, 0)}
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Ticket Sales by Event</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sold" fill="#2563EB" name="Sold" />
                <Bar dataKey="available" fill="#10B981" name="Available" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Revenue by Event</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2563EB" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Event Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={myEvents.map((e) => ({ name: e.title.substring(0, 15), value: e.ticketsSold }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {myEvents.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
