import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { ShoppingCart, Package, Users, DollarSign, BarChart3, UserCog, Settings, Menu, X, LogOut, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../features/auth/context/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser } = useAuth();

  const handleLogout = () => {
    navigate('/logout');
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
    <div className="flex h-screen bg-background">
      <aside className={`bg-sidebar text-sidebar-foreground transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div>
                <h1 className="font-bold text-lg">PetShop POS</h1>
                <p className="text-xs text-sidebar-foreground/70">Point of Sale</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto">
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-sidebar-accent/60 rounded">
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/60'
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
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {navItems.find(item => item.path === location.pathname)?.label || 'POS / Sales'}
              </h2>
              <p className="text-sm text-muted-foreground">{currentDate}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Logged in as</p>
                <p className="font-semibold">{currentUser?.name} ({currentUser?.role})</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                {currentUser?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div key={location.pathname} className="p-6 animate-fade-up" style={{ animationDuration: '400ms', animationFillMode: 'both' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
