'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowLeft } from 'lucide-react';

export default function FeedbackPage() {
  const router = useRouter();
  const { currentUser, tickets, events, addFeedback } = useStore();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!currentUser || currentUser.role !== 'attendee') {
    router.push('/login');
    return null;
  }

  const myTickets = tickets.filter((t) => t.userId === currentUser.id);
  const attendedEvents = myTickets.map((t) => events.find((e) => e.id === t.eventId)).filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    addFeedback({
      id: `feedback-${Date.now()}`,
      eventId: selectedEvent,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    });

    setSelectedEvent('');
    setRating(5);
    setComment('');
    alert('Thank you for your feedback!');
  };

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

        <h1 className="text-3xl font-bold mb-8">Leave Feedback</h1>

        <Card className="max-w-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Event</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Choose an event...</option>
                {attendedEvents.map((event) => (
                  <option key={event?.id} value={event?.id}>
                    {event?.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Feedback</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
