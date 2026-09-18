'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { adminCategories, adminBrands } from '@/data/mock/admin/products';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2, Save, Upload } from 'lucide-react';

export default function NewProductPage() {
  const [specs, setSpecs] = React.useState([{ key: '', value: '' }]);

  const addSpec = () => setSpecs([...specs, { key: '', value: '' }]);
  const removeSpec = (i: number) => setSpecs(specs.filter((_, idx) => idx !== i));
  const updateSpec = (i: number, field: 'key' | 'value', val: string) => {
    setSpecs(specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  };

  const handleSave = (publish: boolean) => {
    toast.success(publish ? 'Product published successfully' : 'Draft saved');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="New Product"
        description="Create a new product listing"
        action={<Button variant="outline" asChild><Link href="/admin/products"><ArrowLeft className="h-4 w-4" /> Back to Products</Link></Button>}
      />

      <Tabs defaultValue="general">
        <TabsList className="flex w-full flex-wrap gap-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="name">Product Name *</Label><Input id="name" placeholder="Arduino Uno R4 WiFi" /></div>
            <div className="space-y-2"><Label htmlFor="sku">SKU *</Label><Input id="sku" placeholder="ARD-UNO-R4W" /></div>
            <div className="space-y-2"><Label htmlFor="brand">Brand</Label><Select><SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger><SelectContent>{adminBrands.map((b) => <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="category">Category</Label><Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{adminCategories.filter((c) => !c.parentId).map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <div className="space-y-2"><Label htmlFor="short">Short Description</Label><Input id="short" placeholder="32-bit ARM Cortex-M4 + WiFi/BLE module" /></div>
          <div className="space-y-2"><Label htmlFor="long">Long Description</Label><Textarea id="long" rows={5} placeholder="Detailed product description..." /></div>
        </TabsContent>

        <TabsContent value="media" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="flex h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground hover:border-primary hover:text-primary">
              <div className="text-center"><Upload className="mx-auto h-8 w-8" /><p className="mt-2 text-sm">Click to upload or drag images here</p></div>
            </div>
          </div>
          <div className="space-y-2"><Label htmlFor="video">Video URL (optional)</Label><Input id="video" placeholder="https://youtube.com/watch?v=..." /></div>
        </TabsContent>

        <TabsContent value="pricing" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="price">Price (₹) *</Label><Input id="price" type="number" placeholder="1299" /></div>
            <div className="space-y-2"><Label htmlFor="compare">Compare-at Price (₹)</Label><Input id="compare" type="number" placeholder="1799" /></div>
            <div className="space-y-2"><Label htmlFor="discount">Discount %</Label><Input id="discount" type="number" placeholder="28" /></div>
            <div className="space-y-2"><Label htmlFor="tax">Tax Rate %</Label><Input id="tax" type="number" placeholder="5" /></div>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="stock">Stock Quantity</Label><Input id="stock" type="number" placeholder="45" /></div>
            <div className="space-y-2"><Label htmlFor="threshold">Low Stock Threshold</Label><Input id="threshold" type="number" placeholder="20" /></div>
            <div className="space-y-2"><Label htmlFor="warehouse">Warehouse</Label><Select><SelectTrigger><SelectValue placeholder="Select warehouse" /></SelectTrigger><SelectContent><SelectItem value="bengaluru">Bengaluru</SelectItem><SelectItem value="mumbai">Mumbai</SelectItem><SelectItem value="delhi">Delhi</SelectItem></SelectContent></Select></div>
          </div>
        </TabsContent>

        <TabsContent value="specs" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-3">
            {specs.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Key (e.g. Voltage)" value={spec.key} onChange={(e) => updateSpec(i, 'key', e.target.value)} />
                <Input placeholder="Value (e.g. 5V)" value={spec.value} onChange={(e) => updateSpec(i, 'value', e.target.value)} />
                <Button variant="outline" size="icon" onClick={() => removeSpec(i)} disabled={specs.length === 1}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addSpec} className="gap-2"><Plus className="h-4 w-4" /> Add Specification</Button>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-4 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-2"><Label htmlFor="seo-title">SEO Title</Label><Input id="seo-title" placeholder="Arduino Uno R4 WiFi - MakerHub" /></div>
          <div className="space-y-2"><Label htmlFor="meta">Meta Description</Label><Textarea id="meta" rows={3} placeholder="Buy Arduino Uno R4 WiFi at MakerHub..." /></div>
          <div className="space-y-2"><Label htmlFor="slug">URL Slug</Label><Input id="slug" placeholder="arduino-uno-r4-wifi" /></div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3">
        <Button onClick={() => handleSave(false)} variant="outline" className="gap-2"><Save className="h-4 w-4" /> Save Draft</Button>
        <Button onClick={() => handleSave(true)} className="gap-2"><Save className="h-4 w-4" /> Publish Product</Button>
      </div>
    </div>
  );
}
