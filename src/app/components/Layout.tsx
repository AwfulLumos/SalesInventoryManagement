import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { ShoppingCart, Package, Users, DollarSign, BarChart3, UserCog, Settings, Menu, X, LogOut, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navItems = [
    { path: '/', label: 'POS / Sales', icon: ShoppingCart },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/financial', label: 'Financial', icon: DollarSign },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/users', label: 'Users', icon: UserCog },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className={`bg-blue-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b border-blue-800">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Heart className="text-blue-600" size={20} fill="currentColor" />
              </div>
              <div>
                <h1 className="font-bold text-lg">PetShop POS</h1>
                <p className="text-xs text-blue-200">Point of Sale</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto">
              <Heart className="text-blue-600" size={20} fill="currentColor" />
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-blue-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'POS / Sales'}
              </h2>
              <p className="text-sm text-gray-500">{currentDate}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-semibold">{currentUser?.name} ({currentUser?.role})</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
