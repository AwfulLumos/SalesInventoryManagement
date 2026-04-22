import { useState } from 'react';
import { Clock, Shield, User, UserCog, CheckCircle } from 'lucide-react';
import { transactions, users } from '../../../shared/data/mockData';

const getRoleStyle = (role: string) => {
  switch (role) {
    case 'admin': return { badge: 'bg-[#562f00] text-[#fffdf1]', from: 'from-[#562f00]', to: 'to-[#3a1f00]', text: 'text-[#fffdf1]', icon: <Shield size={16} /> };
    case 'manager': return { badge: 'bg-primary/15 text-primary', from: 'from-[#ff9644]', to: 'to-[#e07020]', text: 'text-[#fffdf1]', icon: <UserCog size={16} /> };
    default: return { badge: 'bg-secondary/50 text-secondary-foreground', from: 'from-[#ffce99]', to: 'to-[#ff9644]', text: 'text-[#562f00]', icon: <User size={16} /> };
  }
};

const getRolePermissions = (role: string) => {
  const p = {
    admin: ['Full system access', 'Manage users & roles', 'All financial reports', 'Manage inventory & pricing', 'Process refunds & voids', 'Configure system settings'],
    manager: ['View financial reports', 'Manage inventory', 'Process transactions', 'View customer data', 'Generate reports', 'Manage purchase orders'],
    cashier: ['Process transactions', 'View product catalog', 'Register customers', 'Apply discounts (limited)', 'Print receipts'],
  };
  return p[role as keyof typeof p] || [];
};

const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const activeUsers = users.filter(u => u.active).length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const managerCount = users.filter(u => u.role === 'manager').length;

  const getUserTransactions = (id: string) => transactions.filter(t => t.cashierId === id);
  const selectedData = selectedUser ? users.find(u => u.id === selectedUser) : null;
  const selectedTxns = selectedUser ? getUserTransactions(selectedUser) : [];

  const statCards = [
    { label: 'Total Users', value: users.length, icon: <UserCog size={26} />, from: 'from-[#ffce99]', to: 'to-[#ff9644]', text: 'text-[#562f00]' },
    { label: 'Active Users', value: activeUsers, icon: <User size={26} />, from: 'from-[#ff9644]', to: 'to-[#e07020]', text: 'text-[#fffdf1]' },
    { label: 'Administrators', value: adminCount, icon: <Shield size={26} />, from: 'from-[#562f00]', to: 'to-[#3a1f00]', text: 'text-[#fffdf1]' },
    { label: 'Managers', value: managerCount, icon: <UserCog size={26} />, from: 'from-[#ffce99]', to: 'to-[#ffb870]', text: 'text-[#562f00]' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User list */}
        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          <h3 className="font-semibold text-lg mb-4">User Directory</h3>
          <div className="space-y-2">
            {users.map(user => {
              const rs = getRoleStyle(user.role);
              const txns = getUserTransactions(user.id);
              const totalSales = txns.reduce((s, t) => s + t.total, 0);
              const isSelected = selectedUser === user.id;
              return (
                <button key={user.id} onClick={() => setSelectedUser(user.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-150 ${isSelected ? 'border-primary/50 bg-primary/10 shadow-sm' : 'border-border/60 hover:bg-muted/30 hover:border-border'
                    } ${!user.active ? 'opacity-50' : ''}`}>
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rs.from} ${rs.to} ${rs.text} flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm`}>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${rs.badge}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1.5 text-xs">
                        <span className={user.active ? 'text-[#1a5c1e] font-medium' : 'text-destructive font-medium'}>
                          {user.active ? '● Active' : '○ Inactive'}
                        </span>
                        <span className="text-muted-foreground">{txns.length} txns · ₱{totalSales.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* User detail */}
        <div className="bg-card rounded-xl shadow border border-border/60 p-6">
          {selectedData ? (() => {
            const rs = getRoleStyle(selectedData.role);
            const perms = getRolePermissions(selectedData.role);
            return (
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${rs.from} ${rs.to} ${rs.text} flex items-center justify-center text-2xl font-bold shadow-md`}>
                    {selectedData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{selectedData.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold mt-1 ${rs.badge}`}>
                      {rs.icon} {selectedData.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-muted/30 rounded-lg p-3 col-span-2">
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <p className="font-semibold text-sm">{selectedData.email}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5"><Clock size={11} /> Created</p>
                    <p className="font-semibold text-sm">{fmtDate(selectedData.createdDate)}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5"><Clock size={11} /> Last Login</p>
                    <p className="font-semibold text-sm">{selectedData.lastLogin ? fmtDate(selectedData.lastLogin) : 'Never'}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                    <span className={`text-sm font-semibold ${selectedData.active ? 'text-[#1a5c1e]' : 'text-destructive'}`}>
                      {selectedData.active ? '● Active' : '○ Inactive'}
                    </span>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">Transactions</p>
                    <p className="font-semibold text-sm">{selectedTxns.length}</p>
                  </div>
                </div>

                {/* Permissions */}
                <div className="bg-muted/20 border border-border/50 rounded-xl p-4 mb-4">
                  <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Shield size={15} className="text-primary" /> Role Permissions
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {perms.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={13} className="text-primary flex-shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity log */}
                <div className="border-t border-border/50 pt-4">
                  <h4 className="font-semibold text-sm mb-3">Recent Activity</h4>
                  {selectedTxns.length > 0 ? (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {selectedTxns.map(t => (
                        <div key={t.id} className="border border-border/50 rounded-lg p-3 hover:bg-muted/20 transition-colors text-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{t.id}</p>
                              <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()}</p>
                            </div>
                            <p className="font-bold text-primary">₱{t.total.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{t.items.length} items</span>
                            <span className="px-2 py-0.5 bg-muted rounded-full capitalize">{t.paymentMethod}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground/60 py-4 text-center">No transactions recorded</p>
                  )}
                </div>
              </div>
            );
          })() : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50 py-20">
              <UserCog size={56} className="mb-4 opacity-30 animate-float-slow" />
              <p className="font-medium">Select a user</p>
              <p className="text-sm mt-1">to view their profile</p>
            </div>
          )}
        </div>
      </div>

      {/* Role descriptions */}
      <div className="bg-card rounded-xl shadow border border-border/60 p-6">
        <h3 className="font-semibold text-lg mb-5">Role Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { role: 'admin', title: 'Administrator', desc: 'Full system control with unrestricted access to all features and sensitive data.', typical: 'Business owners, IT administrators' },
            { role: 'manager', title: 'Manager', desc: 'Can manage daily operations, inventory, and view business reports.', typical: 'Store managers, supervisors' },
            { role: 'cashier', title: 'Cashier', desc: 'Limited to point-of-sale operations and basic customer management.', typical: 'Sales staff, front desk employees' },
          ].map(r => {
            const rs = getRoleStyle(r.role);
            return (
              <div key={r.role} className={`bg-gradient-to-br ${rs.from} ${rs.to} ${rs.text} rounded-xl p-5 shadow-md`}>
                <div className="flex items-center gap-2 mb-3">
                  {rs.icon}
                  <h4 className="font-bold">{r.title}</h4>
                </div>
                <p className="text-sm opacity-80 mb-3">{r.desc}</p>
                <p className="text-xs opacity-60 font-medium">Typical users:</p>
                <p className="text-xs opacity-75">{r.typical}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
