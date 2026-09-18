'use client';

import * as React from 'react';
import { AdminAuthProvider } from '@/store/adminAuthStore';
import { AdminShell } from '@/components/admin/layout/AdminShell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
