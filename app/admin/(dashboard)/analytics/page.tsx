'use client';

import * as React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { adminDashboardData } from '@/data/mock/admin/dashboard';
import { adminProducts } from '@/data/mock/admin/products';
import { PageHeader, StatCard } from '@/components/admin/ui/AdminUI';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const categorySales = [
  { name: 'Dev Boards', value: 45200, color: 'hsl(var(--primary))' },
  { name: 'Sensors', value: 23100, color: 'hsl(var(--success))' },
  { name: 'Robotics', value: 31800, color: 'hsl(var(--accent))' },
  { name: 'IoT', value: 18900, color: 'hsl(var(--chart-4))' },
  { name: '3D Printing', value: 12400, color: 'hsl(var(--chart-5))' },
];

const customerGrowth = [
  { month: 'May', customers: 340 }, { month: 'Jun', customers: 420 }, { month: 'Jul', customers: 510 },
  { month: 'Aug', customers: 680 }, { month: 'Sep', customers: 890 }, { month: 'Oct', customers: 1120 },
];

export default function AnalyticsPage() {
  const [range, setRange] = React.useState(30);
  const [chartData, setChartData] = React.useState<{ date: string; revenue: number; orders: number }[]>([]);

  React.useEffect(() => { setChartData(adminDashboardData.generateSalesData(range)); }, [range]);

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Detailed business insights" action={
        <div className="flex gap-1 rounded-lg border bg-card p-1">
          {[7, 30, 90, 365].map((d) => (
            <button key={d} onClick={() => setRange(d)} className={cn('rounded-md px-3 py-1.5 text-xs font-medium', range === d ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>{d === 365 ? '1 Year' : `${d} Days`}</button>
          ))}
        </div>
      } />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg Order Value" value={680} change={3.2} format="currency" />
        <StatCard label="Conversion Rate" value={3} change={0.5} format="number" />
        <StatCard label="Refunds" value={12} change={-2.1} format="number" />
        <StatCard label="Returning Customers" value={42} change={5.8} format="number" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} /><YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} /><Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} /><Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} /><YAxis tick={{ fontSize: 11 }} /><Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} /><Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Top Categories by Revenue</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart><Pie data={categorySales} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e) => e.name}>{categorySales.map((c, i) => <Cell key={i} fill={c.color} />)}</Pie><Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} /><Legend /></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Customer Growth</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={customerGrowth}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} /><Bar dataKey="customers" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Top Products by Revenue</h2>
        <Table>
          <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead className="text-right">Sales</TableHead><TableHead className="text-right">Revenue</TableHead></TableRow></TableHeader>
          <TableBody>
            {adminDashboardData.topProducts.map((p) => {
              const product = adminProducts.find((pr) => pr.id === p.id);
              return (
                <TableRow key={p.id}><TableCell className="font-medium">{p.name}</TableCell><TableCell className="text-muted-foreground">{product?.category ?? '-'}</TableCell><TableCell className="text-right">{p.sales}</TableCell><TableCell className="text-right font-medium">₹{p.revenue.toLocaleString('en-IN')}</TableCell></TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
