import { useState } from 'react';
import { Search, AlertTriangle, Package, Calendar, TrendingDown, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { products, purchaseOrders } from '../../../shared/data/mockData';

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'name' | 'stock' | 'price'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const filteredProducts = products
    .filter(p => {
      const s = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery);
      const c = categoryFilter === 'all' || p.category === categoryFilter;
      const st = stockFilter === 'all' ||
        (stockFilter === 'low' && p.stock <= p.lowStockThreshold && p.stock > 0) ||
        (stockFilter === 'out' && p.stock === 0);
      return s && c && st;
    })
    .sort((a, b) => {
      const m = sortDir === 'asc' ? 1 : -1;
      if (sortField === 'name') return m * a.name.localeCompare(b.name);
      if (sortField === 'stock') return m * (a.stock - b.stock);
      if (sortField === 'price') return m * (a.price - b.price);
      return 0;
    });

  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const expiringCount = products.filter(p => {
    if (!p.expiryDate) return false;
    const days = Math.floor((new Date(p.expiryDate).getTime() - Date.now()) / 86400000);
    return days <= 60 && days > 0;
  }).length;

  const getStockStatus = (p: typeof products[0]) => {
    if (p.stock === 0) return { text: 'Out of Stock', cls: 'text-red-700 bg-red-100' };
    if (p.stock <= p.lowStockThreshold) return { text: 'Low Stock', cls: 'text-primary bg-primary/15' };
    return { text: 'In Stock', cls: 'text-[#1a5c1e] bg-[#d4f5d8]' };
  };

  const getExpiryStatus = (d?: string) => {
    if (!d) return null;
    const days = Math.floor((new Date(d).getTime() - Date.now()) / 86400000);
    if (days < 0) return { text: 'Expired', cls: 'text-red-700 font-semibold' };
    if (days <= 30) return { text: `Expires in ${days}d`, cls: 'text-red-600 font-semibold' };
    if (days <= 60) return { text: `Expires in ${days}d`, cls: 'text-primary' };
    return { text: `${days}d left`, cls: 'text-muted-foreground' };
  };

  const SortIcon = ({ f }: { f: typeof sortField }) =>
    sortField === f
      ? sortDir === 'asc' ? <ChevronUp size={13} className="inline ml-0.5" /> : <ChevronDown size={13} className="inline ml-0.5" />
      : <ChevronDown size={13} className="inline ml-0.5 opacity-25" />;

  const poStyle: Record<string, string> = {
    received: 'bg-[#d4f5d8] text-[#1a5c1e]',
    pending: 'bg-primary/15 text-primary',
    ordered: 'bg-secondary/50 text-secondary-foreground',
  };

  const statCards = [
    { label: 'Total Products', value: products.length, icon: <Package size={26} />, from: 'from-[#ffce99]', to: 'to-[#ff9644]', text: 'text-[#562f00]' },
    { label: 'Low Stock', value: lowStockCount, icon: <AlertTriangle size={26} />, from: 'from-[#ff9644]', to: 'to-[#e07020]', text: 'text-[#fffdf1]' },
    { label: 'Out of Stock', value: outOfStockCount, icon: <TrendingDown size={26} />, from: 'from-[#562f00]', to: 'to-[#3a1f00]', text: 'text-[#fffdf1]' },
    { label: 'Expiring Soon', value: expiringCount, icon: <Calendar size={26} />, from: 'from-[#ffce99]', to: 'to-[#ffb870]', text: 'text-[#562f00]' },
  ];

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
            <p className="text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="bg-card rounded-xl shadow border border-border/60 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-3 p-4 border-b border-border/60 bg-muted/20">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-muted-foreground/60" size={18} />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or barcode..."
              className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm" />
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm">
            <option value="all">All Categories</option>
            {['food', 'treats', 'toys', 'supplies', 'medicine', 'grooming'].map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <select value={stockFilter} onChange={e => setStockFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm">
            <option value="all">All Stock Levels</option>
            <option value="low">Low Stock Only</option>
            <option value="out">Out of Stock Only</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border/40">
                {[
                  { label: 'Barcode', field: null },
                  { label: 'Product Name', field: 'name' as const },
                  { label: 'Category', field: null },
                  { label: 'Price', field: 'price' as const },
                  { label: 'Stock', field: 'stock' as const },
                  { label: 'Status', field: null },
                  { label: 'Expiry', field: null },
                  { label: 'Supplier', field: null },
                ].map(col => (
                  <th key={col.label}
                    onClick={col.field ? () => toggleSort(col.field!) : undefined}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground ${col.field ? 'cursor-pointer hover:text-foreground' : ''}`}>
                    {col.label}{col.field && <SortIcon f={col.field} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredProducts.map(product => {
                const ss = getStockStatus(product);
                const es = getExpiryStatus(product.expiryDate);
                const pct = Math.min((product.stock / Math.max(product.lowStockThreshold * 3, 1)) * 100, 100);
                return (
                  <tr key={product.id} className="hover:bg-muted/25 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{product.barcode}</td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-secondary/40 text-secondary-foreground rounded-full text-xs capitalize font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">₱{product.price}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className={product.stock <= product.lowStockThreshold ? 'font-bold text-primary' : ''}>{product.stock}</span>
                        <span className="text-muted-foreground/40 text-xs">/{product.lowStockThreshold}</span>
                      </div>
                      <div className="w-14 bg-muted rounded-full h-1.5 mt-1">
                        <div className={`h-1.5 rounded-full transition-all ${product.stock === 0 ? 'bg-red-500' : product.stock <= product.lowStockThreshold ? 'bg-yellow-400' : 'bg-green-500'}`}
                          style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ss.cls}`}>{ss.text}</span>
                    </td>
                    <td className="px-4 py-3">
                      {es ? <span className={`text-xs ${es.cls}`}>{es.text}</span>
                        : <span className="text-muted-foreground/30 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{product.supplier}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground/50">
              <Package size={40} className="mx-auto mb-2 opacity-40" />
              <p>No products match your filters</p>
            </div>
          )}
        </div>
        <div className="px-4 py-2.5 border-t border-border/40 bg-muted/10 text-xs text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Purchase Orders */}
      <div className="bg-card rounded-xl shadow border border-border/60 p-6">
        <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
          <FileText size={20} className="text-primary" /> Purchase Orders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchaseOrders.map(po => (
            <div key={po.id} className="border border-border/60 rounded-xl p-4 hover:bg-muted/20 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{po.id}</p>
                  <p className="text-sm text-muted-foreground">{po.supplier}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">{po.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${poStyle[po.status] ?? 'bg-muted text-muted-foreground'}`}>
                  {po.status.toUpperCase()}
                </span>
              </div>
              <div className="border-t border-border/40 pt-3 space-y-1">
                {po.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate mr-2">{item.productName}</span>
                    <span className="font-medium flex-shrink-0">×{item.quantity} @ ₱{item.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-border/40 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{po.items.length} line item{po.items.length !== 1 ? 's' : ''}</span>
                <span className="font-bold text-primary">₱{po.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
