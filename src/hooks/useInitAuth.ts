'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
import { getCurrentUser } from '@/services/authService';

/**
 * Hook to initialize authentication state on app load
 * Fetches user data if a token is present
 */
export const useInitAuth = () => {
  const { isAuthenticated, token, setAuth } = useAuthStore();

  // Use React Query directly in the hook
  const { data, isError, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: isAuthenticated, // Only run if user is authenticated
    retry: 1, // Only retry once
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    // If we have a token and user data, update the store
    if (isAuthenticated && token && data?.data && !isError) {
      setAuth(token, data.data);
    }
  }, [isAuthenticated, token, data, isError, setAuth]);

  return {
    isInitialized: !isLoading || !isAuthenticated,
    isAuthenticated,
    user: data?.data,
  };
};

export default useInitAuth;
