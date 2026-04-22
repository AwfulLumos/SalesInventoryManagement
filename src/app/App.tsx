import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '../features/auth/context/AuthContext';
import { router } from './routes';
import LoadingScreen from './components/LoadingScreen';
import LoginLoadingScreen from './components/LoginLoadingScreen';

function AppContent() {
  const { isInitializing, isLoggingIn, currentUser } = useAuth();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (isLoggingIn) {
    return <LoginLoadingScreen userName={currentUser?.name} />;
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