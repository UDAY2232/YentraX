'use client';

import * as React from 'react';
import Link from 'next/link';
import { adminOrders } from '@/data/mock/admin/orders';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CheckCircle2, Circle, Package, MapPin, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = adminOrders.find((o) => o.id === params.id);
  const [newStatus, setNewStatus] = React.useState(order?.fulfillmentStatus ?? 'pending');

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHeader title="Order Not Found" action={<Button variant="outline" asChild><Link href="/admin/orders"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>} />
        <p className="text-muted-foreground">This order could not be found.</p>
      </div>
    );
  }

  const handleStatusUpdate = () => {
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={order.id} description={`Placed by ${order.customerName} on ${order.date}`} action={<Button variant="outline" asChild><Link href="/admin/orders"><ArrowLeft className="h-4 w-4" /> Back to Orders</Link></Button>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Order Items */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold"><Package className="h-5 w-5" /> Order Items</h2>
            <Table>
              <TableHeader><TableRow><TableHead>Product</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Price</TableHead><TableHead className="text-right">Subtotal</TableHead></TableRow></TableHeader>
              <TableBody>
                {order.items_list.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.qty}</TableCell>
                    <TableCell className="text-right">₹{item.price.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right font-medium">₹{(item.price * item.qty).toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-success">-₹{order.discount.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>₹{order.tax.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span></div>
              <div className="flex justify-between border-t pt-2 text-base font-bold"><span>Total</span><span>₹{order.total.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Order Timeline</h2>
            <div className="space-y-3">
              {order.timeline.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  {step.done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                  <div className={cn(step.done ? '' : 'opacity-50')}>
                    <p className="text-sm font-medium">{step.status}</p>
                    {step.date && <p className="text-xs text-muted-foreground">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Customer & Addresses */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Customer</h2>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
            <div className="mt-4 space-y-3 border-t pt-4">
              <div><div className="flex items-center gap-1 text-sm font-medium"><MapPin className="h-3.5 w-3.5" /> Shipping Address</div><p className="mt-1 text-sm text-muted-foreground">Tech Hostel, MG Road<br />Bengaluru, Karnataka - 560001</p></div>
              <div><div className="flex items-center gap-1 text-sm font-medium"><CreditCard className="h-3.5 w-3.5" /> Billing Address</div><p className="mt-1 text-sm text-muted-foreground">Same as shipping</p></div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Payment</h2>
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Status</span><StatusBadge status={order.paymentStatus} /></div>
            {order.trackingId && <div className="mt-2 flex items-center justify-between"><span className="text-sm text-muted-foreground">Tracking ID</span><span className="font-mono text-sm">{order.trackingId}</span></div>}
          </div>

          {/* Update Status */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Update Fulfillment</h2>
            <Select value={newStatus} onValueChange={(v) => setNewStatus(v as typeof newStatus)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem><SelectItem value="processing">Processing</SelectItem><SelectItem value="shipped">Shipped</SelectItem><SelectItem value="delivered">Delivered</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button className="mt-3 w-full" onClick={handleStatusUpdate}>Update Status</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
