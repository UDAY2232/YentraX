import { cn } from '@/lib/utils';
import type { OrderStatus, PaymentStatus, ProductStatus, StockStatus, TicketStatus, TicketPriority, ReviewStatus } from '@/types/admin';

const statusConfig: Record<string, { label: string; className: string }> = {
  // Order
  pending: { label: 'Pending', className: 'bg-warning/15 text-warning' },
  processing: { label: 'Processing', className: 'bg-primary/15 text-primary' },
  shipped: { label: 'Shipped', className: 'bg-accent/15 text-accent' },
  delivered: { label: 'Delivered', className: 'bg-success/15 text-success' },
  cancelled: { label: 'Cancelled', className: 'bg-destructive/15 text-destructive' },
  returned: { label: 'Returned', className: 'bg-destructive/15 text-destructive' },
  // Payment
  paid: { label: 'Paid', className: 'bg-success/15 text-success' },
  failed: { label: 'Failed', className: 'bg-destructive/15 text-destructive' },
  refunded: { label: 'Refunded', className: 'bg-muted text-muted-foreground' },
  partially_refunded: { label: 'Partially Refunded', className: 'bg-warning/15 text-warning' },
  // Product
  published: { label: 'Published', className: 'bg-success/15 text-success' },
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  archived: { label: 'Archived', className: 'bg-destructive/15 text-destructive' },
  // Stock
  in_stock: { label: 'In Stock', className: 'bg-success/15 text-success' },
  low_stock: { label: 'Low Stock', className: 'bg-warning/15 text-warning' },
  out_of_stock: { label: 'Out of Stock', className: 'bg-destructive/15 text-destructive' },
  // Ticket
  open: { label: 'Open', className: 'bg-primary/15 text-primary' },
  in_progress: { label: 'In Progress', className: 'bg-warning/15 text-warning' },
  waiting: { label: 'Waiting', className: 'bg-muted text-muted-foreground' },
  resolved: { label: 'Resolved', className: 'bg-success/15 text-success' },
  closed: { label: 'Closed', className: 'bg-muted text-muted-foreground' },
  // Priority
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-primary/15 text-primary' },
  high: { label: 'High', className: 'bg-warning/15 text-warning' },
  urgent: { label: 'Urgent', className: 'bg-destructive/15 text-destructive' },
  // Review
  approved: { label: 'Approved', className: 'bg-success/15 text-success' },
  rejected: { label: 'Rejected', className: 'bg-destructive/15 text-destructive' },
  hidden: { label: 'Hidden', className: 'bg-muted text-muted-foreground' },
  // Generic
  active: { label: 'Active', className: 'bg-success/15 text-success' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground' },
  expired: { label: 'Expired', className: 'bg-destructive/15 text-destructive' },
  scheduled: { label: 'Scheduled', className: 'bg-primary/15 text-primary' },
  ended: { label: 'Ended', className: 'bg-muted text-muted-foreground' },
  blocked: { label: 'Blocked', className: 'bg-destructive/15 text-destructive' },
  success: { label: 'Success', className: 'bg-success/15 text-success' },
  failure: { label: 'Failure', className: 'bg-destructive/15 text-destructive' },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-muted text-muted-foreground' };
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', config.className)}>
      {config.label}
    </span>
  );
}

export type { OrderStatus, PaymentStatus, ProductStatus, StockStatus, TicketStatus, TicketPriority, ReviewStatus };
