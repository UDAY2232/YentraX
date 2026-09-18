'use client';

import * as React from 'react';
import Link from 'next/link';
import { adminProducts } from '@/data/mock/admin/products';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import NewProductPage from '../new/page';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = adminProducts.find((p) => p.id === params.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit: ${product?.name ?? 'Product'}`}
        description={product?.sku}
        action={<Button variant="outline" asChild><Link href="/admin/products"><ArrowLeft className="h-4 w-4" /> Back to Products</Link></Button>}
      />
      <NewProductPage />
    </div>
  );
}
