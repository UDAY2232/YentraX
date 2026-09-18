'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-94821', date: 'Oct 17, 2024', status: 'Delivered', total: 1249, items: 3 },
  { id: 'ORD-94822', date: 'Oct 15, 2024', status: 'Shipped', total: 2499, items: 1 },
  { id: 'ORD-94823', date: 'Oct 12, 2024', status: 'Processing', total: 6499, items: 2 },
  { id: 'ORD-94824', date: 'Oct 10, 2024', status: 'Delivered', total: 449, items: 4 },
  { id: 'ORD-94825', date: 'Oct 8, 2024', status: 'Cancelled', total: 899, items: 1 },
];

const statusStyles: Record<string, string> = {
  Delivered: 'bg-success/20 text-success',
  Shipped: 'bg-primary/20 text-primary',
  Processing: 'bg-warning/20 text-warning',
  Cancelled: 'bg-destructive/20 text-destructive',
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">My Orders</h2>
        <p className="mt-1 text-sm text-muted-foreground">Track and manage your orders.</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">#{order.id}</span>
                  <Badge className={statusStyles[order.status]} variant="secondary">{order.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Placed on {order.date}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="text-right">
                <div className="font-bold">₹{order.total.toLocaleString('en-IN')}</div>
                <p className="text-sm text-muted-foreground">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
