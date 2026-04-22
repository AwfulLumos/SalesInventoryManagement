import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign, BarChart3 } from 'lucide-react';
import { products, transactions } from '../../../shared/data/mockData';

const COLORS = [
  '#ff9644', '#ffce99', '#562f00', '#e07020', '#3a1f00',
];

export default function Reports() {
  const productSales = transactions.flatMap(t =>
    t.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      revenue: item.price * item.quantity,
    }))
  );

  const salesByProduct = productSales.reduce((acc, sale) => {
    if (!acc[sale.productId]) acc[sale.productId] = { name: sale.productName, quantity: 0, revenue: 0 };
    acc[sale.productId].quantity += sale.quantity;
    acc[sale.productId].revenue += sale.revenue;
    return acc;
  }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

  const topSellingProducts = Object.values(salesByProduct).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  const slowMovingProducts = products.map(p => ({ ...p, sold: salesByProduct[p.id]?.quantity || 0 }))
    .filter(p => p.sold < 5).slice(0, 5);

  const salesByCategory = transactions.flatMap(t =>
    t.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { category: product?.category || 'Unknown', revenue: item.price * item.quantity };
    })
  ).reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.revenue;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(salesByCategory).map(([category, value]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value,
  }));

  const salesTrendData = [
    { date: 'Apr 15', sales: 4200 },
    { date: 'Apr 16', sales: 3800 },
    { date: 'Apr 17', sales: 5100 },
    { date: 'Apr 18', sales: 4600 },
    { date: 'Apr 19', sales: 5400 },
    { date: 'Apr 20', sales: 4800 },
    { date: 'Apr 21', sales: 6200 },
    { date: 'Apr 22', sales: 7100 },
  ];

  const totalRevenue = Object.values(salesByProduct).reduce((s, p) => s + p.revenue, 0);
  const totalItemsSold = Object.values(salesByProduct).reduce((s, p) => s + p.quantity, 0);
  const avgTransaction = transactions.length > 0
    ? transactions.reduce((s, t) => s + t.total, 0) / transactions.length : 0;

  const statCards = [
    { label: 'Total Revenue', value: `₱${totalRevenue.toFixed(0)}`, icon: <DollarSign size={26} />, from: 'from-[#ffce99]', to: 'to-[#ff9644]', text: 'text-[#562f00]' },
    { label: 'Items Sold', value: totalItemsSold, icon: <Package size={26} />, from: 'from-[#ff9644]', to: 'to-[#e07020]', text: 'text-[#fffdf1]' },
    { label: 'Avg Transaction', value: `₱${avgTransaction.toFixed(0)}`, icon: <TrendingUp size={26} />, from: 'from-[#562f00]', to: 'to-[#3a1f00]', text: 'text-[#fffdf1]' },
    { label: 'Product Categories', value: Object.keys(salesByCategory).length, icon: <BarChart3 size={26} />, from: 'from-[#ffce99]', to: 'to-[#ffb870]', text: 'text-[#562f00]' },
  ];

  const tooltipStyle = {
    contentStyle: { backgroundColor: '#fffdf1', border: '1px solid #ffce99', borderRadius: 8, fontSize: 12 },
    labelStyle: { color: '#562f00', fontWeight: 600 },
  };

  return (
    <div className="space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.from} ${c.to} ${c.text} rounded-xl shadow-lg p-5`}>
            <div className="flex items-center justify-between mb-1 opacity-90">
              <p className="text-sm font-medium">{c.label}</p>
              {c.icon}
            </div>
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          <h3 className="font-semibold text-lg mb-4">Sales Trend — Last 8 Days</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(86,47,0,0.08)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#562f00' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#562f00' }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`₱${v.toLocaleString()}`, 'Sales']} />
              <Line type="monotone" dataKey="sales" stroke="#ff9644" strokeWidth={2.5} dot={{ fill: '#ff9644', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          <h3 className="font-semibold text-lg mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryChartData} cx="50%" cy="50%"
                outerRadius={95} innerRadius={40}
                dataKey="value" labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryChartData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`₱${v.toFixed(0)}`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Top Selling Products
          </h3>
          <p className="text-sm text-muted-foreground mb-4">By units sold</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topSellingProducts} layout="vertical" margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(86,47,0,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#562f00' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fill: '#562f00' }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [v, 'Units sold']} />
              <Bar dataKey="quantity" fill="#ff9644" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 border-t border-border/40 pt-4">
            {topSellingProducts.map((p, i) => (
              <div key={p.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-[#fffdf1]"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                    {i + 1}
                  </span>
                  <span className="font-medium truncate max-w-[160px]">{p.name}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-bold text-primary">{p.quantity} sold</span>
                  <span className="text-muted-foreground/70 text-xs ml-2">₱{p.revenue.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
            <TrendingDown size={20} className="text-primary" /> Slow Moving Products
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Products with fewer than 5 units sold</p>
          <div className="space-y-3">
            {slowMovingProducts.length > 0 ? slowMovingProducts.map(product => (
              <div key={product.id} className="border border-border/60 rounded-xl p-3 hover:bg-muted/20 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{product.sold} sold</p>
                    <p className="text-xs text-muted-foreground/70">Stock: {product.stock}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">₱{product.price}</span>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">Low Sales</span>
                </div>
              </div>
            )) : (
              <p className="text-muted-foreground/70 text-center py-8">All products have good sales volume</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="mt-5 p-4 bg-gradient-to-br from-[#ffce99]/40 to-[#ff9644]/20 border border-[#ffce99] rounded-xl">
            <p className="font-semibold text-sm mb-2 text-[#562f00]">Recommendations</p>
            <ul className="text-xs text-[#562f00]/80 space-y-1">
              <li>• Consider promotional discounts for slow-moving items</li>
              <li>• Review pricing strategy for these products</li>
              <li>• Bundle with popular items to increase sales</li>
              <li>• Reduce future orders for low-demand products</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
