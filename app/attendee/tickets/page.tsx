'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowLeft, QrCode } from 'lucide-react';

export default function TicketsPage() {
  const router = useRouter();
  const { currentUser, tickets, events } = useStore();

  if (!currentUser || currentUser.role !== 'attendee') {
    router.push('/login');
    return null;
  }

  const myTickets = tickets.filter((t) => t.userId === currentUser.id);

  return (
    <div className="min-h-screen bg-muted-light">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <Link href="/attendee/dashboard">
            <Button variant="outline" size="sm">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="container py-12">
        <Link href="/attendee/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

        <div className="space-y-6">
          {myTickets.length > 0 ? (
            myTickets.map((ticket) => {
              const event = events.find((e) => e.id === ticket.eventId);
              return (
                <Card key={ticket.id} className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted mb-2">Event</p>
                      <p className="font-bold text-lg">{event?.title}</p>
                      <p className="text-sm text-muted mt-2">{event?.date} at {event?.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-2">Venue</p>
                      <p className="font-semibold">{event?.venue}</p>
                      <p className="text-sm text-muted mt-2">Status: <span className="text-accent font-semibold">{ticket.status}</span></p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-sm text-muted mb-2">QR Code</p>
                        <div className="bg-muted-light p-3 rounded-lg">
                          <QrCode className="w-12 h-12 text-primary" />
                        </div>
                      </div>
                      <p className="text-xs text-muted mt-2">{ticket.qrCode}</p>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted mb-4">You don't have any tickets yet</p>
              <Link href="/browse">
                <Button>Browse Events</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
