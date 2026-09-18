import type { AdminCoupon, AdminPromotion, AdminReview, AdminTicket, AdminAuditLog, AdminUser, AdminProject, AdminTutorial, AdminHomepageSection } from '@/types/admin';

export const adminCoupons: AdminCoupon[] = [
  { id: 'cp1', code: 'MAKER10', type: 'percentage', value: 10, minOrder: 500, maxDiscount: 500, startDate: '2024-10-01', endDate: '2024-12-31', usageLimit: 1000, usedCount: 342, perUserLimit: 1, status: 'active' },
  { id: 'cp2', code: 'FLAT50', type: 'fixed', value: 50, minOrder: 999, startDate: '2024-09-15', endDate: '2024-11-15', usageLimit: 500, usedCount: 189, perUserLimit: 2, status: 'active' },
  { id: 'cp3', code: 'STEM25', type: 'percentage', value: 25, minOrder: 1000, maxDiscount: 1000, startDate: '2024-08-01', endDate: '2024-10-31', usageLimit: 200, usedCount: 200, perUserLimit: 1, status: 'expired' },
  { id: 'cp4', code: 'NEWUSER100', type: 'fixed', value: 100, minOrder: 499, startDate: '2024-10-10', endDate: '2025-01-10', usageLimit: 2000, usedCount: 45, perUserLimit: 1, status: 'active' },
  { id: 'cp5', code: 'WEEKEND15', type: 'percentage', value: 15, minOrder: 0, maxDiscount: 300, startDate: '2024-10-18', endDate: '2024-10-20', usageLimit: 100, usedCount: 0, perUserLimit: 1, status: 'inactive' },
];

export const adminPromotions: AdminPromotion[] = [
  { id: 'pr1', title: 'Diwali Mega Sale', description: 'Up to 40% off on robotics kits and development boards', startDate: '2024-10-20', endDate: '2024-11-05', discount: 40, status: 'scheduled' },
  { id: 'pr2', title: 'STEM Education Week', description: 'Special pricing on STEM kits for schools and colleges', startDate: '2024-10-01', endDate: '2024-10-15', discount: 25, status: 'ended' },
  { id: 'pr3', title: 'Weekend Flash Sale', description: 'Flash deals on sensors and modules', startDate: '2024-10-18', endDate: '2024-10-20', discount: 30, status: 'active' },
  { id: 'pr4', title: 'New Arrivals Promotion', description: '10% off on all new products', startDate: '2024-10-10', endDate: '2024-10-31', discount: 10, status: 'active' },
];

export const adminReviews: AdminReview[] = [
  { id: 'r1', customer: 'Aarav Sharma', product: 'Arduino Uno R4 WiFi', rating: 5, comment: 'Excellent board, works perfectly with all my projects!', date: '2024-10-17', status: 'approved' },
  { id: 'r2', customer: 'Priya Patel', product: 'Raspberry Pi 5 (8GB)', rating: 5, comment: 'Incredible performance upgrade from Pi 4. Highly recommend.', date: '2024-10-16', status: 'approved' },
  { id: 'r3', customer: 'Rohan Kumar', product: 'ESP32-WROOM DevKit V1', rating: 4, comment: 'Great value but documentation could be better.', date: '2024-10-16', status: 'pending' },
  { id: 'r4', customer: 'Sneha Reddy', product: 'DJI Tello Drone EDU Kit', rating: 1, comment: 'Drone crashed on first flight, requesting replacement.', date: '2024-10-15', status: 'pending' },
  { id: 'r5', customer: 'Vikram Singh', product: 'HC-SR04 Ultrasonic Sensor', rating: 4, comment: 'Works as expected for the price. Good range.', date: '2024-10-14', status: 'approved' },
  { id: 'r6', customer: 'Ananya Gupta', product: 'STEM Robot Car Kit v2', rating: 5, comment: 'Perfect for my students. Easy to assemble and program.', date: '2024-10-13', status: 'hidden' },
];

export const adminTickets: AdminTicket[] = [
  { id: 'TKT-345', customer: 'Karthik Nair', subject: 'Order not delivered', priority: 'high', status: 'open', created: '2024-10-17', assignedAgent: undefined },
  { id: 'TKT-344', customer: 'Ananya Gupta', subject: 'Defective product received', priority: 'urgent', status: 'in_progress', created: '2024-10-16', assignedAgent: 'Support Agent 1' },
  { id: 'TKT-343', customer: 'Rohan Kumar', subject: 'Wrong item shipped', priority: 'medium', status: 'waiting', created: '2024-10-15', assignedAgent: 'Support Agent 2' },
  { id: 'TKT-342', customer: 'Sneha Reddy', subject: 'Refund request', priority: 'medium', status: 'resolved', created: '2024-10-14', assignedAgent: 'Support Agent 1' },
  { id: 'TKT-341', customer: 'Vikram Singh', subject: 'Payment failed but money deducted', priority: 'high', status: 'resolved', created: '2024-10-13', assignedAgent: 'Support Agent 3' },
  { id: 'TKT-340', customer: 'Aarav Sharma', subject: 'Product compatibility question', priority: 'low', status: 'closed', created: '2024-10-12', assignedAgent: 'Support Agent 2' },
];

export const adminUsers: AdminUser[] = [
  { id: 'au1', name: 'Admin User', email: 'admin@makerhub.com', role: 'ADMIN', status: 'active', lastLogin: '2024-10-17 09:00' },
  { id: 'au2', name: 'Product Manager', email: 'pm@makerhub.com', role: 'PRODUCT_MANAGER', status: 'active', lastLogin: '2024-10-17 08:30' },
  { id: 'au3', name: 'Inventory Manager', email: 'inv@makerhub.com', role: 'INVENTORY_MANAGER', status: 'active', lastLogin: '2024-10-16 17:00' },
  { id: 'au4', name: 'Order Manager', email: 'orders@makerhub.com', role: 'ORDER_MANAGER', status: 'active', lastLogin: '2024-10-17 07:45' },
  { id: 'au5', name: 'Content Manager', email: 'content@makerhub.com', role: 'CONTENT_MANAGER', status: 'active', lastLogin: '2024-10-15 16:00' },
  { id: 'au6', name: 'Support Agent 1', email: 'support1@makerhub.com', role: 'SUPPORT_AGENT', status: 'active', lastLogin: '2024-10-17 09:15' },
  { id: 'au7', name: 'Support Agent 2', email: 'support2@makerhub.com', role: 'SUPPORT_AGENT', status: 'inactive', lastLogin: '2024-10-10 14:00' },
];

export const adminAuditLogs: AdminAuditLog[] = [
  { id: 'al1', timestamp: '2024-10-17 10:45:32', user: 'admin@makerhub.com', action: 'Updated product', resource: 'Product', resourceId: 'p001', result: 'success' },
  { id: 'al2', timestamp: '2024-10-17 10:30:15', user: 'pm@makerhub.com', action: 'Created product', resource: 'Product', resourceId: 'p021', result: 'success' },
  { id: 'al3', timestamp: '2024-10-17 09:15:00', user: 'inv@makerhub.com', action: 'Adjusted stock', resource: 'Inventory', resourceId: 'SKU-P003', result: 'success' },
  { id: 'al4', timestamp: '2024-10-17 08:45:22', user: 'orders@makerhub.com', action: 'Updated order status', resource: 'Order', resourceId: 'ORD-94824', result: 'success' },
  { id: 'al5', timestamp: '2024-10-16 17:30:10', user: 'admin@makerhub.com', action: 'Deleted coupon', resource: 'Coupon', resourceId: 'cp3', result: 'success' },
  { id: 'al6', timestamp: '2024-10-16 16:20:45', user: 'content@makerhub.com', action: 'Published tutorial', resource: 'Tutorial', resourceId: 't008', result: 'success' },
  { id: 'al7', timestamp: '2024-10-16 15:10:33', user: 'pm@makerhub.com', action: 'Archived product', resource: 'Product', resourceId: 'p011', result: 'success' },
  { id: 'al8', timestamp: '2024-10-16 14:05:18', user: 'admin@makerhub.com', action: 'Created user', resource: 'User', resourceId: 'au7', result: 'success' },
  { id: 'al9', timestamp: '2024-10-16 11:45:00', user: 'support1@makerhub.com', action: 'Resolved ticket', resource: 'Ticket', resourceId: 'TKT-342', result: 'success' },
  { id: 'al10', timestamp: '2024-10-16 10:30:12', user: 'admin@makerhub.com', action: 'Updated settings', resource: 'Settings', resourceId: 'general', result: 'failure' },
];

export const adminProjects: AdminProject[] = [
  { id: 'pr1', title: 'Build a Bluetooth Robot Car', difficulty: 'Beginner', status: 'published', components: 4, estimatedTime: '2-3 hours', image: 'https://images.pexels.com/photos/7869034/pexels-photo-7869034.jpeg?auto=compress&cs=tinysrgb&h=100&w=150' },
  { id: 'pr2', title: 'IoT Weather Station', difficulty: 'Intermediate', status: 'published', components: 3, estimatedTime: '4-5 hours', image: 'https://images.pexels.com/photos/18721086/pexels-photo-18721086.jpeg?auto=compress&cs=tinysrgb&h=100&w=150' },
  { id: 'pr3', title: 'Smart Home Automation', difficulty: 'Intermediate', status: 'published', components: 3, estimatedTime: '3-4 hours', image: 'https://images.pexels.com/photos/30170004/pexels-photo-30170004.jpeg?auto=compress&cs=tinysrgb&h=100&w=150' },
  { id: 'pr4', title: 'AI Object Detection Robot', difficulty: 'Advanced', status: 'published', components: 3, estimatedTime: '6-8 hours', image: 'https://images.pexels.com/photos/17483849/pexels-photo-17483849.png?auto=compress&cs=tinysrgb&h=100&w=150' },
  { id: 'pr5', title: 'RFID Smart Door Lock', difficulty: 'Intermediate', status: 'draft', components: 5, estimatedTime: '3-4 hours', image: '' },
  { id: 'pr6', title: 'Line Following Robot', difficulty: 'Beginner', status: 'draft', components: 4, estimatedTime: '2 hours', image: '' },
];

export const adminTutorials: AdminTutorial[] = [
  { id: 't1', title: 'Arduino for Beginners', category: 'Arduino', level: 'Beginner', duration: '2 Hours', status: 'published', views: 4520 },
  { id: 't2', title: 'ESP32 IoT Masterclass', category: 'IoT', level: 'Intermediate', duration: '4 Hours', status: 'published', views: 3210 },
  { id: 't3', title: 'Build Your First Robot', category: 'Robotics', level: 'Beginner', duration: '3 Hours', status: 'published', views: 2890 },
  { id: 't4', title: 'Advanced Raspberry Pi', category: 'Raspberry Pi', level: 'Advanced', duration: '6 Hours', status: 'published', views: 1670 },
  { id: 't5', title: 'Electronics Basics', category: 'Electronics', level: 'Beginner', duration: '1.5 Hours', status: 'published', views: 5230 },
  { id: 't6', title: 'Python for Hardware', category: 'Python', level: 'Intermediate', duration: '3.5 Hours', status: 'draft', views: 0 },
];

export const adminHomepageSections: AdminHomepageSection[] = [
  { id: 'hero', name: 'Hero', visible: true, position: 1 },
  { id: 'dailyDeals', name: 'Daily Deals', visible: true, position: 2 },
  { id: 'offers', name: 'Offer Banners', visible: true, position: 3 },
  { id: 'featured', name: 'Featured Products', visible: true, position: 4 },
  { id: 'categories', name: 'Categories', visible: true, position: 5 },
  { id: 'flashSale', name: 'Flash Sale', visible: true, position: 6 },
  { id: 'trending', name: 'Trending', visible: true, position: 7 },
  { id: 'recommended', name: 'Recommended', visible: true, position: 8 },
  { id: 'learning', name: 'Learning', visible: true, position: 9 },
  { id: 'benefits', name: 'Benefits', visible: true, position: 10 },
  { id: 'newsletter', name: 'Newsletter', visible: true, position: 11 },
];
