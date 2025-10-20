'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { Heart, MapPin, Calendar, Users } from 'lucide-react';

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { events, currentUser, buyTicket, toggleWishlist, wishlist, feedback } = useStore();
  const event = events.find((e) => e.id === params.id);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const isWishlisted = wishlist.includes(params.id);
  const eventFeedback = feedback.filter((f) => f.eventId === params.id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/browse">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBuyTicket = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    buyTicket(event.id, currentUser.id);
    setShowBuyModal(false);
    router.push('/attendee/tickets');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/browse" className="text-foreground hover:text-primary transition">
              Browse Events
            </Link>
            {currentUser ? (
              <Link href={`/${currentUser.role}/dashboard`}>
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <Link href="/browse" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Events
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted">
                <Calendar className="w-5 h-5" />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <MapPin className="w-5 h-5" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <Users className="w-5 h-5" />
                <span>{event.capacity - event.ticketsSold} of {event.capacity} seats available</span>
              </div>
            </div>

            <div className="prose max-w-none mb-12">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-muted leading-relaxed">{event.description}</p>
            </div>

            {/* Feedback Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Attendee Reviews</h2>
              <div className="space-y-4">
                {eventFeedback.length > 0 ? (
                  eventFeedback.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted">{review.date}</span>
                      </div>
                      <p className="text-muted">{review.comment}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-muted mb-2">Price per ticket</p>
                <p className="text-4xl font-bold text-primary">${event.price}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted mb-2">Organized by</p>
                <p className="font-semibold">{event.organizerName}</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setShowBuyModal(true)}
                  disabled={event.capacity - event.ticketsSold === 0}
                  className="w-full"
                >
                  {event.capacity - event.ticketsSold === 0 ? 'Sold Out' : 'Buy Ticket'}
                </Button>
                <Button
                  onClick={() => toggleWishlist(event.id)}
                  variant={isWishlisted ? 'default' : 'outline'}
                  className="w-full gap-2"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save Event'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Buy Ticket Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted">Event</span>
                <span className="font-semibold">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Price</span>
                <span className="font-semibold">${event.price}</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary text-lg">${event.price}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Button onClick={handleBuyTicket} className="w-full">
                Complete Purchase
              </Button>
              <Button onClick={() => setShowBuyModal(false)} variant="outline" className="w-full">
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
