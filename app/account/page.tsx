'use client';

import { useAuth } from '@/store/authStore';
import { Package, Heart, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function AccountDashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold">3</h3>
          <p className="text-sm text-muted-foreground">Active Orders</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-sm text-muted-foreground">Wishlist Items</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold">2</h3>
          <p className="text-sm text-muted-foreground">Saved Addresses</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold">1</h3>
          <p className="text-sm text-muted-foreground">Payment Method</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">#ORD-9482{i}</span>
                  <span className="rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
                    Delivered
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Placed on Oct {15 + i}, 2024</p>
              </div>
              <div className="text-right">
                <div className="font-bold">₹1,249</div>
                <p className="text-sm text-muted-foreground">3 items</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
