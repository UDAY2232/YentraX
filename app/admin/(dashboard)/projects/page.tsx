'use client';

import { adminProjects } from '@/data/mock/admin/misc';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import * as React from 'react';

export default function AdminProjectsPage() {
  const [search, setSearch] = React.useState('');
  const filtered = adminProjects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Projects" description={`${adminProjects.length} projects`} action={<Button className="gap-2" onClick={() => toast.success('Create dialog')}><Plus className="h-4 w-4" /> Add Project</Button>} />
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead className="w-16">Image</TableHead><TableHead>Title</TableHead><TableHead>Difficulty</TableHead><TableHead className="text-right">Components</TableHead><TableHead>Time</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell><div className="h-10 w-14 overflow-hidden rounded border bg-muted">{p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover" /> : null}</div></TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.difficulty}</TableCell>
                <TableCell className="text-right">{p.components}</TableCell>
                <TableCell className="text-muted-foreground">{p.estimatedTime}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
                <TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => toast.success('Edit')}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => toast.success('Deleted')}><Trash2 className="h-4 w-4" /></Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
