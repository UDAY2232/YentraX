'use client';

import * as React from 'react';
import { adminInventory } from '@/data/mock/admin/orders';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import type { AdminInventoryItem } from '@/types/admin';

export default function InventoryPage() {
  const [search, setSearch] = React.useState('');
  const [adjustTarget, setAdjustTarget] = React.useState<AdminInventoryItem | null>(null);
  const [adjustAmount, setAdjustAmount] = React.useState(0);
  const [adjustReason, setAdjustReason] = React.useState('');

  const filtered = adminInventory.filter((i) => i.productName.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase()));
  const lowStock = filtered.filter((i) => i.available <= i.threshold);

  const getStockStatus = (item: AdminInventoryItem): string => {
    if (item.available === 0) return 'out_of_stock';
    if (item.available <= item.threshold) return 'low_stock';
    return 'in_stock';
  };

  const handleAdjust = () => {
    toast.success(`Stock adjusted by ${adjustAmount > 0 ? '+' : ''}${adjustAmount} for ${adjustTarget?.productName}`);
    setAdjustTarget(null); setAdjustAmount(0); setAdjustReason('');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" description={`${adminInventory.length} SKUs across 3 warehouses`} />

      {lowStock.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3 text-sm">
          <span className="font-medium text-warning">{lowStock.length} items low on stock</span>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search by product or SKU..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead><TableHead>Product</TableHead><TableHead>Warehouse</TableHead>
              <TableHead className="text-right">Available</TableHead><TableHead className="text-right">Reserved</TableHead><TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Threshold</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.sku}>
                <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                <TableCell className="font-medium">{item.productName}</TableCell>
                <TableCell className="text-muted-foreground">{item.warehouse}</TableCell>
                <TableCell className="text-right">{item.available}</TableCell>
                <TableCell className="text-right text-muted-foreground">{item.reserved}</TableCell>
                <TableCell className="text-right">{item.total}</TableCell>
                <TableCell className="text-right text-muted-foreground">{item.threshold}</TableCell>
                <TableCell><StatusBadge status={getStockStatus(item)} /></TableCell>
                <TableCell className="text-right"><Button variant="outline" size="sm" onClick={() => setAdjustTarget(item)}>Adjust</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!adjustTarget} onOpenChange={(open) => !open && setAdjustTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>{adjustTarget?.productName} ({adjustTarget?.sku})</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3 text-sm"><span className="text-muted-foreground">Current Stock: </span><span className="font-bold">{adjustTarget?.available}</span></div>
            <div className="space-y-2">
              <Label>Adjustment Amount</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setAdjustAmount((a) => a - 1)}><Minus className="h-4 w-4" /></Button>
                <Input type="number" value={adjustAmount} onChange={(e) => setAdjustAmount(Number(e.target.value))} className="text-center" />
                <Button variant="outline" size="icon" onClick={() => setAdjustAmount((a) => a + 1)}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason</Label>
              <Select value={adjustReason} onValueChange={setAdjustReason}>
                <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="restock">Restock</SelectItem><SelectItem value="damage">Damage/Loss</SelectItem><SelectItem value="correction">Correction</SelectItem><SelectItem value="return">Customer Return</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustTarget(null)}>Cancel</Button>
            <Button onClick={handleAdjust}>Confirm Adjustment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
