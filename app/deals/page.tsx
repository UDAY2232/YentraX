import * as React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mock/products';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function DealsPage() {
  const deals = mockProducts.filter((p) => p.discountPercent && p.discountPercent > 0);
  
  // Set target date to end of current day for demo
  const targetDate = new Date();
  targetDate.setHours(23, 59, 59, 999);

  return (
    <div className="container-page py-8">
      {/* Hero Banner */}
      <div className="relative mb-12 overflow-hidden rounded-2xl bg-primary px-6 py-12 md:px-12 md:py-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
            <Zap className="h-4 w-4 fill-flash text-flash" />
            Limited Time Offers
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Today's Best Deals
          </h1>
          <p className="mb-8 max-w-[600px] text-lg text-primary-foreground/90 md:text-xl">
            Build more. Spend less. Grab these amazing discounts on development boards, sensors, and robotics kits before they're gone.
          </p>
          
          <div className="flex flex-col items-center rounded-xl bg-background/10 p-6 backdrop-blur-md">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Deals End In</h3>
            <CountdownTimer endTime={targetDate} />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <Button variant="default" className="rounded-full">All Deals</Button>
        <Button variant="outline" className="rounded-full">Development Boards</Button>
        <Button variant="outline" className="rounded-full">Sensors</Button>
        <Button variant="outline" className="rounded-full">Robotics</Button>
        <Button variant="outline" className="rounded-full">Under ₹500</Button>
      </div>

      {/* Deals Grid */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Flash Deals</h2>
        <p className="text-sm text-muted-foreground">{deals.length} items on sale</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
