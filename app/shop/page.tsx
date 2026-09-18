'use client';

import * as React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mock/products';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import type { Product } from '@/types/product';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStock: boolean;
  minRating: number;
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  brands: [],
  priceRange: [0, 20000],
  inStock: false,
  minRating: 0,
};

function filterAndSort(
  products: Product[],
  filters: FilterState,
  sort: string
): Product[] {
  let result = products.filter((p) => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
    if (filters.inStock && p.isOutOfStock) return false;
    if (filters.minRating > 0 && p.rating < filters.minRating) return false;
    return true;
  });

  switch (sort) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result = [...result].sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
      break;
    default:
      result = [...result].sort((a, b) => {
        const badgeOrder: Record<string, number> = { bestseller: 0, new: 1, trending: 2, exclusive: 3, limited: 4 };
        return (badgeOrder[a.badge ?? ''] ?? 5) - (badgeOrder[b.badge ?? ''] ?? 5);
      });
  }

  return result;
}

const ALL_BRANDS = Array.from(new Set(mockProducts.map((p) => p.brand))).sort();

export default function ShopPage() {
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState('featured');
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  const filteredProducts = React.useMemo(
    () => filterAndSort(mockProducts, filters, sort),
    [filters, sort]
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.inStock ||
    filters.minRating > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 20000;

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const sidebar = (
    <FilterSidebar
      filters={filters}
      onChange={setFilters}
      brands={ALL_BRANDS}
    />
  );

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Shop</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore electronics, components, kits and tools built for makers.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Mobile Filter Button */}
        <div className="flex items-center justify-between md:hidden">
          <Button variant="outline" className="gap-2" onClick={() => setMobileFilterOpen(true)}>
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {filters.categories.length + filters.brands.length + (filters.inStock ? 1 : 0) + (filters.minRating > 0 ? 1 : 0)}
              </span>
            )}
          </Button>
          <div className="w-[180px]">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
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
          {sidebar}
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between md:flex">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{visibleProducts.length}</span> of{' '}
                <span className="font-medium text-foreground">{filteredProducts.length}</span> products
              </p>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={clearFilters}>
                  <X className="h-3 w-3" />
                  Clear filters
                </Button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
              <p className="text-lg font-semibold">No products match your filters</p>
              <p className="text-sm text-muted-foreground">Try adjusting or clearing your filters.</p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="mt-12 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount((c) => c + 8)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto sm:w-[350px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {sidebar}
            <Button className="mt-6 w-full" onClick={() => setMobileFilterOpen(false)}>
              Show {filteredProducts.length} results
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" className="mt-2 w-full" onClick={clearFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
