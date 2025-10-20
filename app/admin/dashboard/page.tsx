'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { LogOut, Users, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const router = useRouter();
  const { currentUser, logout, events, tickets } = useStore();

  if (!currentUser || currentUser.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const totalRevenue = tickets.length * 50; // Average price
  const chartData = events.slice(0, 5).map((e) => ({
    name: e.title.substring(0, 12),
    sales: e.ticketsSold,
  }));

  return (
    <div className="min-h-screen bg-muted-light">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted">Admin: {currentUser.name}</span>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6">
            <Users className="w-8 h-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{events.length}</p>
            <p className="text-sm text-muted">Total Events</p>
          </Card>
          <Card className="p-6">
            <Calendar className="w-8 h-8 text-accent mb-2" />
            <p className="text-2xl font-bold">{tickets.length}</p>
            <p className="text-sm text-muted">Total Tickets</p>
          </Card>
          <Card className="p-6">
            <TrendingUp className="w-8 h-8 text-primary mb-2" />
            <p className="text-2xl font-bold text-primary">${totalRevenue}</p>
            <p className="text-sm text-muted">Platform Revenue</p>
          </Card>
          <Link href="/admin/users">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <Users className="w-8 h-8 text-accent mb-2" />
              <p className="text-sm text-muted">Manage Users</p>
            </Card>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Top Events by Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/users" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/categories" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Manage Categories
                </Button>
              </Link>
              <Link href="/admin/analytics" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  View Analytics
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Events</h2>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex justify-between items-center p-3 bg-muted-light rounded-lg">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted">{event.organizerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{event.ticketsSold} tickets</p>
                  <p className="text-sm text-muted">${event.price} each</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
