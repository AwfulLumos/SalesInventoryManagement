import { createContext, useContext, useState, ReactNode } from 'react';
import { users } from '../../../shared/data/mockData';

interface AuthContextType {
  currentUser: typeof users[0] | null;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<typeof users[0] | null>(null);

  const login = (email: string, password: string): boolean => {
    const credentials = SAMPLE_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (credentials) {
      const user = users.find(u => u.id === credentials.userId);
      if (user && user.active) {
        setCurrentUser(user);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
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
