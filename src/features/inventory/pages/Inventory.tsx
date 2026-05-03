import { useState } from 'react';
import { products } from '../../../shared/data/mockData';
import { AddProductModal } from '../components/AddProductModal';
import { StatCards } from '../components/StatCards';
import { PurchaseOrders } from '../components/PurchaseOrders';
import { ProductsTable } from '../components/ProductsTable';

export default function Inventory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const expiringCount = products.filter(p => {
    if (!p.expiryDate) return false;
    const days = Math.floor((new Date(p.expiryDate).getTime() - Date.now()) / 86400000);
    return days <= 60 && days > 0;
  }).length;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <StatCards
        totalProducts={products.length}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
        expiringCount={expiringCount}
      />

      {/* Products table */}
      <ProductsTable onAddNewItem={() => setIsAddModalOpen(true)} />

      {/* Purchase Orders */}
      <PurchaseOrders />

      {/* Add New Item Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
