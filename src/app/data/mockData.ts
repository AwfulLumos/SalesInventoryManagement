export interface Product {
  id: string;
  barcode: string;
  name: string;
  category: 'food' | 'treats' | 'toys' | 'supplies' | 'medicine' | 'grooming';
  price: number;
  stock: number;
  lowStockThreshold: number;
  supplier: string;
  expiryDate?: string;
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  loyaltyPoints: number;
  totalPurchases: number;
  lastPurchase?: string;
  joinDate: string;
}

export interface Transaction {
  id: string;
  date: string;
  customerId?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'gcash' | 'card';
  cashierId: string;
  cashierName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier';
  active: boolean;
  createdDate: string;
  lastLogin?: string;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  userId: string;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  status: 'pending' | 'received' | 'cancelled';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    cost: number;
  }[];
  total: number;
}

export const products: Product[] = [
  { id: '1', barcode: '8851234567890', name: 'Pedigree Adult Dog Food 10kg', category: 'food', price: 1450, stock: 45, lowStockThreshold: 10, supplier: 'Pet Food Distributors Inc.', expiryDate: '2026-12-15' },
  { id: '2', barcode: '8851234567891', name: 'Whiskas Cat Food 7kg', category: 'food', price: 890, stock: 32, lowStockThreshold: 10, supplier: 'Pet Food Distributors Inc.', expiryDate: '2027-01-20' },
  { id: '3', barcode: '8851234567892', name: 'Dog Chew Toy Rope', category: 'toys', price: 150, stock: 78, lowStockThreshold: 20, supplier: 'Pet Toys Wholesale' },
  { id: '4', barcode: '8851234567893', name: 'Cat Scratching Post', category: 'toys', price: 650, stock: 15, lowStockThreshold: 5, supplier: 'Pet Toys Wholesale' },
  { id: '5', barcode: '8851234567894', name: 'Dog Training Treats 500g', category: 'treats', price: 280, stock: 56, lowStockThreshold: 15, supplier: 'Pet Food Distributors Inc.', expiryDate: '2026-09-30' },
  { id: '6', barcode: '8851234567895', name: 'Cat Litter 5kg', category: 'supplies', price: 320, stock: 8, lowStockThreshold: 10, supplier: 'Pet Essentials Co.' },
  { id: '7', barcode: '8851234567896', name: 'Dog Shampoo 500ml', category: 'grooming', price: 245, stock: 42, lowStockThreshold: 10, supplier: 'Pet Care Products' },
  { id: '8', barcode: '8851234567897', name: 'Flea & Tick Treatment', category: 'medicine', price: 450, stock: 28, lowStockThreshold: 8, supplier: 'Veterinary Supplies Ltd.', expiryDate: '2027-03-15' },
  { id: '9', barcode: '8851234567898', name: 'Bird Cage Medium', category: 'supplies', price: 1200, stock: 6, lowStockThreshold: 3, supplier: 'Pet Habitats Inc.' },
  { id: '10', barcode: '8851234567899', name: 'Aquarium Filter 50L', category: 'supplies', price: 580, stock: 12, lowStockThreshold: 5, supplier: 'Aquatic Supplies Co.' },
  { id: '11', barcode: '8851234567900', name: 'Puppy Milk Replacer 400g', category: 'food', price: 380, stock: 22, lowStockThreshold: 8, supplier: 'Pet Food Distributors Inc.', expiryDate: '2026-11-05' },
  { id: '12', barcode: '8851234567901', name: 'Catnip Toy Mouse', category: 'toys', price: 95, stock: 65, lowStockThreshold: 20, supplier: 'Pet Toys Wholesale' },
  { id: '13', barcode: '8851234567902', name: 'Dog Collar Adjustable', category: 'supplies', price: 180, stock: 48, lowStockThreshold: 15, supplier: 'Pet Accessories Hub' },
  { id: '14', barcode: '8851234567903', name: 'Fish Food Pellets 100g', category: 'food', price: 120, stock: 85, lowStockThreshold: 20, supplier: 'Aquatic Supplies Co.', expiryDate: '2027-06-30' },
  { id: '15', barcode: '8851234567904', name: 'Hamster Bedding 1kg', category: 'supplies', price: 165, stock: 34, lowStockThreshold: 10, supplier: 'Small Pet Supplies' },
];

export const customers: Customer[] = [
  { id: 'C001', name: 'Maria Santos', phone: '09171234567', email: 'maria.santos@email.com', address: 'Quezon City', loyaltyPoints: 450, totalPurchases: 12580, lastPurchase: '2026-04-20', joinDate: '2025-08-15' },
  { id: 'C002', name: 'Juan Dela Cruz', phone: '09181234567', email: 'juan.delacruz@email.com', address: 'Makati', loyaltyPoints: 820, totalPurchases: 28940, lastPurchase: '2026-04-19', joinDate: '2025-03-10' },
  { id: 'C003', name: 'Ana Reyes', phone: '09191234567', loyaltyPoints: 230, totalPurchases: 7650, lastPurchase: '2026-04-18', joinDate: '2025-11-22' },
  { id: 'C004', name: 'Roberto Garcia', phone: '09201234567', email: 'roberto.g@email.com', address: 'Pasig City', loyaltyPoints: 1050, totalPurchases: 42300, lastPurchase: '2026-04-21', joinDate: '2024-12-05' },
  { id: 'C005', name: 'Sofia Mendoza', phone: '09211234567', loyaltyPoints: 340, totalPurchases: 11200, lastPurchase: '2026-04-17', joinDate: '2025-09-30' },
  { id: 'C006', name: 'Carlos Ramos', phone: '09221234567', email: 'carlos.ramos@email.com', loyaltyPoints: 150, totalPurchases: 4850, lastPurchase: '2026-04-15', joinDate: '2026-01-18' },
];

export const transactions: Transaction[] = [
  {
    id: 'TXN001',
    date: '2026-04-22T09:15:00',
    customerId: 'C001',
    items: [
      { productId: '1', productName: 'Pedigree Adult Dog Food 10kg', quantity: 2, price: 1450, discount: 0 },
      { productId: '5', productName: 'Dog Training Treats 500g', quantity: 1, price: 280, discount: 0 },
    ],
    subtotal: 3180,
    discount: 0,
    total: 3180,
    paymentMethod: 'gcash',
    cashierId: 'U001',
    cashierName: 'Pedro Cruz'
  },
  {
    id: 'TXN002',
    date: '2026-04-22T10:30:00',
    customerId: 'C002',
    items: [
      { productId: '2', productName: 'Whiskas Cat Food 7kg', quantity: 1, price: 890, discount: 50 },
      { productId: '6', productName: 'Cat Litter 5kg', quantity: 2, price: 320, discount: 0 },
      { productId: '12', productName: 'Catnip Toy Mouse', quantity: 3, price: 95, discount: 0 },
    ],
    subtotal: 1815,
    discount: 50,
    total: 1765,
    paymentMethod: 'cash',
    cashierId: 'U002',
    cashierName: 'Lisa Tan'
  },
  {
    id: 'TXN003',
    date: '2026-04-21T14:45:00',
    items: [
      { productId: '14', productName: 'Fish Food Pellets 100g', quantity: 4, price: 120, discount: 0 },
      { productId: '10', productName: 'Aquarium Filter 50L', quantity: 1, price: 580, discount: 0 },
    ],
    subtotal: 1060,
    discount: 0,
    total: 1060,
    paymentMethod: 'card',
    cashierId: 'U001',
    cashierName: 'Pedro Cruz'
  },
  {
    id: 'TXN004',
    date: '2026-04-21T16:20:00',
    customerId: 'C004',
    items: [
      { productId: '8', productName: 'Flea & Tick Treatment', quantity: 2, price: 450, discount: 0 },
      { productId: '7', productName: 'Dog Shampoo 500ml', quantity: 1, price: 245, discount: 0 },
    ],
    subtotal: 1145,
    discount: 100,
    total: 1045,
    paymentMethod: 'gcash',
    cashierId: 'U002',
    cashierName: 'Lisa Tan'
  },
  {
    id: 'TXN005',
    date: '2026-04-20T11:00:00',
    customerId: 'C001',
    items: [
      { productId: '13', productName: 'Dog Collar Adjustable', quantity: 1, price: 180, discount: 0 },
      { productId: '3', productName: 'Dog Chew Toy Rope', quantity: 2, price: 150, discount: 0 },
    ],
    subtotal: 480,
    discount: 0,
    total: 480,
    paymentMethod: 'cash',
    cashierId: 'U001',
    cashierName: 'Pedro Cruz'
  },
];

export const users: User[] = [
  { id: 'U001', name: 'Pedro Cruz', email: 'pedro.cruz@petshop.com', role: 'admin', active: true, createdDate: '2024-06-01', lastLogin: '2026-04-22T08:30:00' },
  { id: 'U002', name: 'Lisa Tan', email: 'lisa.tan@petshop.com', role: 'cashier', active: true, createdDate: '2024-08-15', lastLogin: '2026-04-22T09:00:00' },
  { id: 'U003', name: 'Mark Lopez', email: 'mark.lopez@petshop.com', role: 'manager', active: true, createdDate: '2024-07-10', lastLogin: '2026-04-21T17:45:00' },
  { id: 'U004', name: 'Jenny Flores', email: 'jenny.flores@petshop.com', role: 'cashier', active: false, createdDate: '2025-01-20', lastLogin: '2026-03-15T12:00:00' },
];

export const expenses: Expense[] = [
  { id: 'E001', date: '2026-04-20', category: 'Utilities', description: 'Electricity Bill', amount: 3500, userId: 'U001' },
  { id: 'E002', date: '2026-04-18', category: 'Rent', description: 'Monthly Store Rent', amount: 25000, userId: 'U001' },
  { id: 'E003', date: '2026-04-15', category: 'Supplies', description: 'Receipt Paper & Bags', amount: 1200, userId: 'U003' },
  { id: 'E004', date: '2026-04-12', category: 'Salaries', description: 'Staff Salaries - April', amount: 45000, userId: 'U001' },
  { id: 'E005', date: '2026-04-10', category: 'Maintenance', description: 'AC Repair', amount: 2800, userId: 'U003' },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    supplier: 'Pet Food Distributors Inc.',
    date: '2026-04-18',
    status: 'received',
    items: [
      { productId: '1', productName: 'Pedigree Adult Dog Food 10kg', quantity: 50, cost: 1200 },
      { productId: '2', productName: 'Whiskas Cat Food 7kg', quantity: 40, cost: 750 },
    ],
    total: 90000
  },
  {
    id: 'PO002',
    supplier: 'Pet Toys Wholesale',
    date: '2026-04-20',
    status: 'pending',
    items: [
      { productId: '3', productName: 'Dog Chew Toy Rope', quantity: 100, cost: 100 },
      { productId: '12', productName: 'Catnip Toy Mouse', quantity: 80, cost: 65 },
    ],
    total: 15200
  },
  {
    id: 'PO003',
    supplier: 'Pet Essentials Co.',
    date: '2026-04-15',
    status: 'received',
    items: [
      { productId: '6', productName: 'Cat Litter 5kg', quantity: 60, cost: 250 },
    ],
    total: 15000
  },
];
