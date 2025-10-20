'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { LogOut, Ticket, Heart, MessageSquare, User } from 'lucide-react';

export default function AttendeeDashboard() {
  const router = useRouter();
  const { currentUser, logout, tickets, events, wishlist } = useStore();

  if (!currentUser || currentUser.role !== 'attendee') {
    router.push('/login');
    return null;
  }

  const myTickets = tickets.filter((t) => t.userId === currentUser.id);
  const myEvents = myTickets.map((t) => events.find((e) => e.id === t.eventId)).filter(Boolean);
  const savedEvents = events.filter((e) => wishlist.includes(e.id));

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
          <Link href="/attendee/tickets">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <Ticket className="w-8 h-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{myTickets.length}</p>
              <p className="text-sm text-muted">My Tickets</p>
            </Card>
          </Link>
          <Link href="/attendee/wishlist">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <Heart className="w-8 h-8 text-accent mb-2" />
              <p className="text-2xl font-bold">{savedEvents.length}</p>
              <p className="text-sm text-muted">Saved Events</p>
            </Card>
          </Link>
          <Link href="/attendee/feedback">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <MessageSquare className="w-8 h-8 text-primary mb-2" />
              <p className="text-2xl font-bold">Reviews</p>
              <p className="text-sm text-muted">Leave Feedback</p>
            </Card>
          </Link>
          <Link href="/attendee/profile">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <User className="w-8 h-8 text-accent mb-2" />
              <p className="text-2xl font-bold">Profile</p>
              <p className="text-sm text-muted">Edit Details</p>
            </Card>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {myEvents.length > 0 ? (
            myEvents.map((event) => (
              <Link key={event?.id} href={`/event/${event?.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <img
                    src={event?.image || "/placeholder.svg"}
                    alt={event?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{event?.title}</h3>
                    <p className="text-sm text-muted mb-2">{event?.date}</p>
                    <p className="text-sm text-muted">{event?.venue}</p>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted mb-4">You haven't purchased any tickets yet</p>
              <Link href="/browse">
                <Button>Browse Events</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
