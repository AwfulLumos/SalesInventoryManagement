import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, Lock, Mail, AlertCircle, ShoppingCart, Package, BarChart3, Users, CheckCircle, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

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
      navigate('/');
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
        navigate('/');
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl -ml-48 -mb-48"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="text-blue-600" size={32} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">PetShop POS</h1>
              <p className="text-blue-100 text-sm">Point of Sale System</p>
            </div>
          </div>

          <div className="space-y-6 mt-12">
            <div>
              <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                Manage Your Pet Supply Business with Ease
              </h2>
              <p className="text-blue-100 text-lg">
                Complete POS solution designed specifically for pet stores. Track inventory, manage customers, and grow your business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{feature.title}</h3>
                      <p className="text-blue-100 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-8 text-blue-100">
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Heart className="text-white" size={32} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">PetShop POS</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 animate-shake">
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <LogIn size={20} />
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3 font-medium text-center">Quick Demo Access</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => quickLogin('admin@petshop.com', 'admin123')}
                  className="w-full text-left px-4 py-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-red-700">Admin Account</p>
                      <p className="text-xs text-red-600 mt-0.5">admin@petshop.com</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-red-200 text-red-700 rounded-full font-medium">ADMIN</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('mark.lopez@petshop.com', 'manager123')}
                  className="w-full text-left px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-blue-700">Manager Account</p>
                      <p className="text-xs text-blue-600 mt-0.5">mark.lopez@petshop.com</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-blue-200 text-blue-700 rounded-full font-medium">MANAGER</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('lisa.tan@petshop.com', 'cashier123')}
                  className="w-full text-left px-4 py-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-green-700">Cashier Account</p>
                      <p className="text-xs text-green-600 mt-0.5">lisa.tan@petshop.com</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-green-200 text-green-700 rounded-full font-medium">CASHIER</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            © 2026 PetShop POS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
