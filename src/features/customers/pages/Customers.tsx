import { useState } from 'react';
import { Search, Users, Award, TrendingUp, Phone, Mail, MapPin, Calendar, Star } from 'lucide-react';
import { customers, transactions } from '../../../shared/data/mockData';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalLoyaltyPts = customers.reduce((s, c) => s + c.loyaltyPoints, 0);
  const avgPurchase = customers.reduce((s, c) => s + c.totalPurchases, 0) / totalCustomers;
  const activeCustomers = customers.filter(c => {
    if (!c.lastPurchase) return false;
    return Math.floor((Date.now() - new Date(c.lastPurchase).getTime()) / 86400000) <= 30;
  }).length;

  const getCustomerTransactions = (id: string) => transactions.filter(t => t.customerId === id);
  const selectedData = selectedCustomer ? customers.find(c => c.id === selectedCustomer) : null;
  const selectedTxns = selectedCustomer ? getCustomerTransactions(selectedCustomer) : [];

  const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const statCards = [
    { label: 'Total Customers', value: totalCustomers, icon: <Users size={26} />, from: 'from-[#ffce99]', to: 'to-[#ff9644]', text: 'text-[#562f00]' },
    { label: 'Active (30 days)', value: activeCustomers, icon: <TrendingUp size={26} />, from: 'from-[#ff9644]', to: 'to-[#e07020]', text: 'text-[#fffdf1]' },
    { label: 'Total Loyalty Pts', value: totalLoyaltyPts.toLocaleString(), icon: <Award size={26} />, from: 'from-[#ffce99]', to: 'to-[#ffb870]', text: 'text-[#562f00]' },
    { label: 'Avg Purchase', value: `₱${avgPurchase.toFixed(0)}`, icon: <TrendingUp size={26} />, from: 'from-[#562f00]', to: 'to-[#3a1f00]', text: 'text-[#fffdf1]' },
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
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer list */}
        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          <h3 className="font-semibold text-lg mb-4">Customer Directory</h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 text-muted-foreground/60" size={18} />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm" />
          </div>
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredCustomers.map(customer => {
              const isActive = selectedCustomer === customer.id;
              return (
                <button key={customer.id} onClick={() => setSelectedCustomer(customer.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 ${isActive ? 'border-primary/50 bg-primary/10 shadow-sm' : 'border-border/60 hover:bg-muted/30 hover:border-border'
                    }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {/* Avatar initial */}
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                        {customer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Phone size={11} /> {customer.phone}
                        </p>
                        {customer.email && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail size={11} /> {customer.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="flex items-center gap-1 text-primary font-semibold text-sm justify-end">
                        <Star size={13} fill="currentColor" /> {customer.loyaltyPoints}
                      </div>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">₱{customer.totalPurchases.toLocaleString()}</p>
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredCustomers.length === 0 && (
              <div className="text-center py-10 text-muted-foreground/50">
                <Users size={36} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No customers found</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer detail */}
        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          {selectedData ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffce99] to-[#ff9644] flex items-center justify-center text-[#562f00] font-bold text-xl shadow-md">
                  {selectedData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{selectedData.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">Customer</p>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Phone size={12} /> Phone</p>
                  <p className="font-semibold text-sm">{selectedData.phone}</p>
                </div>
                {selectedData.email && (
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Mail size={12} /> Email</p>
                    <p className="font-semibold text-sm truncate">{selectedData.email}</p>
                  </div>
                )}
                {selectedData.address && (
                  <div className="bg-muted/30 rounded-lg p-3 col-span-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><MapPin size={12} /> Address</p>
                    <p className="font-semibold text-sm">{selectedData.address}</p>
                  </div>
                )}
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Calendar size={12} /> Member Since</p>
                  <p className="font-semibold text-sm">{fmtDate(selectedData.joinDate)}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Last Purchase</p>
                  <p className="font-semibold text-sm">{selectedData.lastPurchase ? fmtDate(selectedData.lastPurchase) : 'Never'}</p>
                </div>
              </div>

              {/* Loyalty + Total spend */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gradient-to-br from-[#ffce99] to-[#ff9644] text-[#562f00] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm opacity-80">Loyalty Points</p>
                    <Award size={20} />
                  </div>
                  <p className="text-2xl font-bold">{selectedData.loyaltyPoints}</p>
                  <p className="text-xs opacity-70 mt-1">Redeem 1000 pts = ₱100</p>
                </div>
                <div className="bg-gradient-to-br from-[#562f00] to-[#3a1f00] text-[#fffdf1] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm opacity-80">Total Spent</p>
                    <TrendingUp size={20} />
                  </div>
                  <p className="text-2xl font-bold">₱{selectedData.totalPurchases.toLocaleString()}</p>
                  <p className="text-xs opacity-70 mt-1">{getCustomerTransactions(selectedData.id).length} transactions</p>
                </div>
              </div>

              {/* Purchase history */}
              <div className="border-t border-border/50 pt-4">
                <h4 className="font-semibold mb-3 text-sm">Purchase History</h4>
                {selectedTxns.length > 0 ? (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {selectedTxns.map(t => (
                      <div key={t.id} className="border border-border/50 rounded-lg p-3 hover:bg-muted/20 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-semibold text-sm">{t.id}</p>
                            <p className="text-xs text-muted-foreground">{fmtDate(t.date)}</p>
                          </div>
                          <p className="font-bold text-primary text-sm">₱{t.total.toFixed(2)}</p>
                        </div>
                        <div className="text-xs text-muted-foreground/80 space-y-0.5">
                          {t.items.map((item, i) => (
                            <p key={i}>{item.quantity}× {item.productName}</p>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground/60 mt-1 capitalize">via {t.paymentMethod}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground/60 py-4 text-center">No purchase history</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50 py-20">
              <Users size={56} className="mb-4 opacity-30 animate-float-slow" />
              <p className="font-medium">Select a customer</p>
              <p className="text-sm mt-1">to view their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
