'use client';

import * as React from 'react';
import Link from 'next/link';
import { Cpu, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/store/adminAuthStore';
import { toast } from 'sonner';

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = React.useState('admin@makerhub.com');
  const [password, setPassword] = React.useState('admin123');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (!success) toast.error('Invalid credentials. Try admin@makerhub.com / admin123');
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Cpu className="h-7 w-7" />
            </div>
            <span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-jakarta)' }}>MakerHub</span>
          </Link>
          <p className="mt-2 text-sm text-slate-400">Admin Control Panel</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-8">
          <h1 className="mb-1 text-xl font-bold text-white">Sign In</h1>
          <p className="mb-6 text-sm text-slate-400">Enter your admin credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-slate-700 bg-slate-900 pl-9 text-white placeholder:text-slate-600" placeholder="admin@makerhub.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="border-slate-700 bg-slate-900 pl-9 pr-9 text-white placeholder:text-slate-600" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-900" defaultChecked /> Remember me
              </label>
              <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-slate-700 bg-slate-900/50 p-3">
            <p className="text-xs text-slate-500">Demo credentials: admin@makerhub.com / admin123</p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">Authorized personnel only. All actions are logged.</p>
      </div>
    </div>
  );
}
