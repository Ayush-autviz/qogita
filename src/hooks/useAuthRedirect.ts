'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

/**
 * Hook to handle redirecting users based on authentication status
 * - If user is authenticated and clicks profile icon, redirect to my-account
 * - If user is not authenticated, show login popup
 */
export const useAuthRedirect = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  
  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push('/my-account');
      return true; // Indicate that a redirect happened
    }
    return false; // No redirect, show login popup
  };
  
  return {
    isAuthenticated,
    user,
    handleProfileClick
  };
};

export default useAuthRedirect;
