import { useState } from 'react';
import { UserCog, Shield, User, Clock } from 'lucide-react';
import { users, transactions } from '../data/mockData';

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const activeUsers = users.filter(u => u.active).length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const managerCount = users.filter(u => u.role === 'manager').length;
  const cashierCount = users.filter(u => u.role === 'cashier').length;

  const getUserTransactions = (userId: string) => {
    return transactions.filter(t => t.cashierId === userId);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      case 'cashier':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  const selectedUserData = selectedUser ? users.find(u => u.id === selectedUser) : null;
  const selectedUserTransactions = selectedUser ? getUserTransactions(selectedUser) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <UserCog className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
            </div>
            <User className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-red-600">{adminCount}</p>
            </div>
            <Shield className="text-red-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Managers</p>
              <p className="text-2xl font-bold text-blue-600">{managerCount}</p>
            </div>
            <UserCog className="text-blue-600" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">User Directory</h3>

          <div className="space-y-2">
            {users.map((user) => {
              const userTransactions = getUserTransactions(user.id);
              const totalSales = userTransactions.reduce((sum, t) => sum + t.total, 0);

              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedUser === user.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  } ${!user.active ? 'opacity-50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className={`${user.active ? 'text-green-600' : 'text-red-600'} font-medium`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-gray-600">
                      {userTransactions.length} transactions • ₱{totalSales.toFixed(0)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {selectedUserData ? (
            <div>
              <h3 className="font-semibold text-lg mb-4">User Details</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-lg">{selectedUserData.name}</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedUserData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold">{selectedUserData.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(selectedUserData.role)}`}>
                      {selectedUserData.role.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedUserData.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedUserData.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock size={14} /> Created Date
                    </p>
                    <p className="font-semibold">{new Date(selectedUserData.createdDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock size={14} /> Last Login
                    </p>
                    <p className="font-semibold">
                      {selectedUserData.lastLogin ? new Date(selectedUserData.lastLogin).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border rounded-lg p-4">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <Shield size={16} /> Role Permissions
                  </p>
                  <ul className="space-y-1 text-sm">
                    {getRolePermissions(selectedUserData.role).map((permission, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex justify-between">
                  <span>Activity Log</span>
                  <span className="text-sm font-normal text-gray-600">
                    {selectedUserTransactions.length} transactions
                  </span>
                </h4>
                {selectedUserTransactions.length > 0 ? (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {selectedUserTransactions.map((transaction) => (
                      <div key={transaction.id} className="border rounded-lg p-3 text-sm">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-semibold">{transaction.id}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(transaction.date).toLocaleString()}
                            </p>
                          </div>
                          <p className="font-bold text-green-600">₱{transaction.total.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-600">
                          <span>{transaction.items.length} items</span>
                          <span className="capitalize px-2 py-1 bg-gray-100 rounded">
                            {transaction.paymentMethod}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">No transaction history</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <UserCog size={64} className="mb-4 opacity-50" />
              <p>Select a user to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Role Descriptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-red-600" size={24} />
              <h4 className="font-semibold text-red-600">Administrator</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Full system control with unrestricted access to all features and sensitive data.
            </p>
            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Typical users:</p>
              <p>Business owners, IT administrators</p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <UserCog className="text-blue-600" size={24} />
              <h4 className="font-semibold text-blue-600">Manager</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Can manage daily operations, inventory, and view business reports.
            </p>
            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Typical users:</p>
              <p>Store managers, supervisors</p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="text-green-600" size={24} />
              <h4 className="font-semibold text-green-600">Cashier</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Limited to point-of-sale operations and basic customer management.
            </p>
            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Typical users:</p>
              <p>Sales staff, front desk employees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
