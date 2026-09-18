'use client';

import * as React from 'react';
import { adminCategories } from '@/data/mock/admin/products';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, ChevronRight, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const [search, setSearch] = React.useState('');
  const filtered = adminCategories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  const rootCategories = filtered.filter((c) => !c.parentId);
  const getChildren = (parentId: string) => filtered.filter((c) => c.parentId === parentId);

  return (
    <div className="space-y-6">
      <PageHeader title="Categories" description={`${adminCategories.length} categories`} action={<Button className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>} />

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Category</TableHead><TableHead className="text-right">Products</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {rootCategories.map((cat) => (
              <React.Fragment key={cat.id}>
                <TableRow>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-right">{cat.productCount}</TableCell>
                  <TableCell><StatusBadge status={cat.status} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => toast.success('Edit dialog')}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => toast.success('Deleted')}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
                {getChildren(cat.id).map((child) => (
                  <TableRow key={child.id} className="bg-muted/30">
                    <TableCell className="pl-8 font-normal text-muted-foreground"><ChevronRight className="mr-1 inline h-3 w-3" />{child.name}</TableCell>
                    <TableCell className="text-right">{child.productCount}</TableCell>
                    <TableCell><StatusBadge status={child.status} /></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => toast.success('Edit dialog')}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => toast.success('Deleted')}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
