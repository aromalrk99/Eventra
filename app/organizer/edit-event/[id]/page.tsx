'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { currentUser, events, updateEvent, deleteEvent } = useStore();
  const event = events.find((e) => e.id === params.id);
  const [formData, setFormData] = useState(event || {});

  if (!currentUser || currentUser.role !== 'organizer') {
    router.push('/login');
    return null;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/organizer/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(params.id, formData);
    router.push('/organizer/dashboard');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(params.id);
      router.push('/organizer/dashboard');
    }
  };

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

        <h1 className="text-3xl font-bold mb-8">Edit Event</h1>

        <Card className="max-w-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={(formData as any).title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={(formData as any).description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={(formData as any).date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={(formData as any).time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue</label>
              <input
                type="text"
                name="venue"
                value={(formData as any).venue}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={(formData as any).category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Technology</option>
                  <option>Music</option>
                  <option>Business</option>
                  <option>Art</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={(formData as any).price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={(formData as any).capacity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                variant="destructive"
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
