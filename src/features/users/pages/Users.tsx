import { useState } from 'react';
import { Clock, Shield, User, UserCog } from 'lucide-react';
import { transactions, users } from '../../../shared/data/mockData';

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const activeUsers = users.filter((user) => user.active).length;
  const adminCount = users.filter((user) => user.role === 'admin').length;
  const managerCount = users.filter((user) => user.role === 'manager').length;

  const getUserTransactions = (userId: string) => {
    return transactions.filter((transaction) => transaction.cashierId === userId);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-destructive/15 text-destructive';
      case 'manager':
        return 'bg-primary/15 text-primary';
      case 'cashier':
        return 'bg-secondary/40 text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRolePermissions = (role: string) => {
    const permissions = {
      admin: [
        'Full system access',
        'Manage users and roles',
        'View all financial reports',
        'Manage inventory and pricing',
        'Process refunds and voids',
        'Configure system settings',
      ],
      manager: [
        'View financial reports',
        'Manage inventory',
        'Process transactions',
        'View customer data',
        'Generate reports',
        'Manage purchase orders',
      ],
      cashier: [
        'Process transactions',
        'View product catalog',
        'Register customers',
        'Apply discounts (limited)',
        'Print receipts',
      ],
    };

    return permissions[role as keyof typeof permissions] || [];
  };

  const selectedUserData = selectedUser ? users.find((user) => user.id === selectedUser) : null;
  const selectedUserTransactions = selectedUser ? getUserTransactions(selectedUser) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border/60 bg-card p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <UserCog className="text-primary" size={32} />
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-primary">{activeUsers}</p>
            </div>
            <User className="text-primary" size={32} />
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>
              <p className="text-2xl font-bold text-destructive">{adminCount}</p>
            </div>
            <Shield className="text-destructive" size={32} />
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Managers</p>
              <p className="text-2xl font-bold text-primary">{managerCount}</p>
            </div>
            <UserCog className="text-primary" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border/60 bg-card p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">User Directory</h3>

          <div className="space-y-2">
            {users.map((user) => {
              const userTransactions = getUserTransactions(user.id);
              const totalSales = userTransactions.reduce((sum, transaction) => sum + transaction.total, 0);

              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${
                    selectedUser === user.id ? 'border-primary/50 bg-primary/10' : 'border-border hover:bg-muted/40'
                  } ${!user.active ? 'opacity-50' : ''}`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${user.active ? 'text-primary' : 'text-destructive'} font-medium`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-muted-foreground">
                      {userTransactions.length} transactions • P{totalSales.toFixed(0)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-6 shadow">
          {selectedUserData ? (
            <div>
              <h3 className="mb-4 text-lg font-semibold">User Details</h3>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="text-lg font-semibold">{selectedUserData.name}</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {selectedUserData.name
                      .split(' ')
                      .map((namePart) => namePart[0])
                      .join('')}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-semibold">{selectedUserData.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getRoleColor(selectedUserData.role)}`}>
                      {selectedUserData.role.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                        selectedUserData.active
                          ? 'bg-secondary/40 text-secondary-foreground'
                          : 'bg-destructive/15 text-destructive'
                      }`}
                    >
                      {selectedUserData.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} /> Created Date
                    </p>
                    <p className="font-semibold">{new Date(selectedUserData.createdDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} /> Last Login
                    </p>
                    <p className="font-semibold">
                      {selectedUserData.lastLogin ? new Date(selectedUserData.lastLogin).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="mb-2 flex items-center gap-2 font-semibold">
                    <Shield size={16} /> Role Permissions
                  </p>
                  <ul className="space-y-1 text-sm">
                    {getRolePermissions(selectedUserData.role).map((permission, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="mb-3 flex justify-between font-semibold">
                  <span>Activity Log</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {selectedUserTransactions.length} transactions
                  </span>
                </h4>
                {selectedUserTransactions.length > 0 ? (
                  <div className="max-h-[300px] space-y-2 overflow-y-auto">
                    {selectedUserTransactions.map((transaction) => (
                      <div key={transaction.id} className="rounded-lg border border-border p-3 text-sm">
                        <div className="mb-1 flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{transaction.id}</p>
                            <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleString()}</p>
                          </div>
                          <p className="font-bold text-primary">P{transaction.total.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{transaction.items.length} items</span>
                          <span className="rounded bg-muted px-2 py-1 capitalize">{transaction.paymentMethod}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">No transaction history</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground/60">
              <UserCog size={64} className="mb-4 opacity-50" />
              <p>Select a user to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Role Descriptions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center gap-2">
              <Shield className="text-destructive" size={24} />
              <h4 className="font-semibold text-destructive">Administrator</h4>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Full system control with unrestricted access to all features and sensitive data.
            </p>
            <div className="text-xs text-muted-foreground/80">
              <p className="mb-1 font-medium">Typical users:</p>
              <p>Business owners, IT administrators</p>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center gap-2">
              <UserCog className="text-primary" size={24} />
              <h4 className="font-semibold text-primary">Manager</h4>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Can manage daily operations, inventory, and view business reports.
            </p>
            <div className="text-xs text-muted-foreground/80">
              <p className="mb-1 font-medium">Typical users:</p>
              <p>Store managers, supervisors</p>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center gap-2">
              <User className="text-secondary-foreground" size={24} />
              <h4 className="font-semibold text-secondary-foreground">Cashier</h4>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Limited to point-of-sale operations and basic customer management.
            </p>
            <div className="text-xs text-muted-foreground/80">
              <p className="mb-1 font-medium">Typical users:</p>
              <p>Sales staff, front desk employees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
