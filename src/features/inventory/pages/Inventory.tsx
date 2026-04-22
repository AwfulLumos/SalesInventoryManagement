import { useState } from 'react';
import { Search, AlertTriangle, Package, Calendar, TrendingDown, FileText } from 'lucide-react';
import { products, purchaseOrders } from '../../../shared/data/mockData';

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.barcode.includes(searchQuery);
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStock = stockFilter === 'all' ||
                        (stockFilter === 'low' && p.stock <= p.lowStockThreshold) ||
                        (stockFilter === 'out' && p.stock === 0);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const expiringCount = products.filter(p => {
    if (!p.expiryDate) return false;
    const daysUntilExpiry = Math.floor((new Date(p.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60 && daysUntilExpiry > 0;
  }).length;

  const getStockStatus = (product: typeof products[0]) => {
    if (product.stock === 0) return { text: 'Out of Stock', color: 'text-destructive bg-destructive/10' };
    if (product.stock <= product.lowStockThreshold) return { text: 'Low Stock', color: 'text-primary bg-primary/10' };
    return { text: 'In Stock', color: 'text-secondary-foreground bg-secondary/40' };
  };

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const daysUntilExpiry = Math.floor((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return { text: 'Expired', color: 'text-destructive' };
    if (daysUntilExpiry <= 30) return { text: `Expires in ${daysUntilExpiry}d`, color: 'text-destructive' };
    if (daysUntilExpiry <= 60) return { text: `Expires in ${daysUntilExpiry}d`, color: 'text-primary' };
    return { text: `Expires in ${daysUntilExpiry}d`, color: 'text-muted-foreground' };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg shadow p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <Package className="text-primary" size={32} />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-primary">{lowStockCount}</p>
            </div>
            <AlertTriangle className="text-primary" size={32} />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold text-destructive">{outOfStockCount}</p>
            </div>
            <TrendingDown className="text-destructive" size={32} />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-4 border border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
              <p className="text-2xl font-bold text-primary">{expiringCount}</p>
            </div>
            <Calendar className="text-primary" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow p-6 border border-border/60">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground/60" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or barcode..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="treats">Treats</option>
            <option value="toys">Toys</option>
            <option value="supplies">Supplies</option>
            <option value="medicine">Medicine</option>
            <option value="grooming">Grooming</option>
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none"
          >
            <option value="all">All Stock Levels</option>
            <option value="low">Low Stock Only</option>
            <option value="out">Out of Stock Only</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Barcode</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Expiry</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product);
                const expiryStatus = getExpiryStatus(product.expiryDate);
                return (
                  <tr key={product.id} className="hover:bg-muted/40">
                    <td className="px-4 py-3 text-sm font-mono">{product.barcode}</td>
                    <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-sm capitalize">{product.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold">₱{product.price}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={product.stock <= product.lowStockThreshold ? 'font-bold text-primary' : ''}>
                        {product.stock}
                      </span>
                      <span className="text-muted-foreground/60 text-xs"> / {product.lowStockThreshold}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {expiryStatus ? (
                        <span className={`font-medium ${expiryStatus.color}`}>{expiryStatus.text}</span>
                      ) : (
                        <span className="text-muted-foreground/60">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{product.supplier}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow p-6 border border-border/60">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FileText size={20} /> Purchase Orders
        </h3>
        <div className="space-y-3">
          {purchaseOrders.map((po) => (
            <div key={po.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{po.id}</p>
                  <p className="text-sm text-muted-foreground">{po.supplier}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    po.status === 'received' ? 'bg-secondary/40 text-secondary-foreground' :
                    po.status === 'pending' ? 'bg-primary/10 text-primary' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {po.status.toUpperCase()}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{po.date}</p>
                </div>
              </div>
              <div className="border-t pt-2 mt-2">
                <p className="text-sm text-muted-foreground mb-1">Items:</p>
                {po.items.map((item, idx) => (
                  <p key={idx} className="text-sm">
                    {item.productName} - Qty: {item.quantity} @ ₱{item.cost}
                  </p>
                ))}
                <p className="font-bold text-right mt-2">Total: ₱{po.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
