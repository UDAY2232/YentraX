'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [smsNotif, setSmsNotif] = React.useState(false);
  const [marketing, setMarketing] = React.useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your notification and privacy preferences.</p>
      </div>

      <form onSubmit={handleSave} className="max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div>
          <h3 className="mb-4 text-sm font-semibold">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Order updates, shipping alerts</p>
              </div>
              <Switch id="email-notif" checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notif">SMS Notifications</Label>
                <p className="text-xs text-muted-foreground">Delivery alerts via SMS</p>
              </div>
              <Switch id="sms-notif" checked={smsNotif} onCheckedChange={setSmsNotif} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing">Marketing Emails</Label>
                <p className="text-xs text-muted-foreground">Deals, new arrivals, offers</p>
              </div>
              <Switch id="marketing" checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-4 text-sm font-semibold">Change Password</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" placeholder="•••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" placeholder="•••••••••" />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">Save Settings</Button>
      </form>
    </div>
  );
}
