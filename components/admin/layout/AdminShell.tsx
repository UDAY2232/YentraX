'use client';

import * as React from 'react';
import { useAdminAuth } from '@/store/adminAuthStore';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminLogin } from '@/components/admin/layout/AdminLogin';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="hidden w-64 shrink-0 lg:block">
        <AdminSidebar />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0" >
          <AdminSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
