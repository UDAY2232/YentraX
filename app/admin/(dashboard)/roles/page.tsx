'use client';

import * as React from 'react';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import type { AdminRole } from '@/types/admin';

const roles: AdminRole[] = ['ADMIN', 'PRODUCT_MANAGER', 'INVENTORY_MANAGER', 'ORDER_MANAGER', 'CONTENT_MANAGER', 'SUPPORT_AGENT'];

const permissions = [
  { module: 'Products', roles: { ADMIN: true, PRODUCT_MANAGER: true, INVENTORY_MANAGER: true, ORDER_MANAGER: false, CONTENT_MANAGER: false, SUPPORT_AGENT: false } },
  { module: 'Inventory', roles: { ADMIN: true, PRODUCT_MANAGER: false, INVENTORY_MANAGER: true, ORDER_MANAGER: false, CONTENT_MANAGER: false, SUPPORT_AGENT: false } },
  { module: 'Orders', roles: { ADMIN: true, PRODUCT_MANAGER: false, INVENTORY_MANAGER: false, ORDER_MANAGER: true, CONTENT_MANAGER: false, SUPPORT_AGENT: false } },
  { module: 'Customers', roles: { ADMIN: true, PRODUCT_MANAGER: false, INVENTORY_MANAGER: false, ORDER_MANAGER: true, CONTENT_MANAGER: false, SUPPORT_AGENT: true } },
  { module: 'Coupons', roles: { ADMIN: true, PRODUCT_MANAGER: true, INVENTORY_MANAGER: false, ORDER_MANAGER: false, CONTENT_MANAGER: false, SUPPORT_AGENT: false } },
  { module: 'Content', roles: { ADMIN: true, PRODUCT_MANAGER: false, INVENTORY_MANAGER: false, ORDER_MANAGER: false, CONTENT_MANAGER: true, SUPPORT_AGENT: false } },
  { module: 'Analytics', roles: { ADMIN: true, PRODUCT_MANAGER: true, INVENTORY_MANAGER: false, ORDER_MANAGER: true, CONTENT_MANAGER: false, SUPPORT_AGENT: false } },
  { module: 'Support', roles: { ADMIN: true, PRODUCT_MANAGER: false, INVENTORY_MANAGER: false, ORDER_MANAGER: false, CONTENT_MANAGER: false, SUPPORT_AGENT: true } },
  { module: 'Users', roles: { ADMIN: true, PRODUCT_MANAGER: false, INVENTORY_MANAGER: false, ORDER_MANAGER: false, CONTENT_MANAGER: false, SUPPORT_AGENT: false } },
  { module: 'Settings', roles: { ADMIN: true, PRODUCT_MANAGER: false, INVENTORY_MANAGER: false, ORDER_MANAGER: false, CONTENT_MANAGER: false, SUPPORT_AGENT: false } },
];

export default function RolesPage() {
  const [permState, setPermState] = React.useState(permissions);

  const toggle = (module: string, role: AdminRole) => {
    setPermState(permState.map((p) => p.module === module ? { ...p, roles: { ...p.roles, [role]: !p.roles[role] } } : p));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Roles & Permissions" description="Manage role-based access control" action={<Button onClick={() => toast.success('Permissions saved')}>Save Changes</Button>} />
      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Module</TableHead>
              {roles.map((r) => <TableHead key={r} className="text-center">{r.replace('_', ' ').split(' ')[0]}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {permState.map((p) => (
              <TableRow key={p.module}>
                <TableCell className="font-medium">{p.module}</TableCell>
                {roles.map((r) => (
                  <TableCell key={r} className="text-center">
                    <Switch checked={p.roles[r]} onCheckedChange={() => toggle(p.module, r)} disabled={r === 'ADMIN'} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
