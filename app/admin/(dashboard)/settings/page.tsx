'use client';

import * as React from 'react';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function SettingsPage() {
  const handleSave = () => toast.success('Settings saved');

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage store configuration" action={<Button onClick={handleSave}>Save Changes</Button>} />
      <Tabs defaultValue="general">
        <TabsList className="flex w-full flex-wrap gap-1">
          <TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="store">Store</TabsTrigger><TabsTrigger value="payments">Payments</TabsTrigger><TabsTrigger value="shipping">Shipping</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="email">Email</TabsTrigger><TabsTrigger value="seo">SEO</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="site-name">Site Name</Label><Input id="site-name" defaultValue="MakerHub" /></div>
            <div className="space-y-2"><Label htmlFor="support-email">Support Email</Label><Input id="support-email" defaultValue="support@makerhub.com" /></div>
            <div className="space-y-2"><Label htmlFor="phone">Contact Phone</Label><Input id="phone" defaultValue="+91 80 4567 8900" /></div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="inr"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="inr">INR (₹)</SelectItem><SelectItem value="usd">USD ($)</SelectItem></SelectContent></Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="store" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="store-name">Legal Store Name</Label><Input id="store-name" defaultValue="MakerHub Technologies Pvt. Ltd." /></div>
            <div className="space-y-2"><Label htmlFor="gst">GST Number</Label><Input id="gst" defaultValue="29ABCDE1234F1Z5" /></div>
            <div className="space-y-2"><Label htmlFor="address">Business Address</Label><Textarea id="address" rows={2} defaultValue="Tech Park, Bengaluru, Karnataka 560001" /></div>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between"><div><Label>UPI Payments</Label><p className="text-xs text-muted-foreground">Accept UPI payments</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><Label>Credit/Debit Cards</Label><p className="text-xs text-muted-foreground">Accept card payments</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><Label>Cash on Delivery</Label><p className="text-xs text-muted-foreground">Allow COD orders</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><Label>Paytm</Label><p className="text-xs text-muted-foreground">Accept Paytm wallet</p></div><Switch /></div>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="free-ship">Free Shipping Threshold (₹)</Label><Input id="free-ship" type="number" defaultValue="499" /></div>
            <div className="space-y-2"><Label htmlFor="flat-rate">Flat Shipping Rate (₹)</Label><Input id="flat-rate" type="number" defaultValue="50" /></div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between"><div><Label>New Order Notifications</Label><p className="text-xs text-muted-foreground">Email admin on new orders</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><Label>Low Stock Alerts</Label><p className="text-xs text-muted-foreground">Notify when stock is low</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><Label>Payment Failure Alerts</Label><p className="text-xs text-muted-foreground">Notify on payment failures</p></div><Switch defaultChecked /></div>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="smtp-host">SMTP Host</Label><Input id="smtp-host" placeholder="smtp.gmail.com" /></div>
            <div className="space-y-2"><Label htmlFor="smtp-port">SMTP Port</Label><Input id="smtp-port" type="number" placeholder="587" /></div>
            <div className="space-y-2"><Label htmlFor="smtp-user">SMTP Username</Label><Input id="smtp-user" placeholder="noreply@makerhub.com" /></div>
          </div>
          <p className="text-xs text-muted-foreground">SMTP passwords are configured securely in environment settings and are not exposed here.</p>
        </TabsContent>

        <TabsContent value="seo" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-2"><Label htmlFor="meta-title">Default Meta Title</Label><Input id="meta-title" defaultValue="MakerHub — Robotics, Electronics & STEM Store" /></div>
          <div className="space-y-2"><Label htmlFor="meta-desc">Default Meta Description</Label><Textarea id="meta-desc" rows={3} defaultValue="Shop robotics kits, development boards, sensors, IoT modules, 3D printers and STEM supplies." /></div>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between"><div><Label>Two-Factor Authentication</Label><p className="text-xs text-muted-foreground">Require 2FA for admin login</p></div><Switch /></div>
            <div className="flex items-center justify-between"><div><Label>Session Timeout</Label><p className="text-xs text-muted-foreground">Auto-logout after inactivity</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><Label>IP Whitelist</Label><p className="text-xs text-muted-foreground">Restrict admin access to specific IPs</p></div><Switch /></div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
