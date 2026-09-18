'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, LayoutDashboard, Package, FolderTree, Tag, Boxes, ShoppingCart, Users, CreditCard, Ticket, Megaphone, Star, Hammer, BookOpen, Home, BarChart3, LifeBuoy, UserCog, ShieldCheck, ScrollText, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/store/adminAuthStore';
import type { AdminRole } from '@/types/admin';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: AdminRole[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: '',
    items: [{ label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Products', href: '/admin/products', icon: Package, roles: ['ADMIN', 'PRODUCT_MANAGER'] },
      { label: 'Categories', href: '/admin/categories', icon: FolderTree, roles: ['ADMIN', 'PRODUCT_MANAGER'] },
      { label: 'Brands', href: '/admin/brands', icon: Tag, roles: ['ADMIN', 'PRODUCT_MANAGER'] },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Inventory', href: '/admin/inventory', icon: Boxes, roles: ['ADMIN', 'INVENTORY_MANAGER'] },
      { label: 'Orders', href: '/admin/orders', icon: ShoppingCart, roles: ['ADMIN', 'ORDER_MANAGER'] },
      { label: 'Customers', href: '/admin/customers', icon: Users, roles: ['ADMIN', 'ORDER_MANAGER'] },
      { label: 'Payments', href: '/admin/payments', icon: CreditCard, roles: ['ADMIN', 'ORDER_MANAGER'] },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { label: 'Coupons', href: '/admin/coupons', icon: Ticket, roles: ['ADMIN', 'PRODUCT_MANAGER'] },
      { label: 'Promotions', href: '/admin/promotions', icon: Megaphone, roles: ['ADMIN', 'PRODUCT_MANAGER'] },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Reviews', href: '/admin/reviews', icon: Star, roles: ['ADMIN', 'CONTENT_MANAGER'] },
      { label: 'Projects', href: '/admin/projects', icon: Hammer, roles: ['ADMIN', 'CONTENT_MANAGER'] },
      { label: 'Tutorials', href: '/admin/tutorials', icon: BookOpen, roles: ['ADMIN', 'CONTENT_MANAGER'] },
      { label: 'Homepage', href: '/admin/homepage', icon: Home, roles: ['ADMIN', 'CONTENT_MANAGER'] },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['ADMIN'] },
      { label: 'Support', href: '/admin/support', icon: LifeBuoy, roles: ['ADMIN', 'SUPPORT_AGENT'] },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Users', href: '/admin/users', icon: UserCog, roles: ['ADMIN'] },
      { label: 'Roles', href: '/admin/roles', icon: ShieldCheck, roles: ['ADMIN'] },
      { label: 'Audit Logs', href: '/admin/audit-logs', icon: ScrollText, roles: ['ADMIN'] },
      { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['ADMIN'] },
    ],
  },
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user, hasPermission } = useAdminAuth();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="flex h-full flex-col bg-slate-900 text-slate-300">
      <Link href="/admin/dashboard" className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Cpu className="h-5 w-5" />
        </div>
        <span className="text-lg font-extrabold text-white" style={{ fontFamily: 'var(--font-jakarta)' }}>MakerHub</span>
        <span className="ml-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-400">ADMIN</span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group, gi) => {
          const visibleItems = group.items.filter((item) => !item.roles || hasPermission(item.roles));
          if (visibleItems.length === 0) return null;
          return (
            <div key={gi} className="mb-4">
              {group.label && (
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">{group.label}</p>
              )}
              <ul className="space-y-0.5">
                {visibleItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-white">
            {user?.name?.charAt(0) ?? 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{user?.name ?? 'Admin'}</p>
            <p className="truncate text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
