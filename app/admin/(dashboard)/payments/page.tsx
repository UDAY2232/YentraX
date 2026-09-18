'use client';

import { adminPayments } from '@/data/mock/admin/orders';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as React from 'react';

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = React.useState('all');
  const filtered = adminPayments.filter((p) => statusFilter === 'all' || p.status === statusFilter);

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description={`${filtered.length} transactions`} action={
        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="failed">Failed</SelectItem><SelectItem value="refunded">Refunded</SelectItem><SelectItem value="partially_refunded">Partially Refunded</SelectItem></SelectContent></Select>
      } />
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Transaction ID</TableHead><TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Provider</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell className="font-medium">{p.orderId}</TableCell>
                <TableCell>{p.customer}</TableCell>
                <TableCell className="text-right font-medium">₹{p.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell>{p.provider}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
                <TableCell className="text-muted-foreground">{p.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
