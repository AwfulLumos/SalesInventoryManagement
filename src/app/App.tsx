import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '../features/auth/context/AuthContext';
import { router } from './routes';
import LoadingScreen from './components/LoadingScreen';

function AppContent() {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}