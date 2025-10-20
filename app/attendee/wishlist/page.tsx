'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowLeft, Heart } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const { currentUser, wishlist, events, toggleWishlist } = useStore();

  if (!currentUser || currentUser.role !== 'attendee') {
    router.push('/login');
    return null;
  }

  const savedEvents = events.filter((e) => wishlist.includes(e.id));

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

        <h1 className="text-3xl font-bold mb-8">Saved Events</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {savedEvents.length > 0 ? (
            savedEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-accent font-semibold">{event.category}</span>
                    <button
                      onClick={() => toggleWishlist(event.id)}
                      className="text-accent hover:text-primary transition"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <h3 className="font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-muted mb-2">{event.date}</p>
                  <p className="text-sm text-muted mb-4">{event.venue}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">${event.price}</span>
                    <Link href={`/event/${event.id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-3 p-12 text-center">
              <p className="text-muted mb-4">You haven't saved any events yet</p>
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
