'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function CategoriesPage() {
  const router = useRouter();
  const { currentUser } = useStore();
  const [categories, setCategories] = useState([
    { id: '1', name: 'Technology', description: 'Tech conferences and workshops' },
    { id: '2', name: 'Music', description: 'Concerts and music festivals' },
    { id: '3', name: 'Business', description: 'Business networking events' },
    { id: '4', name: 'Art', description: 'Art exhibitions and shows' },
    { id: '5', name: 'Sports', description: 'Sports events and competitions' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');

  if (!currentUser || currentUser.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          id: `cat-${Date.now()}`,
          name: newCategory,
          description: newDescription,
        },
      ]);
      setNewCategory('');
      setNewDescription('');
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

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

        <h1 className="text-3xl font-bold mb-8">Category Management</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Workshops"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Category description"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-20"
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </form>
          </Card>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Existing Categories</h2>
            <div className="space-y-3">
              {categories.map((cat) => (
                <Card key={cat.id} className="p-4 flex justify-between items-start">
                  <div>
                    <p className="font-bold">{cat.name}</p>
                    <p className="text-sm text-muted">{cat.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-error hover:bg-error/10 p-2 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
