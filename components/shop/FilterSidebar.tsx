'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { mockCategories } from '@/data/mock/categories';

export function FilterSidebar() {
  const [priceRange, setPriceRange] = React.useState([0, 10000]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="flex flex-col gap-3">
          {mockCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={`category-${category.slug}`} />
              <label
                htmlFor={`category-${category.slug}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
            defaultValue={[0, 10000]}
            max={20000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Availability</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" defaultChecked />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              In Stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="out-of-stock" />
            <label
              htmlFor="out-of-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Out of Stock
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Rating</h3>
        <div className="flex flex-col gap-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {rating} Stars & Up
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
