import { notFound } from 'next/navigation';
import { mockProducts } from '@/data/mock/products';
import { Star, Truck, Shield, RotateCcw, Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container-page py-8">
      {/* Breadcrumb could go here */}

      <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square cursor-pointer overflow-hidden rounded-md border bg-muted hover:border-primary"
              >
                <img
                  src={product.image}
                  alt={`${product.name} thumbnail ${i}`}
                  className="h-full w-full object-cover opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
              {product.badge && <Badge>{product.badge}</Badge>}
            </div>
          </div>

          <p className="text-lg text-muted-foreground">{product.shortDescription}</p>

          <div className="space-y-4 rounded-lg bg-muted/40 p-6">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent && product.discountPercent > 0 && (
                <Badge className="bg-destructive text-destructive-foreground">
                  Save {product.discountPercent}%
                </Badge>
              )}
            </div>
            <div className="text-sm font-medium">
              {product.isOutOfStock ? (
                <span className="text-destructive">Out of Stock</span>
              ) : (
                <span className="text-success">
                  In Stock {product.isLowStock && <span className="text-warning">(Only {product.stock} left)</span>}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center rounded-md border">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none">
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex h-10 w-12 items-center justify-center border-x font-medium">
                  1
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-2 flex gap-4">
              <Button size="lg" className="flex-1 gap-2" disabled={product.isOutOfStock}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="flex-1">
                Buy Now
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 gap-2">
                <Heart className="h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center">
              <Truck className="h-6 w-6 text-primary" />
              <div className="text-sm font-medium">Fast Delivery</div>
              <div className="text-xs text-muted-foreground">2-4 Business Days</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center">
              <Shield className="h-6 w-6 text-primary" />
              <div className="text-sm font-medium">1 Year Warranty</div>
              <div className="text-xs text-muted-foreground">Genuine Products</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center">
              <RotateCcw className="h-6 w-6 text-primary" />
              <div className="text-sm font-medium">7 Days Return</div>
              <div className="text-xs text-muted-foreground">If defective/damaged</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Product Description</h2>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            The {product.name} is an essential tool for any maker, student, or hobbyist working with electronics. 
            Designed for reliability and performance, this component provides excellent value for your projects.
          </p>
          <p>
            Whether you are building a simple prototype, a complex robotics system, or an IoT automation project, 
            the {product.name} offers the specifications and quality you need to succeed. Compatible with Arduino, 
            Raspberry Pi, and other popular development boards.
          </p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>High quality components for durable performance</li>
            <li>Easy to integrate with standard breadboards and jumper wires</li>
            <li>Comprehensive documentation and community support available</li>
            <li>Perfect for STEM education, DIY projects, and professional prototyping</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
