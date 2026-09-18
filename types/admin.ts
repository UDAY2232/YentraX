export type AdminRole = 'ADMIN' | 'PRODUCT_MANAGER' | 'INVENTORY_MANAGER' | 'ORDER_MANAGER' | 'CONTENT_MANAGER' | 'SUPPORT_AGENT';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export interface AdminSession {
  user: AdminUser | null;
  isAuthenticated: boolean;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type ProductStatus = 'published' | 'draft' | 'archived';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'hidden';

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: OrderStatus;
  items: number;
  items_list: { name: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  trackingId?: string;
  timeline: { status: string; date: string; done: boolean }[];
}

export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  image: string;
  updatedAt: string;
  rating: number;
  reviewCount: number;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive' | 'blocked';
  joinedDate: string;
}

export interface AdminInventoryItem {
  sku: string;
  productName: string;
  warehouse: string;
  available: number;
  reserved: number;
  total: number;
  threshold: number;
}

export interface AdminPayment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  provider: string;
  status: PaymentStatus;
  date: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  status: 'active' | 'inactive' | 'expired';
}

export interface AdminPromotion {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  status: 'active' | 'scheduled' | 'ended';
  banner?: string;
}

export interface AdminReview {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
}

export interface AdminTicket {
  id: string;
  customer: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  created: string;
  assignedAgent?: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  resourceId: string;
  result: 'success' | 'failure';
}

export interface DashboardKPI {
  label: string;
  value: number;
  change: number;
  format: 'currency' | 'number';
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sku: string;
  sales: number;
  revenue: number;
  stock: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AdminNotification {
  id: string;
  type: 'order' | 'payment' | 'stock' | 'review' | 'support' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface AdminBrand {
  id: string;
  name: string;
  logo: string;
  description: string;
  status: 'active' | 'inactive';
  productCount: number;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  productCount: number;
  status: 'active' | 'inactive';
  icon?: string;
}

export interface AdminProject {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'published' | 'draft';
  components: number;
  estimatedTime: string;
  image: string;
}

export interface AdminTutorial {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  status: 'published' | 'draft';
  views: number;
}

export interface AdminHomepageSection {
  id: string;
  name: string;
  visible: boolean;
  position: number;
}
