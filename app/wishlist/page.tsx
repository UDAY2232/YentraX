'use client';

import { useWishlist } from '@/store/wishlistStore';
import { mockProducts } from '@/data/mock/products';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/shared/EmptyState';
import React from 'react';

export default function WishlistPage() {
  const { items, clear } = useWishlist();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration errors

  const wishlistedProducts = mockProducts.filter((product) => items.includes(product.id));

  return (
    <div className="container-page py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">My Wishlist</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        {wishlistedProducts.length > 0 && (
          <button 
            onClick={clear}
            className="text-sm font-medium text-destructive hover:underline"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <EmptyState
          title="Your Wishlist is Empty"
          description="Save products you love and find them here later."
          actionLabel="Explore Products"
          onAction={() => window.location.href = '/shop'}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
