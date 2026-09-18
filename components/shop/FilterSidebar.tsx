'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { mockCategories } from '@/data/mock/categories';
import type { FilterState } from '@/app/shop/page';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  brands: string[];
}

export function FilterSidebar({ filters, onChange, brands }: FilterSidebarProps) {
  const toggleCategory = (category: string) => {
    onChange({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  const toggleBrand = (brand: string) => {
    onChange({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="flex flex-col gap-3">
          {mockCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.slug}`}
                checked={filters.categories.includes(category.name)}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <label
                htmlFor={`category-${category.slug}`}
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name} ({category.productCount})
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <div className="px-2">
          <Slider
            min={0}
            max={20000}
            step={100}
            value={filters.priceRange}
            onValueChange={(val) => onChange({ ...filters, priceRange: [val[0], val[1]] as [number, number] })}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Brand</h3>
        <div className="flex flex-col gap-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Availability</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={() => onChange({ ...filters, inStock: !filters.inStock })}
            />
            <label
              htmlFor="in-stock"
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              In Stock Only
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Rating</h3>
        <div className="flex flex-col gap-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={() =>
                  onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating })
                }
              />
              <label
                htmlFor={`rating-${rating}`}
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {rating} Stars &amp; Up
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
