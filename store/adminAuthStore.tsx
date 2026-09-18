'use client';

import * as React from 'react';
import type { AdminUser, AdminRole } from '@/types/admin';

const STORAGE_KEY = 'makerhub-admin-auth';

interface AdminAuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (allowedRoles: AdminRole[]) => boolean;
}

const AdminAuthContext = React.createContext<AdminAuthContextValue | null>(null);

const ADMIN_USERS: Record<string, AdminUser> = {
  'admin@makerhub.com': { id: 'au1', name: 'Admin User', email: 'admin@makerhub.com', role: 'ADMIN', status: 'active' },
  'pm@makerhub.com': { id: 'au2', name: 'Product Manager', email: 'pm@makerhub.com', role: 'PRODUCT_MANAGER', status: 'active' },
  'inv@makerhub.com': { id: 'au3', name: 'Inventory Manager', email: 'inv@makerhub.com', role: 'INVENTORY_MANAGER', status: 'active' },
  'orders@makerhub.com': { id: 'au4', name: 'Order Manager', email: 'orders@makerhub.com', role: 'ORDER_MANAGER', status: 'active' },
  'content@makerhub.com': { id: 'au5', name: 'Content Manager', email: 'content@makerhub.com', role: 'CONTENT_MANAGER', status: 'active' },
  'support1@makerhub.com': { id: 'au6', name: 'Support Agent 1', email: 'support1@makerhub.com', role: 'SUPPORT_AGENT', status: 'active' },
};

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AdminUser | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, [user, mounted]);

  const login = React.useCallback((email: string, _password: string) => {
    const adminUser = ADMIN_USERS[email.toLowerCase()];
    if (adminUser) {
      setUser(adminUser);
      return true;
    }
    return false;
  }, []);

  const logout = React.useCallback(() => setUser(null), []);

  const hasPermission = React.useCallback((allowedRoles: AdminRole[]) => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    return allowedRoles.includes(user.role);
  }, [user]);

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, hasPermission }}>
      {mounted ? children : null}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = React.useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
