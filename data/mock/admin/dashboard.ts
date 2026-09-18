import type { DashboardKPI, SalesDataPoint, TopProduct, AdminOrder, AdminNotification } from '@/types/admin';

const kpis: DashboardKPI[] = [
  { label: 'Revenue', value: 124500, change: 12.4, format: 'currency' },
  { label: 'Orders', value: 183, change: 8.2, format: 'number' },
  { label: 'Customers', value: 96, change: 14.7, format: 'number' },
  { label: 'Products', value: 2430, change: 5.1, format: 'number' },
];

function generateSalesData(days: number): SalesDataPoint[] {
  const data: SalesDataPoint[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const base = 8000 + Math.random() * 6000;
    data.push({
      date: d.toISOString().slice(0, 10),
      revenue: Math.round(base + (i % 7 === 0 ? 3000 : 0)),
      orders: Math.round(15 + Math.random() * 25),
    });
  }
  return data;
}

const topProducts: TopProduct[] = [
  { id: 'p003', name: 'ESP32-WROOM DevKit V1', sku: 'ESP32-WROOM-V1', sales: 124, revenue: 55676, stock: 120, trend: 'up' },
  { id: 'p005', name: 'HC-SR04 Ultrasonic Sensor', sku: 'HC-SR04', sales: 98, revenue: 8722, stock: 500, trend: 'stable' },
  { id: 'p001', name: 'Arduino Uno R4 WiFi', sku: 'ARD-UNO-R4W', sales: 87, revenue: 113013, stock: 45, trend: 'up' },
  { id: 'p014', name: 'NodeMCU ESP8266 V3', sku: 'NODEMCU-ESP8266', sales: 76, revenue: 15124, stock: 250, trend: 'down' },
  { id: 'p016', name: 'STEM Robot Car Kit v2', sku: 'STEM-ROBOT-V2', sales: 54, revenue: 97146, stock: 41, trend: 'up' },
];

const recentOrders: AdminOrder[] = [
  { id: 'ORD-94825', customerName: 'Aarav Sharma', customerEmail: 'aarav@example.com', date: '2024-10-17', amount: 2499, paymentStatus: 'paid', fulfillmentStatus: 'processing', items: 1, items_list: [], subtotal: 2499, discount: 0, tax: 0, shipping: 0, total: 2499, timeline: [] },
  { id: 'ORD-94824', customerName: 'Priya Patel', customerEmail: 'priya@example.com', date: '2024-10-17', amount: 6499, paymentStatus: 'paid', fulfillmentStatus: 'shipped', items: 2, items_list: [], subtotal: 6499, discount: 0, tax: 0, shipping: 0, total: 6499, trackingId: 'TRK-88421', timeline: [] },
  { id: 'ORD-94823', customerName: 'Rohan Kumar', customerEmail: 'rohan@example.com', date: '2024-10-16', amount: 449, paymentStatus: 'pending', fulfillmentStatus: 'pending', items: 4, items_list: [], subtotal: 449, discount: 0, tax: 0, shipping: 0, total: 449, timeline: [] },
  { id: 'ORD-94822', customerName: 'Sneha Reddy', customerEmail: 'sneha@example.com', date: '2024-10-16', amount: 8999, paymentStatus: 'paid', fulfillmentStatus: 'delivered', items: 1, items_list: [], subtotal: 8999, discount: 0, tax: 0, shipping: 0, total: 8999, trackingId: 'TRK-88398', timeline: [] },
  { id: 'ORD-94821', customerName: 'Vikram Singh', customerEmail: 'vikram@example.com', date: '2024-10-15', amount: 1249, paymentStatus: 'failed', fulfillmentStatus: 'cancelled', items: 3, items_list: [], subtotal: 1249, discount: 0, tax: 0, shipping: 0, total: 1249, timeline: [] },
];

const orderStatusCounts = {
  pending: 12,
  processing: 34,
  shipped: 28,
  delivered: 89,
  cancelled: 15,
  returned: 5,
};

const notifications: AdminNotification[] = [
  { id: 'n1', type: 'order', title: 'New Order', message: 'Order #ORD-94825 placed by Aarav Sharma', time: '5 min ago', read: false },
  { id: 'n2', type: 'stock', title: 'Low Stock Alert', message: 'Raspberry Pi 5 (8GB) has only 22 units left', time: '20 min ago', read: false },
  { id: 'n3', type: 'payment', title: 'Payment Failed', message: 'Payment for order #ORD-94821 failed', time: '1 hour ago', read: false },
  { id: 'n4', type: 'review', title: 'New Review', message: 'New 5-star review on Arduino Uno R4 WiFi', time: '2 hours ago', read: true },
  { id: 'n5', type: 'support', title: 'Support Ticket', message: 'Ticket #TKT-342 opened: Defective servo motor', time: '3 hours ago', read: true },
];

export const adminDashboardData = {
  kpis,
  generateSalesData,
  topProducts,
  recentOrders,
  orderStatusCounts,
  notifications,
};
