'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { Search } from 'lucide-react';

export default function BrowsePage() {
  const { events } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Music', 'Business', 'Art', 'Sports'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/browse" className="text-foreground hover:text-primary transition font-semibold">
              Browse Events
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Browse Events</h1>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-primary text-background'
                  : 'bg-muted-light text-foreground hover:bg-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-sm text-accent font-semibold mb-2">
                    {event.category}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-muted mb-2">{event.date} at {event.time}</p>
                  <p className="text-sm text-muted mb-4">{event.venue}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-primary">${event.price}</span>
                    <span className="text-sm text-muted">
                      {event.capacity - event.ticketsSold} seats
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
