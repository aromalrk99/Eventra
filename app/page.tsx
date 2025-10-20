'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Calendar, Users, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Home() {
  const { events } = useStore();
  const featuredEvents = events.slice(0, 3);

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
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Discover & Manage Events Effortlessly
            </h1>
            <p className="text-xl text-muted mb-8">
              Eventra is your all-in-one platform for creating, discovering, and managing events. Whether you're an organizer or attendee, we've got you covered.
            </p>
            <div className="flex gap-4">
              <Link href="/browse">
                <Button size="lg" className="gap-2">
                  Browse Events <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/signup?role=organizer">
                <Button size="lg" variant="outline">
                  Create Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Eventra?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Calendar className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Event Creation</h3>
              <p className="text-muted">Create and manage events in minutes with our intuitive interface.</p>
            </Card>
            <Card className="p-6">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-muted">Connect with thousands of event organizers and attendees.</p>
            </Card>
            <Card className="p-6">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-muted">Track ticket sales and attendee engagement in real-time.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-muted-light">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12">Featured Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Link key={event.id} href={`/event/${event.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="text-sm text-accent font-semibold mb-2">
                      {event.category}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted mb-4">{event.venue}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">${event.price}</span>
                      <span className="text-sm text-muted">
                        {event.capacity - event.ticketsSold} seats left
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/browse">
              <Button size="lg" variant="outline">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Eventra</h4>
              <p className="text-sm opacity-75">Smart event management platform</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link href="/browse" className="hover:opacity-100">Browse Events</Link></li>
                <li><Link href="/about" className="hover:opacity-100">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link href="/contact" className="hover:opacity-100">Contact</Link></li>
                <li><a href="#" className="hover:opacity-100">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100">Privacy</a></li>
                <li><a href="#" className="hover:opacity-100">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2025 Eventra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
