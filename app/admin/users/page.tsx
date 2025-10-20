'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowLeft } from 'lucide-react';

export default function UsersPage() {
  const router = useRouter();
  const { currentUser } = useStore();

  if (!currentUser || currentUser.role !== 'admin') {
    router.push('/login');
    return null;
  }

  // Mock user data
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'attendee', joinDate: '2025-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'organizer', joinDate: '2025-01-10' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'attendee', joinDate: '2025-01-20' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'organizer', joinDate: '2025-01-05' },
  ];

  return (
    <div className="min-h-screen bg-muted-light">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="container py-12">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">User Management</h1>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted-light border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Join Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted-light transition">
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3 text-muted">{user.email}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === 'admin' ? 'bg-primary text-background' :
                        user.role === 'organizer' ? 'bg-accent text-background' :
                        'bg-muted-light text-foreground'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-muted">{user.joinDate}</td>
                    <td className="px-6 py-3">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
