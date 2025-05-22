'use client';

import React, { ReactNode } from 'react';
import useProtectedRoute from '@/hooks/useProtectedRoute';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * A wrapper component that protects routes requiring authentication
 * - Redirects unauthenticated users to the specified path (default: '/login')
 * - Shows a loading spinner while checking authentication
 * 
 * @param children - The content to render if authenticated
 * @param redirectTo - The path to redirect to if not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isLoading } = useProtectedRoute(redirectTo);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
