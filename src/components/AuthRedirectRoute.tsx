'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

interface AuthRedirectRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * A wrapper component that redirects authenticated users away from public pages
 * - Redirects authenticated users to the specified path (default: '/my-account')
 * - Shows the children content if the user is not authenticated
 * 
 * @param children - The content to render if not authenticated
 * @param redirectTo - The path to redirect to if authenticated
 */
const AuthRedirectRoute: React.FC<AuthRedirectRouteProps> = ({ 
  children, 
  redirectTo = '/my-account' 
}) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRedirectRoute;
