'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { mockProducts } from '@/data/mock/products';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { EmptyState } from '@/components/shared/EmptyState';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const searchResults = mockProducts.filter((product) => {
    const searchTerm = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.shortDescription.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Search Results
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {searchResults.length} results for "{query}"
        </p>
      </div>

      {searchResults.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try searching for something else or explore our categories."
          icon={Search}
          actionLabel="Go to Shop"
          onAction={() => window.location.href = '/shop'}
        />
      ) : (
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Mobile Filter Button */}
          <div className="flex items-center justify-between md:hidden">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="w-[180px]">
              <Select defaultValue="relevance">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden w-full shrink-0 md:block md:w-64">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 hidden items-center justify-end md:flex">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Sort by:</span>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
