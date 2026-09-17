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
import { Filter } from 'lucide-react';

export default function ShopPage() {
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
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <div className="w-[180px]">
            <Select defaultValue="featured">
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
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between md:flex">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{mockProducts.length}</span> products
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Sort by:</span>
              <Select defaultValue="featured">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
