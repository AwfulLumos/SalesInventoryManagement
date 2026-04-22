import { useState } from 'react';
import { Search, Users, Award, TrendingUp, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { customers, transactions } from '../data/mockData';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalLoyaltyPoints = customers.reduce((sum, c) => sum + c.loyaltyPoints, 0);
  const avgPurchaseValue = customers.reduce((sum, c) => sum + c.totalPurchases, 0) / totalCustomers;
  const activeCustomers = customers.filter(c => {
    if (!c.lastPurchase) return false;
    const daysSinceLastPurchase = Math.floor((new Date().getTime() - new Date(c.lastPurchase).getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceLastPurchase <= 30;
  }).length;

  const getCustomerTransactions = (customerId: string) => {
    return transactions.filter(t => t.customerId === customerId);
  };

  const selectedCustomerData = selectedCustomer ? customers.find(c => c.id === selectedCustomer) : null;
  const selectedCustomerTransactions = selectedCustomer ? getCustomerTransactions(selectedCustomer) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
            <Users className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active (30 days)</p>
              <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Loyalty Points</p>
              <p className="text-2xl font-bold text-purple-600">{totalLoyaltyPoints}</p>
            </div>
            <Award className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Purchase Value</p>
              <p className="text-2xl font-bold">₱{avgPurchaseValue.toFixed(0)}</p>
            </div>
            <TrendingUp className="text-blue-600" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Customer Directory</h3>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer.id)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedCustomer === customer.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Phone size={14} /> {customer.phone}
                    </p>
                    {customer.email && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail size={14} /> {customer.email}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-purple-600 font-semibold">
                      <Award size={16} /> {customer.loyaltyPoints}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ₱{customer.totalPurchases.toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {selectedCustomerData ? (
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Details</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{selectedCustomerData.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone size={14} /> Phone
                    </p>
                    <p className="font-semibold">{selectedCustomerData.phone}</p>
                  </div>
                  {selectedCustomerData.email && (
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail size={14} /> Email
                      </p>
                      <p className="font-semibold text-sm">{selectedCustomerData.email}</p>
                    </div>
                  )}
                </div>

                {selectedCustomerData.address && (
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin size={14} /> Address
                    </p>
                    <p className="font-semibold">{selectedCustomerData.address}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar size={14} /> Member Since
                    </p>
                    <p className="font-semibold">{new Date(selectedCustomerData.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Purchase</p>
                    <p className="font-semibold">
                      {selectedCustomerData.lastPurchase ? new Date(selectedCustomerData.lastPurchase).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700">Loyalty Points</p>
                      <p className="text-3xl font-bold text-purple-600">{selectedCustomerData.loyaltyPoints}</p>
                    </div>
                    <Award className="text-purple-600" size={48} />
                  </div>
                  <p className="text-xs text-purple-600 mt-2">Redeem 1000 points for ₱100 discount</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">Total Purchases</p>
                  <p className="text-3xl font-bold text-blue-600">₱{selectedCustomerData.totalPurchases.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {getCustomerTransactions(selectedCustomerData.id).length} transactions
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Purchase History</h4>
                {selectedCustomerTransactions.length > 0 ? (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {selectedCustomerTransactions.map((transaction) => (
                      <div key={transaction.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-sm">{transaction.id}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(transaction.date).toLocaleString()}
                            </p>
                          </div>
                          <p className="font-bold text-blue-600">₱{transaction.total.toFixed(2)}</p>
                        </div>
                        <div className="text-xs text-gray-600">
                          {transaction.items.map((item, idx) => (
                            <p key={idx}>
                              {item.quantity}x {item.productName}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 capitalize">
                          Payment: {transaction.paymentMethod}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No purchase history</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Users size={64} className="mb-4 opacity-50" />
              <p>Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
