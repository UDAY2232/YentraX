import type { AdminOrder, AdminCustomer, AdminPayment, AdminInventoryItem } from '@/types/admin';

export const adminOrders: AdminOrder[] = [
  {
    id: 'ORD-94825', customerName: 'Aarav Sharma', customerEmail: 'aarav@example.com', date: '2024-10-17',
    amount: 2499, paymentStatus: 'paid', fulfillmentStatus: 'processing', items: 1,
    items_list: [{ name: 'Smart Home IoT Starter Kit', qty: 1, price: 2499 }],
    subtotal: 2499, discount: 0, tax: 124, shipping: 0, total: 2623,
    timeline: [
      { status: 'Placed', date: '2024-10-17 10:30', done: true },
      { status: 'Confirmed', date: '2024-10-17 10:45', done: true },
      { status: 'Processing', date: '2024-10-17 12:00', done: true },
      { status: 'Packed', date: '', done: false },
      { status: 'Shipped', date: '', done: false },
      { status: 'Delivered', date: '', done: false },
    ],
  },
  {
    id: 'ORD-94824', customerName: 'Priya Patel', customerEmail: 'priya@example.com', date: '2024-10-17',
    amount: 6499, paymentStatus: 'paid', fulfillmentStatus: 'shipped', items: 2,
    items_list: [{ name: 'Raspberry Pi 5 (8GB)', qty: 1, price: 6499 }, { name: 'HC-SR04 Ultrasonic Sensor', qty: 1, price: 89 }],
    subtotal: 6588, discount: 500, tax: 304, shipping: 0, total: 6392, trackingId: 'TRK-88421',
    timeline: [
      { status: 'Placed', date: '2024-10-17 09:00', done: true },
      { status: 'Confirmed', date: '2024-10-17 09:15', done: true },
      { status: 'Processing', date: '2024-10-17 10:00', done: true },
      { status: 'Packed', date: '2024-10-17 11:00', done: true },
      { status: 'Shipped', date: '2024-10-17 14:00', done: true },
      { status: 'Delivered', date: '', done: false },
    ],
  },
  {
    id: 'ORD-94823', customerName: 'Rohan Kumar', customerEmail: 'rohan@example.com', date: '2024-10-16',
    amount: 449, paymentStatus: 'pending', fulfillmentStatus: 'pending', items: 4,
    items_list: [{ name: 'ESP32-WROOM DevKit V1', qty: 1, price: 449 }],
    subtotal: 449, discount: 0, tax: 22, shipping: 50, total: 521,
    timeline: [
      { status: 'Placed', date: '2024-10-16 16:00', done: true },
      { status: 'Confirmed', date: '', done: false },
      { status: 'Processing', date: '', done: false },
      { status: 'Packed', date: '', done: false },
      { status: 'Shipped', date: '', done: false },
      { status: 'Delivered', date: '', done: false },
    ],
  },
  {
    id: 'ORD-94822', customerName: 'Sneha Reddy', customerEmail: 'sneha@example.com', date: '2024-10-16',
    amount: 8999, paymentStatus: 'paid', fulfillmentStatus: 'delivered', items: 1,
    items_list: [{ name: 'DJI Tello Drone EDU Kit', qty: 1, price: 8999 }],
    subtotal: 8999, discount: 0, tax: 450, shipping: 0, total: 9449, trackingId: 'TRK-88398',
    timeline: [
      { status: 'Placed', date: '2024-10-16 11:00', done: true },
      { status: 'Confirmed', date: '2024-10-16 11:10', done: true },
      { status: 'Processing', date: '2024-10-16 12:00', done: true },
      { status: 'Packed', date: '2024-10-16 13:00', done: true },
      { status: 'Shipped', date: '2024-10-16 15:00', done: true },
      { status: 'Delivered', date: '2024-10-17 10:00', done: true },
    ],
  },
  {
    id: 'ORD-94821', customerName: 'Vikram Singh', customerEmail: 'vikram@example.com', date: '2024-10-15',
    amount: 1249, paymentStatus: 'failed', fulfillmentStatus: 'cancelled', items: 3,
    items_list: [{ name: 'Arduino Uno R4 WiFi', qty: 1, price: 1299 }],
    subtotal: 1299, discount: 50, tax: 62, shipping: 0, total: 1311,
    timeline: [
      { status: 'Placed', date: '2024-10-15 14:00', done: true },
      { status: 'Confirmed', date: '', done: false },
      { status: 'Processing', date: '', done: false },
      { status: 'Packed', date: '', done: false },
      { status: 'Shipped', date: '', done: false },
      { status: 'Delivered', date: '', done: false },
    ],
  },
];

export const adminCustomers: AdminCustomer[] = [
  { id: 'u1', name: 'Aarav Sharma', email: 'aarav@example.com', phone: '+91 98765 43210', orders: 12, totalSpent: 45600, lastOrder: '2024-10-17', status: 'active', joinedDate: '2024-01-15' },
  { id: 'u2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98123 45678', orders: 8, totalSpent: 32100, lastOrder: '2024-10-17', status: 'active', joinedDate: '2024-02-20' },
  { id: 'u3', name: 'Rohan Kumar', email: 'rohan@example.com', phone: '+91 99876 54321', orders: 5, totalSpent: 12450, lastOrder: '2024-10-16', status: 'active', joinedDate: '2024-03-10' },
  { id: 'u4', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 91234 56789', orders: 15, totalSpent: 78900, lastOrder: '2024-10-16', status: 'active', joinedDate: '2024-01-05' },
  { id: 'u5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 90123 45678', orders: 3, totalSpent: 8700, lastOrder: '2024-10-15', status: 'inactive', joinedDate: '2024-04-12' },
  { id: 'u6', name: 'Ananya Gupta', email: 'ananya@example.com', phone: '+91 93456 78901', orders: 9, totalSpent: 28400, lastOrder: '2024-10-14', status: 'active', joinedDate: '2024-02-01' },
  { id: 'u7', name: 'Karthik Nair', email: 'karthik@example.com', phone: '+91 95678 90123', orders: 2, totalSpent: 3200, lastOrder: '2024-10-10', status: 'blocked', joinedDate: '2024-05-18' },
];

export const adminPayments: AdminPayment[] = [
  { id: 'PAY-3421', orderId: 'ORD-94825', customer: 'Aarav Sharma', amount: 2623, provider: 'UPI', status: 'paid', date: '2024-10-17' },
  { id: 'PAY-3420', orderId: 'ORD-94824', customer: 'Priya Patel', amount: 6392, provider: 'Card', status: 'paid', date: '2024-10-17' },
  { id: 'PAY-3419', orderId: 'ORD-94823', customer: 'Rohan Kumar', amount: 521, provider: 'UPI', status: 'pending', date: '2024-10-16' },
  { id: 'PAY-3418', orderId: 'ORD-94822', customer: 'Sneha Reddy', amount: 9449, provider: 'Card', status: 'paid', date: '2024-10-16' },
  { id: 'PAY-3417', orderId: 'ORD-94821', customer: 'Vikram Singh', amount: 1311, provider: 'UPI', status: 'failed', date: '2024-10-15' },
  { id: 'PAY-3416', orderId: 'ORD-94820', customer: 'Ananya Gupta', amount: 4499, provider: 'Paytm', status: 'refunded', date: '2024-10-14' },
  { id: 'PAY-3415', orderId: 'ORD-94819', customer: 'Karthik Nair', amount: 1899, provider: 'COD', status: 'partially_refunded', date: '2024-10-12' },
];

export const adminInventory: AdminInventoryItem[] = [
  { sku: 'SKU-P001', productName: 'Arduino Uno R4 WiFi', warehouse: 'Bengaluru', available: 45, reserved: 3, total: 48, threshold: 20 },
  { sku: 'SKU-P002', productName: 'Raspberry Pi 5 (8GB)', warehouse: 'Bengaluru', available: 22, reserved: 2, total: 24, threshold: 20 },
  { sku: 'SKU-P003', productName: 'ESP32-WROOM DevKit V1', warehouse: 'Mumbai', available: 120, reserved: 5, total: 125, threshold: 30 },
  { sku: 'SKU-P004', productName: 'MG90S Micro Servo Motor', warehouse: 'Bengaluru', available: 340, reserved: 10, total: 350, threshold: 50 },
  { sku: 'SKU-P005', productName: 'HC-SR04 Ultrasonic Sensor', warehouse: 'Delhi', available: 500, reserved: 20, total: 520, threshold: 100 },
  { sku: 'SKU-P008', productName: 'Creality Ender-3 V3 SE 3D Printer', warehouse: 'Bengaluru', available: 14, reserved: 1, total: 15, threshold: 10 },
  { sku: 'SKU-P011', productName: 'Raspberry Pi 4 Model B (4GB)', warehouse: 'Mumbai', available: 0, reserved: 0, total: 0, threshold: 15 },
  { sku: 'SKU-P013', productName: 'DJI Tello Drone EDU Kit', warehouse: 'Delhi', available: 9, reserved: 0, total: 9, threshold: 5 },
];
