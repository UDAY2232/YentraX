'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Bell, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdminAuth } from '@/store/adminAuthStore';
import { adminDashboardData } from '@/data/mock/admin/dashboard';
import { cn } from '@/lib/utils';

const routeLabels: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/new': 'New Product',
  '/admin/categories': 'Categories',
  '/admin/brands': 'Brands',
  '/admin/inventory': 'Inventory',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/payments': 'Payments',
  '/admin/coupons': 'Coupons',
  '/admin/promotions': 'Promotions',
  '/admin/reviews': 'Reviews',
  '/admin/projects': 'Projects',
  '/admin/tutorials': 'Tutorials',
  '/admin/homepage': 'Homepage',
  '/admin/analytics': 'Analytics',
  '/admin/support': 'Support',
  '/admin/users': 'Users',
  '/admin/roles': 'Roles',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/settings': 'Settings',
};

export function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const notifications = adminDashboardData.notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const label = routeLabels[path] || (path.match(/\/admin\/products\/([^/]+)/) ? 'Edit Product' : path.match(/\/admin\/orders\/([^/]+)/) ? 'Order Details' : path.match(/\/admin\/customers\/([^/]+)/) ? 'Customer Details' : seg.charAt(0).toUpperCase() + seg.slice(1));
    return { path, label };
  });

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Toggle sidebar">
        <Menu className="h-5 w-5" />
      </Button>

      <nav className="hidden items-center gap-1.5 text-sm md:flex">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.path}>
            {i > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            {i < breadcrumbs.length - 1 ? (
              <Link href={crumb.path} className="text-muted-foreground hover:text-foreground">{crumb.label}</Link>
            ) : (
              <span className="font-medium text-foreground">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products, orders, customers..." className="h-9 w-64 border-muted bg-muted/40 pl-9" />
        </div>

        <div className="relative">
          <Button variant="ghost" size="icon" className="relative" onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">{unreadCount}</span>
            )}
          </Button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border bg-popover shadow-lg">
              <div className="flex items-center justify-between border-b p-3">
                <span className="text-sm font-semibold">Notifications</span>
                <Badge variant="secondary">{unreadCount} new</Badge>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={cn('flex gap-3 border-b p-3 last:border-0', !n.read && 'bg-primary/5')}>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.message}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted" onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {user?.name?.charAt(0) ?? 'A'}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-tight">{user?.name ?? 'Admin'}</p>
              <p className="text-[10px] text-muted-foreground">{user?.role}</p>
            </div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border bg-popover shadow-lg">
              <Link href="/admin/settings" className="block rounded-t-lg px-4 py-2.5 text-sm hover:bg-muted" onClick={() => setProfileOpen(false)}>Settings</Link>
              <button className="flex w-full items-center gap-2 border-t px-4 py-2.5 text-sm text-destructive hover:bg-muted" onClick={() => { logout(); }}>
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
