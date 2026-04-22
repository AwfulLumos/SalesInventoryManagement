import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';
import { products, transactions } from '../data/mockData';

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
    if (!acc[sale.productId]) {
      acc[sale.productId] = { name: sale.productName, quantity: 0, revenue: 0 };
    }
    acc[sale.productId].quantity += sale.quantity;
    acc[sale.productId].revenue += sale.revenue;
    return acc;
  }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

  const topSellingProducts = Object.values(salesByProduct)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const slowMovingProducts = products
    .map(product => {
      const sold = salesByProduct[product.id]?.quantity || 0;
      return { ...product, sold };
    })
    .filter(p => p.sold < 5)
    .slice(0, 5);

  const salesByCategory = transactions.flatMap(t =>
    t.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        category: product?.category || 'Unknown',
        revenue: item.price * item.quantity,
      };
    })
  ).reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.revenue;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(salesByCategory).map(([category, revenue]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: revenue,
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

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const totalRevenue = Object.values(salesByProduct).reduce((sum, p) => sum + p.revenue, 0);
  const totalItemsSold = Object.values(salesByProduct).reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">₱{totalRevenue.toFixed(0)}</p>
            </div>
            <DollarSign className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Items Sold</p>
              <p className="text-2xl font-bold">{totalItemsSold}</p>
            </div>
            <Package className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Transaction</p>
              <p className="text-2xl font-bold">
                ₱{transactions.length > 0 ? (transactions.reduce((sum, t) => sum + t.total, 0) / transactions.length).toFixed(0) : 0}
              </p>
            </div>
            <TrendingUp className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Product Categories</p>
              <p className="text-2xl font-bold">{Object.keys(salesByCategory).length}</p>
            </div>
            <Package className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Sales Trend (Last 8 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-600" /> Top Selling Products
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {topSellingProducts.map((product) => (
              <div key={product.name} className="flex justify-between items-center text-sm">
                <span className="font-medium">{product.name}</span>
                <div className="text-right">
                  <span className="font-bold text-green-600">{product.quantity} sold</span>
                  <span className="text-gray-500 ml-2">₱{product.revenue.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingDown className="text-orange-600" /> Slow Moving Products
          </h3>
          <div className="space-y-3">
            {slowMovingProducts.length > 0 ? (
              slowMovingProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600 capitalize">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-600">{product.sold} sold</p>
                      <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-gray-600">Price: ₱{product.price}</span>
                    <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded">Low Sales</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">All products have good sales volume</p>
            )}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="font-semibold text-sm text-yellow-800 mb-2">Recommendations:</p>
            <ul className="text-xs text-yellow-700 space-y-1">
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
