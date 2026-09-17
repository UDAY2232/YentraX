import { notFound } from 'next/navigation';
import { mockProjects } from '@/data/mock/projects';
import { mockProducts } from '@/data/mock/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Hammer, CheckCircle2, ShoppingCart } from 'lucide-react';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  // Get products needed for this project
  const projectProducts = mockProducts.filter((p) => 
    project.components.some((c) => c.productId === p.id)
  );

  return (
    <div className="container-page py-8">
      {/* Hero Section */}
      <div className="mb-12 overflow-hidden rounded-2xl bg-muted">
        <div className="relative h-[300px] w-full md:h-[400px]">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge className="bg-primary/80 hover:bg-primary">{project.difficulty}</Badge>
              <div className="flex items-center text-sm font-medium text-white/90">
                <Clock className="mr-1 h-4 w-4" />
                {project.estimatedTime}
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">{project.title}</h1>
            <p className="max-w-3xl text-lg text-white/80">{project.shortDescription}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Project Overview</h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p>{project.description}</p>
              
              <h3 className="mt-8 text-xl font-semibold">What you'll learn</h3>
              <ul className="mt-4 space-y-2">
                {project.learningOutcomes?.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Step-by-Step Instructions</h2>
            <div className="space-y-8">
              {project.steps?.map((step, i) => (
                <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                  {step.image && (
                    <div className="mt-4 overflow-hidden rounded-md border">
                      <img src={step.image} alt={step.title} className="w-full object-cover" />
                    </div>
                  )}
                  {step.codeSnippet && (
                    <div className="mt-4 overflow-hidden rounded-md">
                      <div className="bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">Code</div>
                      <pre className="overflow-x-auto bg-slate-950 p-4 text-sm text-slate-50">
                        <code>{step.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar - Required Components */}
        <div>
          <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Hammer className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Required Components</h3>
                <p className="text-sm text-muted-foreground">{project.componentsCount} items needed</p>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              {project.components.map((comp, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium">{comp.name}</span>
                  <span className="text-sm text-muted-foreground">x{comp.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <Button className="w-full gap-2 text-base" size="lg">
                <ShoppingCart className="h-5 w-5" />
                Add All to Cart
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Easily add all available required components to your cart.
              </p>
            </div>

            {projectProducts.length > 0 && (
              <div className="pt-6">
                <h4 className="mb-4 font-semibold">Available Products</h4>
                <div className="grid grid-cols-1 gap-4">
                  {projectProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
