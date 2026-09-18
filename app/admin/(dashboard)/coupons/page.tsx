'use client';

import * as React from 'react';
import { adminCoupons } from '@/data/mock/admin/misc';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CouponsPage() {
  const [search, setSearch] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const filtered = adminCoupons.filter((c) => c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Coupons" description={`${adminCoupons.length} coupons`} action={<Button className="gap-2" onClick={() => setShowForm(true)}><Plus className="h-4 w-4" /> Create Coupon</Button>} />
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search coupons..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Value</TableHead><TableHead className="text-right">Min Order</TableHead><TableHead className="text-right">Used/Limit</TableHead><TableHead>End Date</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono font-bold">{c.code}</TableCell>
                <TableCell>{c.type === 'percentage' ? 'Percentage' : 'Fixed'}</TableCell>
                <TableCell className="text-right">{c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}</TableCell>
                <TableCell className="text-right">₹{c.minOrder}</TableCell>
                <TableCell className="text-right">{c.usedCount}/{c.usageLimit}</TableCell>
                <TableCell className="text-muted-foreground">{c.endDate}</TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
                <TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => toast.success('Edit')}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => toast.success('Deleted')}><Trash2 className="h-4 w-4" /></Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Create Coupon</DialogTitle><DialogDescription>Configure a new discount coupon.</DialogDescription></DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-2"><Label htmlFor="code">Coupon Code</Label><Input id="code" placeholder="MAKER10" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Discount Type</Label><Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="percentage">Percentage</SelectItem><SelectItem value="fixed">Fixed Amount</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="value">Value</Label><Input id="value" type="number" placeholder="10" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="min">Min Order (₹)</Label><Input id="min" type="number" placeholder="500" /></div>
              <div className="space-y-2"><Label htmlFor="max">Max Discount (₹)</Label><Input id="max" type="number" placeholder="500" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="start">Start Date</Label><Input id="start" type="date" /></div>
              <div className="space-y-2"><Label htmlFor="end">End Date</Label><Input id="end" type="date" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="limit">Usage Limit</Label><Input id="limit" type="number" placeholder="1000" /></div>
              <div className="space-y-2"><Label htmlFor="per">Per User Limit</Label><Input id="per" type="number" placeholder="1" /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={() => { toast.success('Coupon created'); setShowForm(false); }}>Create Coupon</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
