'use client';

import * as React from 'react';
import { adminReviews } from '@/data/mock/admin/misc';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, Check, X, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reviews" description={`${adminReviews.length} reviews`} />
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Product</TableHead><TableHead>Rating</TableHead><TableHead>Comment</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {adminReviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.customer}</TableCell>
                <TableCell>{r.product}</TableCell>
                <TableCell><div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{r.rating}</div></TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">{r.comment}</TableCell>
                <TableCell className="text-muted-foreground">{r.date}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {r.status === 'pending' && <>
                      <Button variant="ghost" size="icon" className="text-success" onClick={() => toast.success('Review approved')}><Check className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => toast.success('Review rejected')}><X className="h-4 w-4" /></Button>
                    </>}
                    {r.status === 'approved' && <Button variant="ghost" size="icon" onClick={() => toast.success('Review hidden')}><EyeOff className="h-4 w-4" /></Button>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
