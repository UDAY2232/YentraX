'use client';

import { adminPromotions } from '@/data/mock/admin/misc';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function PromotionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Promotions" description={`${adminPromotions.length} campaigns`} action={<Button className="gap-2" onClick={() => toast.success('Create dialog')}><Plus className="h-4 w-4" /> Create Promotion</Button>} />
      <div className="grid gap-4 md:grid-cols-2">
        {adminPromotions.map((promo) => (
          <div key={promo.id} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
              <div><h3 className="font-bold">{promo.title}</h3><p className="mt-1 text-sm text-muted-foreground">{promo.description}</p></div>
              <StatusBadge status={promo.status} />
            </div>
            <div className="flex items-center gap-4 border-t pt-3 text-sm">
              <div><span className="text-muted-foreground">Start: </span>{promo.startDate}</div>
              <div><span className="text-muted-foreground">End: </span>{promo.endDate}</div>
              <div className="ml-auto"><span className="text-muted-foreground">Discount: </span><span className="font-bold text-primary">{promo.discount}%</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
