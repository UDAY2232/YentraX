'use client';

import * as React from 'react';
import Link from 'next/link';
import { adminCustomers, adminOrders } from '@/data/mock/admin/orders';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Mail, Phone, ShoppingBag, MapPin } from 'lucide-react';

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = adminCustomers.find((c) => c.id === params.id);
  const customerOrders = adminOrders.filter((o) => o.customerEmail === customer?.email);

  if (!customer) {
    return <div className="space-y-6"><PageHeader title="Customer Not Found" action={<Button variant="outline" asChild><Link href="/admin/customers"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>} /><p className="text-muted-foreground">This customer could not be found.</p></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title={customer.name} description={customer.email} action={<Button variant="outline" asChild><Link href="/admin/customers"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{customer.name.charAt(0)}</div>
              <div><p className="font-bold">{customer.name}</p><StatusBadge status={customer.status} /></div>
            </div>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> {customer.email}</p>
              <p className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {customer.phone}</p>
              <p className="flex items-center gap-2 text-muted-foreground"><ShoppingBag className="h-4 w-4" /> {customer.orders} orders</p>
              <p className="flex items-center gap-2 text-muted-foreground">Joined: {customer.joinedDate}</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold"><MapPin className="h-4 w-4" /> Saved Addresses</h3>
            <p className="text-sm text-muted-foreground">Tech Hostel, MG Road<br />Bengaluru, Karnataka - 560001</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Order History</h2>
            {customerOrders.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <Table>
                <TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Payment</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {customerOrders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">{o.id}</TableCell>
                      <TableCell className="text-muted-foreground">{o.date}</TableCell>
                      <TableCell className="text-right font-medium">₹{o.total.toLocaleString('en-IN')}</TableCell>
                      <TableCell><StatusBadge status={o.paymentStatus} /></TableCell>
                      <TableCell><StatusBadge status={o.fulfillmentStatus} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
