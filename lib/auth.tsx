import { createContext, useContext, useEffect, useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingSpinner';

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  checkAuth: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = await clerk.session?.getToken();
      const isAuth = !!token && !!user;
      setIsAuthenticated(isAuth);
      return isAuth;
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/sign-in');
      }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
      return <LoadingScreen />;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
