'use client';

import * as React from 'react';
import { useCart } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container-page py-12">
        <EmptyState
          title="Your Cart is Empty"
          description="Looks like you haven't added anything yet."
          onAction={() => window.location.href = '/shop'}
          actionLabel="Start Shopping"
        />
      </div>
    );
  }

  const shipping = totalPrice > 500 ? 0 : 50;
  const discount = items.reduce((acc, item) => {
    if (item.product.originalPrice) {
      return acc + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return acc;
  }, 0);
  
  const finalTotal = totalPrice + shipping;

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Your Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">{totalItems} items in your cart</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          <div className="rounded-xl border bg-card">
            <div className="hidden grid-cols-12 border-b p-4 text-sm font-medium text-muted-foreground md:grid">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>
            
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="flex flex-col gap-4 p-4 md:grid md:grid-cols-12 md:items-center">
                  <div className="col-span-6 flex items-start gap-4 md:items-center">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <Link href={`/product/${item.product.slug}`} className="line-clamp-2 font-semibold hover:text-primary">
                        {item.product.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.product.brand}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-left md:text-center">
                    <div className="font-semibold">₹{item.product.price.toLocaleString('en-IN')}</div>
                    {item.product.originalPrice && (
                      <div className="text-xs text-muted-foreground line-through">
                        ₹{item.product.originalPrice.toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-2 flex items-center md:justify-center">
                    <div className="flex items-center rounded-md border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="flex h-8 w-8 items-center justify-center border-x text-sm font-medium">
                        {item.quantity}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-between md:justify-end">
                    <span className="font-bold md:hidden">Subtotal:</span>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            
            <div className="space-y-3 border-b pb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                <span className="font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium text-success">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? <span className="text-success">Free</span> : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-muted-foreground">
                  Add ₹{(500 - totalPrice).toLocaleString('en-IN')} more to get free shipping.
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between py-4 text-lg font-bold">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="space-y-3 pt-2">
              <Button className="w-full gap-2" size="lg">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
