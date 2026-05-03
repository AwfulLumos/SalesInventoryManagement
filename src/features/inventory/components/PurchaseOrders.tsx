import { FileText } from 'lucide-react';
import { purchaseOrders } from '../../../shared/data/mockData';

export function PurchaseOrders() {
  const poStyle: Record<string, string> = {
    received: 'bg-[#d4f5d8] text-[#1a5c1e]',
    pending: 'bg-primary/15 text-primary',
    ordered: 'bg-secondary/50 text-secondary-foreground',
  };

  return (
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
  );
}
