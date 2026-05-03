import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-2xl rounded-2xl shadow-xl border border-border/60 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border/40 bg-muted/20">
          <h3 className="font-semibold text-xl">Add New Product</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Product Name</label>
            <input type="text" placeholder="e.g. Premium Dog Food" className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Barcode</label>
              <input type="text" placeholder="Scan or enter..." className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <select className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm">
                {['food', 'treats', 'toys', 'supplies', 'medicine', 'grooming'].map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Price (₱)</label>
              <input type="number" placeholder="0.00" className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Initial Stock</label>
              <input type="number" placeholder="0" className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm" />
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#ffce99] to-[#ff9644] text-[#562f00] hover:from-[#ffb870] hover:to-[#e07020] rounded-lg shadow-sm transition-all"
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
