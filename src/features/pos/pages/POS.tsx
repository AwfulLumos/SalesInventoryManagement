import { useState, useRef, type FormEvent } from 'react';
import { Search, Scan, Trash2, CreditCard, Wallet, Smartphone, ShoppingCart } from 'lucide-react';
import { products, customers, Product, Customer } from '../../../shared/data/mockData';
import { toast } from 'sonner';

interface CartItem extends Product {
  quantity: number;
  discount: number;
}

export default function POS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [barcode, setBarcode] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const handleBarcodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      addToCart(product);
      setBarcode('');
      toast.success(`Added ${product.name}`);
    } else {
      toast.error('Product not found');
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, discount: 0 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const updateDiscount = (productId: string, discount: number) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, discount: Math.max(0, discount) } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    toast.success('Cart cleared');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + item.discount, 0);
  const total = subtotal - totalDiscount;

  const handleCheckout = (method: 'cash' | 'gcash' | 'card') => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    toast.success(`Payment processed via ${method.toUpperCase()}`);

    if (selectedCustomer) {
      const pointsEarned = Math.floor(total / 100);
      toast.success(`Customer earned ${pointsEarned} loyalty points!`);
    }

    clearCart();
    setShowCheckout(false);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-card rounded-lg shadow p-4 border border-border/60">
          <form onSubmit={handleBarcodeSubmit} className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Scan className="absolute left-3 top-3 text-muted-foreground/60" size={20} />
              <input
                ref={barcodeInputRef}
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Scan or enter barcode..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none"
              />
            </div>
            <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Add
            </button>
          </form>

          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground/60" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-4 max-h-[500px] overflow-y-auto border border-border/60">
          <h3 className="font-semibold mb-4">Quick Select Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredProducts.slice(0, 12).map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="p-3 border border-border rounded-lg hover:bg-primary/10 hover:border-primary/40 transition-colors text-left"
              >
                <div className="font-semibold text-sm line-clamp-2">{product.name}</div>
                <div className="text-primary font-bold mt-1">₱{product.price}</div>
                <div className="text-xs text-muted-foreground/80 mt-1">Stock: {product.stock}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow p-4 flex flex-col h-fit lg:sticky lg:top-6 border border-border/60">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Customer (Optional)</label>
          <select
            value={selectedCustomer?.id || ''}
            onChange={(e) => setSelectedCustomer(customers.find(c => c.id === e.target.value) || null)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none"
          >
            <option value="">Walk-in Customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name} - {customer.phone}
              </option>
            ))}
          </select>
          {selectedCustomer && (
            <div className="mt-2 p-2 bg-secondary/30 text-secondary-foreground rounded text-sm">
              Loyalty Points: <strong>{selectedCustomer.loyaltyPoints}</strong>
            </div>
          )}
        </div>

        <div className="flex-1 border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Cart Items</h3>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-destructive hover:text-destructive/80 text-sm flex items-center gap-1">
                <Trash2 size={16} /> Clear
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground/60">
              <ShoppingCart size={48} className="mx-auto mb-2 opacity-50" />
              <p>Cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="border rounded-lg p-3">
                  <div className="font-medium text-sm line-clamp-1">{item.name}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 bg-muted rounded hover:bg-muted/70"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      className="w-12 text-center border border-border rounded py-1 bg-input-background"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 bg-muted rounded hover:bg-muted/70"
                    >
                      +
                    </button>
                    <div className="ml-auto font-semibold">₱{item.price * item.quantity}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-xs text-muted-foreground">Discount:</label>
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => updateDiscount(item.id, parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 text-sm border border-border rounded bg-input-background"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">₱{subtotal.toFixed(2)}</span>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between text-destructive">
              <span>Discount:</span>
              <span>-₱{totalDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span className="text-primary">₱{total.toFixed(2)}</span>
          </div>
        </div>

        {!showCheckout ? (
          <button
            onClick={() => setShowCheckout(true)}
            disabled={cart.length === 0}
            className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed font-semibold"
          >
            Checkout
          </button>
        ) : (
          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleCheckout('cash')}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <Wallet size={20} /> Cash
            </button>
            <button
              onClick={() => handleCheckout('gcash')}
              className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 flex items-center justify-center gap-2"
            >
              <Smartphone size={20} /> GCash
            </button>
            <button
              onClick={() => handleCheckout('card')}
              className="w-full py-3 bg-[#562f00] text-[#fffdf1] rounded-lg hover:bg-[#4a2a00] flex items-center justify-center gap-2"
            >
              <CreditCard size={20} /> Card
            </button>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-full py-2 border border-border rounded-lg hover:bg-muted/40"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
