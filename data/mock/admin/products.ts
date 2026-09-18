import type { AdminProduct } from '@/types/admin';
import { mockProducts } from '@/data/mock/products';

export const adminProducts: AdminProduct[] = mockProducts.map((p, i) => ({
  id: p.id,
  name: p.name,
  sku: `SKU-${p.id.toUpperCase()}`,
  category: p.category,
  brand: p.brand,
  price: p.price,
  compareAtPrice: p.originalPrice,
  stock: p.stock,
  lowStockThreshold: 20,
  status: p.isOutOfStock ? 'archived' : i % 5 === 0 ? 'draft' : 'published',
  image: p.image,
  updatedAt: `2024-10-${15 + (i % 10)}`,
  rating: p.rating,
  reviewCount: p.reviewCount,
}));

export const adminCategories = [
  { id: 'c001', name: 'Development Boards', slug: 'development-boards', parentId: null, productCount: 4, status: 'active' as const, icon: 'Cpu' },
  { id: 'c002', name: 'Sensors', slug: 'sensors', parentId: null, productCount: 5, status: 'active' as const, icon: 'Radar' },
  { id: 'c003', name: 'Robotics', slug: 'robotics', parentId: null, productCount: 4, status: 'active' as const, icon: 'Bot' },
  { id: 'c004', name: 'IoT', slug: 'iot', parentId: null, productCount: 3, status: 'active' as const, icon: 'Wifi' },
  { id: 'c005', name: 'Components', slug: 'components', parentId: null, productCount: 1, status: 'active' as const, icon: 'CircuitBoard' },
  { id: 'c006', name: '3D Printing', slug: '3d-printing', parentId: null, productCount: 2, status: 'active' as const, icon: 'Printer' },
  { id: 'c007', name: 'AI & ML', slug: 'ai-ml', parentId: null, productCount: 1, status: 'active' as const, icon: 'BrainCircuit' },
  { id: 'c008', name: 'STEM', slug: 'stem', parentId: null, productCount: 1, status: 'active' as const, icon: 'GraduationCap' },
  { id: 'c009', name: 'Drone', slug: 'drone', parentId: null, productCount: 1, status: 'active' as const, icon: 'Plane' },
  { id: 'c010', name: 'Arduino', slug: 'arduino', parentId: 'c001', productCount: 2, status: 'active' as const, icon: 'Cpu' },
  { id: 'c011', name: 'Raspberry Pi', slug: 'raspberry-pi', parentId: 'c001', productCount: 2, status: 'active' as const, icon: 'CircuitBoard' },
  { id: 'c012', name: 'ESP32', slug: 'esp32', parentId: 'c001', productCount: 2, status: 'active' as const, icon: 'Cpu' },
];

export const adminBrands = [
  { id: 'b1', name: 'Arduino', logo: '', description: 'Open-source electronics platform', status: 'active' as const, productCount: 2 },
  { id: 'b2', name: 'Raspberry Pi', logo: '', description: 'Single-board computers', status: 'active' as const, productCount: 2 },
  { id: 'b3', name: 'Espressif', logo: '', description: 'WiFi/BLE microcontrollers', status: 'active' as const, productCount: 3 },
  { id: 'b4', name: 'TowerPro', logo: '', description: 'Servo motors and actuators', status: 'active' as const, productCount: 1 },
  { id: 'b5', name: 'Creality', logo: '', description: '3D printers and filaments', status: 'active' as const, productCount: 2 },
  { id: 'b6', name: 'Bosch', logo: '', description: 'Sensors and MEMS', status: 'active' as const, productCount: 1 },
  { id: 'b7', name: 'MakerHub', logo: '', description: 'House brand for kits and bundles', status: 'active' as const, productCount: 2 },
  { id: 'b8', name: 'DJI/Ryze', logo: '', description: 'Drones and aerial kits', status: 'active' as const, productCount: 1 },
];
