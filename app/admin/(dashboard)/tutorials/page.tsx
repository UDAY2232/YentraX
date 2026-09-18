'use client';

import { adminTutorials } from '@/data/mock/admin/misc';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import * as React from 'react';

export default function TutorialsPage() {
  const [search, setSearch] = React.useState('');
  const filtered = adminTutorials.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Tutorials" description={`${adminTutorials.length} tutorials`} action={<Button className="gap-2" onClick={() => toast.success('Create dialog')}><Plus className="h-4 w-4" /> Add Tutorial</Button>} />
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search tutorials..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Level</TableHead><TableHead>Duration</TableHead><TableHead className="text-right">Views</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.title}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.level}</TableCell>
                <TableCell className="text-muted-foreground">{t.duration}</TableCell>
                <TableCell className="text-right">{t.views.toLocaleString('en-IN')}</TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
                <TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => toast.success('Edit')}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => toast.success('Deleted')}><Trash2 className="h-4 w-4" /></Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
