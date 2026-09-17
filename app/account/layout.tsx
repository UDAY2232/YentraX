'use client';

import * as React from 'react';
import { useAuth } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Package, MapPin, Settings, LogOut, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, login, logout } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Welcome to MakerHub</h1>
            <p className="mt-2 text-muted-foreground">Sign in to manage your orders, wishlist and account.</p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            // Mock login
            login({ id: 'u1', name: 'Student Maker', email: 'maker@example.com' }, 'mock-token');
          }}>
            <div className="space-y-2">
              <Input type="email" placeholder="Email address" required defaultValue="maker@example.com" />
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
            <Button type="button" variant="outline" className="w-full" size="lg">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/account', label: 'Dashboard', icon: User },
    { href: '/account/profile', label: 'My Profile', icon: User },
    { href: '/account/orders', label: 'My Orders', icon: Package },
    { href: '/wishlist', label: 'My Wishlist', icon: Heart },
    { href: '/account/addresses', label: 'Saved Addresses', icon: MapPin },
    { href: '/account/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">My Account</h1>
        <p className="mt-2 text-lg text-muted-foreground">Welcome back, {user.name}!</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 md:w-64">
          <nav className="flex flex-col gap-1 rounded-lg border bg-card p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  pathname === item.href ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => logout()}
              className="mt-4 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
