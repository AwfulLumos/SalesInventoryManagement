import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, Lock, Mail, AlertCircle, ShoppingCart, Package, BarChart3, Users, CheckCircle, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = login(email, password);
    if (success) {
      toast.success('Login successful!');
      // Navigation handled automatically after isLoggingIn resolves
    } else {
      setError('Invalid email or password. Please try again.');
      toast.error('Login failed');
    }
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setTimeout(() => {
      const success = login(userEmail, userPassword);
      if (success) {
        toast.success('Login successful!');
        // Navigation handled automatically after isLoggingIn resolves
      }
    }, 100);
  };

  const features = [
    { icon: ShoppingCart, title: 'Fast Checkout', desc: 'Process sales quickly with barcode scanning' },
    { icon: Package, title: 'Inventory Tracking', desc: 'Real-time stock monitoring and alerts' },
    { icon: BarChart3, title: 'Sales Analytics', desc: 'Detailed reports and insights' },
    { icon: Users, title: 'Customer Management', desc: 'Loyalty program and purchase history' },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#ffce99] to-[#ff9644] p-12 flex-col justify-between relative overflow-hidden text-[#562f00]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#fffdf1]/30 rounded-full blur-3xl -mr-48 -mt-48 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#562f00]/10 rounded-full blur-3xl -ml-48 -mb-48 animate-float-slower"></div>

        <div className="relative z-10 animate-fade-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-[#562f00]/10 border border-[#562f00]/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="text-[#562f00]" size={32} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#562f00]">PetShop POS</h1>
              <p className="text-[#562f00]/75 text-sm">Point of Sale System</p>
            </div>
          </div>

          <div className="space-y-6 mt-12">
            <div>
              <h2 className="text-4xl font-bold text-[#562f00] leading-tight mb-4">
                Manage Your Pet Supply Business with Ease
              </h2>
              <p className="text-[#562f00]/75 text-lg">
                Complete POS solution designed specifically for pet stores. Track inventory, manage customers, and grow your business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 bg-[#562f00]/08 backdrop-blur-sm rounded-xl p-4 border border-[#562f00]/20">
                    <div className="w-10 h-10 bg-[#562f00]/12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#562f00]" size={20} />
                    </div>
                    <div>
                      <h3 className="text-[#562f00] font-semibold">{feature.title}</h3>
                      <p className="text-[#562f00]/70 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative z-10 animate-fade-up">
          <div className="flex items-center gap-8 text-[#562f00]/80">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span className="text-sm">Secure & Reliable</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span className="text-sm">Easy to Use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Heart className="text-primary-foreground" size={32} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">PetShop POS</h1>
          </div>

          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/60 animate-fade-up">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back!</h2>
              <p className="text-muted-foreground">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-2 text-destructive animate-fade-up">
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-foreground/40" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none transition-all"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-foreground/40" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary/40"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl animate-glow-warm"
              >
                <LogIn size={20} />
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3 font-medium text-center">Quick Demo Access</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => quickLogin('admin@petshop.com', 'admin123')}
                  className="w-full text-left px-4 py-3 bg-[#ff9644]/10 border border-[#ff9644]/30 rounded-lg hover:bg-[#ff9644]/15 hover:border-[#ff9644]/40 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-foreground">Admin Account</p>
                      <p className="text-xs text-foreground/70 mt-0.5">admin@petshop.com</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-[#ff9644]/25 text-foreground rounded-full font-medium">ADMIN</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('mark.lopez@petshop.com', 'manager123')}
                  className="w-full text-left px-4 py-3 bg-[#ffce99]/35 border border-[#ffce99]/60 rounded-lg hover:bg-[#ffce99]/45 hover:border-[#ffce99]/70 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-foreground">Manager Account</p>
                      <p className="text-xs text-foreground/70 mt-0.5">mark.lopez@petshop.com</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-[#ffce99]/70 text-foreground rounded-full font-medium">MANAGER</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('lisa.tan@petshop.com', 'cashier123')}
                  className="w-full text-left px-4 py-3 bg-[#fffdf1] border border-[#ffce99]/50 rounded-lg hover:bg-[#ffce99]/25 hover:border-[#ffce99]/60 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-foreground">Cashier Account</p>
                      <p className="text-xs text-foreground/70 mt-0.5">lisa.tan@petshop.com</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-[#ffce99]/50 text-foreground rounded-full font-medium">CASHIER</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            © 2026 PetShop POS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
