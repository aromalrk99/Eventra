'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { LogOut, Plus, BarChart3, MessageSquare } from 'lucide-react';

export default function OrganizerDashboard() {
  const router = useRouter();
  const { currentUser, logout, events, tickets } = useStore();

  if (!currentUser || currentUser.role !== 'organizer') {
    router.push('/login');
    return null;
  }

  const myEvents = events.filter((e) => e.organizerId === currentUser.id);
  const myTickets = tickets.filter((t) =>
    myEvents.some((e) => e.id === t.eventId)
  );
  const totalRevenue = myTickets.length * (myEvents[0]?.price || 0);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-muted-light">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted">Welcome, {currentUser.name}</span>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6">
            <p className="text-2xl font-bold">{myEvents.length}</p>
            <p className="text-sm text-muted">Total Events</p>
          </Card>
          <Card className="p-6">
            <p className="text-2xl font-bold">{myTickets.length}</p>
            <p className="text-sm text-muted">Tickets Sold</p>
          </Card>
          <Card className="p-6">
            <p className="text-2xl font-bold text-primary">${totalRevenue}</p>
            <p className="text-sm text-muted">Total Revenue</p>
          </Card>
          <Link href="/organizer/analytics">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm text-muted">View Analytics</p>
            </Card>
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">My Events</h2>
          <Link href="/organizer/create-event">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {myEvents.length > 0 ? (
            myEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-sm text-muted mb-4">{event.date} at {event.time}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm">
                      <span className="font-bold">{event.ticketsSold}</span>/{event.capacity} sold
                    </span>
                    <span className="text-primary font-bold">${event.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/organizer/edit-event/${event.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/organizer/event-feedback/${event.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                        <MessageSquare className="w-4 h-4" />
                        Feedback
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-2 p-12 text-center">
              <p className="text-muted mb-4">You haven't created any events yet</p>
              <Link href="/organizer/create-event">
                <Button>Create Your First Event</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
