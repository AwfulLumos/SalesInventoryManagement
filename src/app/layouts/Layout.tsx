import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { ShoppingCart, Package, Users, DollarSign, BarChart3, UserCog, Settings, Menu, X, LogOut, Heart, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/context/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentUser } = useAuth();

  // Live clock — updates every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => navigate('/logout');

  const currentDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTimeStr = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
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

  const userInitials = currentUser?.name.split(' ').map(n => n[0]).join('').toUpperCase() ?? '?';

  return (
    <div className="flex h-screen bg-background">

      {/* ── Sidebar ── */}
      <aside
        className={`bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-[72px]'
          }`}
      >
        {/* Sidebar header */}
        <div className={`flex items-center border-b border-sidebar-border flex-shrink-0 p-4 h-16 ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
          {sidebarOpen ? (
            <>
              <div className="w-9 h-9 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Heart className="text-primary" size={18} fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-base leading-tight truncate">PetShop POS</h1>
                <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">Point of Sale</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 hover:bg-sidebar-accent/60 rounded-lg transition-colors flex-shrink-0"
                title="Collapse sidebar"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 hover:bg-sidebar-accent/60 rounded-lg transition-colors"
              title="Expand sidebar"
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : undefined}
                className={`flex items-center gap-3 py-2.5 rounded-lg transition-all duration-200 border-l-[3px] group ${sidebarOpen ? 'px-3' : 'px-0 justify-center'
                  } ${isActive
                    ? 'bg-sidebar-accent border-l-primary'
                    : 'border-l-transparent hover:bg-sidebar-accent/50 hover:border-l-primary/40'
                  }`}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-sidebar-foreground/70 group-hover:text-primary/80'
                    }`}
                />
                {sidebarOpen && (
                  <span className={`text-sm font-medium truncate ${isActive ? 'text-sidebar-foreground' : 'text-sidebar-foreground/80'}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar user footer */}
        <div className="border-t border-sidebar-border flex-shrink-0 p-3">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0 shadow-sm">
                {userInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate leading-tight">{currentUser?.name}</p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">{currentUser?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 hover:bg-sidebar-accent/60 rounded-lg text-sidebar-foreground/50 hover:text-destructive transition-colors flex-shrink-0"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm cursor-default shadow-sm"
                title={currentUser?.name}
              >
                {userInitials}
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 hover:bg-sidebar-accent/60 rounded-lg text-sidebar-foreground/50 hover:text-destructive transition-colors"
              >
                <LogOut size={15} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border px-6 h-16 flex items-center">
          <div className="flex justify-between items-center w-full gap-4">

            {/* Page title + date */}
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-foreground leading-tight truncate">
                {navItems.find(item => item.path === location.pathname)?.label ?? 'POS / Sales'}
              </h2>
              <p className="text-xs text-muted-foreground hidden sm:block">{currentDate}</p>
            </div>

            {/* Right side: clock + bell */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Live clock */}
              <div className="text-right hidden md:block">
                <p className="text-lg font-bold text-foreground font-mono tabular-nums leading-tight">{currentTimeStr}</p>
              </div>

              {/* Notification bell */}
              <button
                className="relative p-2 hover:bg-muted/60 rounded-lg transition-colors"
                title="Notifications"
              >
                <Bell size={20} className="text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
              </button>
            </div>
          </div>
        </header>

        <div
          key={location.pathname}
          className="p-6 animate-fade-up"
          style={{ animationDuration: '400ms', animationFillMode: 'both' }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
