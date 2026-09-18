'use client';

import { adminAuditLogs } from '@/data/mock/admin/misc';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import * as React from 'react';

export default function AuditLogsPage() {
  const [search, setSearch] = React.useState('');
  const [actionFilter, setActionFilter] = React.useState('all');

  const filtered = adminAuditLogs.filter((l) => {
    if (search && !l.user.toLowerCase().includes(search.toLowerCase()) && !l.action.toLowerCase().includes(search.toLowerCase())) return false;
    if (actionFilter !== 'all' && !l.action.toLowerCase().includes(actionFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" description={`${filtered.length} entries`} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by user or action..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Action" /></SelectTrigger><SelectContent><SelectItem value="all">All Actions</SelectItem><SelectItem value="created">Created</SelectItem><SelectItem value="updated">Updated</SelectItem><SelectItem value="deleted">Deleted</SelectItem><SelectItem value="adjusted">Adjusted</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent></Select>
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Resource</TableHead><TableHead>Resource ID</TableHead><TableHead>Result</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{l.timestamp}</TableCell>
                <TableCell className="font-medium">{l.user}</TableCell>
                <TableCell>{l.action}</TableCell>
                <TableCell>{l.resource}</TableCell>
                <TableCell className="font-mono text-xs">{l.resourceId}</TableCell>
                <TableCell><StatusBadge status={l.result} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
