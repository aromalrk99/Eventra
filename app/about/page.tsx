'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AboutPage() {
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
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-16">
        <h1 className="text-4xl font-bold mb-8">About Eventra</h1>

        <div className="max-w-3xl space-y-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted leading-relaxed">
              Eventra is dedicated to revolutionizing the way events are created, managed, and experienced. We believe that every event, whether it's a small workshop or a large conference, deserves a platform that makes organization effortless and attendance memorable.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">What We Do</h2>
            <p className="text-muted leading-relaxed mb-4">
              Eventra provides a comprehensive event management solution that connects organizers with attendees. Our platform enables:
            </p>
            <ul className="space-y-2 text-muted">
              <li>✓ Easy event creation and management</li>
              <li>✓ Seamless ticket purchasing and management</li>
              <li>✓ Real-time analytics and insights</li>
              <li>✓ Community engagement through reviews and feedback</li>
              <li>✓ Secure payment processing</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Simplicity</h3>
                <p className="text-muted text-sm">We make event management simple and accessible to everyone.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Reliability</h3>
                <p className="text-muted text-sm">Our platform is built to be dependable and secure.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Community</h3>
                <p className="text-muted text-sm">We foster connections between organizers and attendees.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Innovation</h3>
                <p className="text-muted text-sm">We continuously improve to meet evolving needs.</p>
              </div>
            </div>
          </Card>

          <div className="text-center pt-8">
            <Link href="/browse">
              <Button size="lg">Start Exploring Events</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
