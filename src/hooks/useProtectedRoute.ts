'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

/**
 * Hook to protect routes that require authentication
 * - Redirects unauthenticated users to the login page
 * - Provides loading state while checking authentication
 * 
 * @param redirectTo - The path to redirect to if user is not authenticated (default: '/login')
 * @returns Object containing loading state
 */
export const useProtectedRoute = (redirectTo: string = '/login') => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated) {
      router.push(redirectTo);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, redirectTo]);

  return { isLoading };
};

export default useProtectedRoute;
