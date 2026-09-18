'use client';

import * as React from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { adminDashboardData } from '@/data/mock/admin/dashboard';
import { adminInventory } from '@/data/mock/admin/orders';
import { adminProducts } from '@/data/mock/admin/products';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { PageHeader, StatCard } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus, ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const orderStatuses = [
  { key: 'pending', label: 'Pending', count: 12, href: '/admin/orders?status=pending' },
  { key: 'processing', label: 'Processing', count: 34, href: '/admin/orders?status=processing' },
  { key: 'shipped', label: 'Shipped', count: 28, href: '/admin/orders?status=shipped' },
  { key: 'delivered', label: 'Delivered', count: 89, href: '/admin/orders?status=delivered' },
  { key: 'cancelled', label: 'Cancelled', count: 15, href: '/admin/orders?status=cancelled' },
  { key: 'returned', label: 'Returned', count: 5, href: '/admin/orders?status=returned' },
];

const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColors = { up: 'text-success', down: 'text-destructive', stable: 'text-muted-foreground' };

export default function AdminDashboardPage() {
  const [range, setRange] = React.useState(30);
  const [chartData, setChartData] = React.useState<{ date: string; revenue: number; orders: number }[]>([]);

  React.useEffect(() => {
    setChartData(adminDashboardData.generateSalesData(range));
  }, [range]);

  const lowStockItems = adminInventory.filter((i) => i.available <= i.threshold);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Business overview and key metrics"
        action={
          <div className="flex gap-1 rounded-lg border bg-card p-1">
            {[1, 7, 30, 90, 365].map((d) => (
              <button
                key={d}
                onClick={() => setRange(d)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  range === d ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {d === 1 ? 'Today' : d === 365 ? '1 Year' : `${d} Days`}
              </button>
            ))}
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminDashboardData.kpis.map((kpi) => (
          <StatCard key={kpi.label} label={kpi.label} value={kpi.value} change={kpi.change} format={kpi.format} />
        ))}
      </div>

      {/* Sales Chart */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: '12px' }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Overview */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Order Overview</h2>
            <Link href="/admin/orders"><Button variant="ghost" size="sm" className="gap-1 text-primary">View All <ArrowRight className="h-3 w-3" /></Button></Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {orderStatuses.map((s) => (
              <Link key={s.key} href={s.href} className="flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <span className="text-2xl font-bold">{s.count}</span>
                <StatusBadge status={s.key} />
              </Link>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold"><AlertTriangle className="h-5 w-5 text-warning" /> Low Stock Alerts</h2>
            <Link href="/admin/inventory"><Button variant="ghost" size="sm" className="gap-1 text-primary">View All <ArrowRight className="h-3 w-3" /></Button></Link>
          </div>
          <div className="space-y-2">
            {lowStockItems.slice(0, 5).map((item) => (
              <div key={item.sku} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-warning">{item.available} left</p>
                  <p className="text-xs text-muted-foreground">Threshold: {item.threshold}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Top Products</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-center">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminDashboardData.topProducts.map((p) => {
              const TrendIcon = trendIcons[p.trend];
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.sku}</TableCell>
                  <TableCell className="text-right">{p.sales}</TableCell>
                  <TableCell className="text-right font-medium">₹{p.revenue.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-right">{p.stock}</TableCell>
                  <TableCell className="text-center"><TrendIcon className={cn('mx-auto h-4 w-4', trendColors[p.trend])} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link href="/admin/orders"><Button variant="ghost" size="sm" className="gap-1 text-primary">View All <ArrowRight className="h-3 w-3" /></Button></Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminDashboardData.recentOrders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.id}</TableCell>
                <TableCell>{o.customerName}</TableCell>
                <TableCell className="text-muted-foreground">{o.date}</TableCell>
                <TableCell className="text-right font-medium">₹{o.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell><StatusBadge status={o.paymentStatus} /></TableCell>
                <TableCell><StatusBadge status={o.fulfillmentStatus} /></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild><Link href={`/admin/orders/${o.id}`}>View</Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
