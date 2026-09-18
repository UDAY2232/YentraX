import { cn } from '@/lib/utils';

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return <div className={cn('rounded-lg border bg-card animate-pulse', className)} />;
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b p-4">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-4 flex-1 animate-pulse rounded bg-muted" style={{ maxWidth: `${100 / cols}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminEmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
      <p className="text-lg font-semibold">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}

export function StatCard({ label, value, change, format }: { label: string; value: number; change: number; format: 'currency' | 'number' }) {
  const formatted = format === 'currency' ? `₹${value.toLocaleString('en-IN')}` : value.toLocaleString('en-IN');
  const isPositive = change >= 0;
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{formatted}</p>
      <p className={cn('mt-1 text-xs font-medium', isPositive ? 'text-success' : 'text-destructive')}>
        {isPositive ? '+' : ''}{change}% vs last period
      </p>
    </div>
  );
}
