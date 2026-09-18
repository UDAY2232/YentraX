'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  { id: 'a1', label: 'Home', name: 'Student Maker', phone: '+91 98765 43210', line1: 'Room 204, Tech Hostel', line2: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', isDefault: true },
  { id: 'a2', label: 'College', name: 'Student Maker', phone: '+91 98765 43210', line1: 'Dept of Electronics, Block C', line2: 'IIT Campus', city: 'Bengaluru', state: 'Karnataka', pincode: '560012', isDefault: false },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = React.useState<Address[]>(initialAddresses);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState<Partial<Address>>({ label: '', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = { ...form as Address, id: `a${Date.now()}`, isDefault: addresses.length === 0 };
    setAddresses([...addresses, newAddress]);
    setForm({ label: '', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' });
    setShowForm(false);
    toast.success('Address added');
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.success('Address removed');
  };

  const setDefault = (id: string) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success('Default address updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Saved Addresses</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage your delivery addresses.</p>
        </div>
        {!showForm && (
          <Button size="sm" className="gap-2" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" /> Add Address
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="max-w-md space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="label">Label (Home, College, etc.)</Label>
            <Input id="label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="line1">Address Line 1</Label>
            <Input id="line1" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="line2">Address Line 2</Label>
            <Input id="line2" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Save Address</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{addr.label}</span>
                  {addr.isDefault && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Default</span>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{addr.name} · {addr.phone}</p>
                <p className="mt-1 text-sm text-muted-foreground">{addr.line1}, {addr.line2}, {addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!addr.isDefault && <Button variant="outline" size="sm" onClick={() => setDefault(addr.id)}>Set Default</Button>}
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(addr.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
