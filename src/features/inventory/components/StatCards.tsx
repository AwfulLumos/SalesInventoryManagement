import { Package, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';

interface StatCardsProps {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  expiringCount: number;
}

export function StatCards({ totalProducts, lowStockCount, outOfStockCount, expiringCount }: StatCardsProps) {
  const statCards = [
    { label: 'Total Products', value: totalProducts, icon: <Package size={26} />, from: 'from-[#ffce99]', to: 'to-[#ff9644]', text: 'text-[#562f00]' },
    { label: 'Low Stock', value: lowStockCount, icon: <AlertTriangle size={26} />, from: 'from-[#ff9644]', to: 'to-[#e07020]', text: 'text-[#fffdf1]' },
    { label: 'Out of Stock', value: outOfStockCount, icon: <TrendingDown size={26} />, from: 'from-[#562f00]', to: 'to-[#3a1f00]', text: 'text-[#fffdf1]' },
    { label: 'Expiring Soon', value: expiringCount, icon: <Calendar size={26} />, from: 'from-[#ffce99]', to: 'to-[#ffb870]', text: 'text-[#562f00]' },
  ];

  return (
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
  );
}
