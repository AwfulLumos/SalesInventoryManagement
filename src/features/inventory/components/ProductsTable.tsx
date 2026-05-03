import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Package, Plus } from 'lucide-react';
import { products } from '../../../shared/data/mockData';

interface ProductsTableProps {
  onAddNewItem: () => void;
}

export function ProductsTable({ onAddNewItem }: ProductsTableProps) {
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

  return (
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
        <button
          onClick={onAddNewItem}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ffce99] to-[#ff9644] text-[#562f00] hover:from-[#ffb870] hover:to-[#e07020] font-semibold rounded-lg shadow-sm transition-all text-sm whitespace-nowrap">
          <Plus size={18} />
          Add New Item
        </button>
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
  );
}
