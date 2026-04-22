import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { users } from '../../../shared/data/mockData';

interface AuthContextType {
  currentUser: typeof users[0] | null;
  isInitializing: boolean;
  isLoggingIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SAMPLE_CREDENTIALS = [
  { email: 'admin@petshop.com', password: 'admin123', userId: 'U001' },
  { email: 'pedro.cruz@petshop.com', password: 'admin123', userId: 'U001' },
  { email: 'lisa.tan@petshop.com', password: 'cashier123', userId: 'U002' },
  { email: 'mark.lopez@petshop.com', password: 'manager123', userId: 'U003' },
];

const AUTH_STORAGE_KEY = 'sim.auth.userId';
const MIN_BOOT_SCREEN_MS = 1100;
const LOGIN_LOADING_MS = 1400;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<typeof users[0] | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    const persistedUserId = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (persistedUserId) {
      const persistedUser = users.find((user) => user.id === persistedUserId && user.active);
      if (persistedUser) {
        setCurrentUser(persistedUser);
      } else {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    const elapsed = Date.now() - startedAt;
    const remainingDelay = Math.max(MIN_BOOT_SCREEN_MS - elapsed, 0);
    const timerId = window.setTimeout(() => {
      setIsInitializing(false);
    }, remainingDelay);

    return () => window.clearTimeout(timerId);
  }, []);

  const login = (email: string, password: string): boolean => {
    const credentials = SAMPLE_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (credentials) {
      const user = users.find(u => u.id === credentials.userId);
      if (user && user.active) {
        setIsLoggingIn(true);
        window.setTimeout(() => {
          setCurrentUser(user);
          window.localStorage.setItem(AUTH_STORAGE_KEY, user.id);
          setIsLoggingIn(false);
        }, LOGIN_LOADING_MS);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isInitializing, isLoggingIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
