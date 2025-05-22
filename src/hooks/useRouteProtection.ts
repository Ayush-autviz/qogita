'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

// Define routes that should redirect to my-account if user is logged in
const authRedirectRoutes = ['/login', '/register'];

/**
 * Hook to protect routes based on authentication status
 * - Redirects authenticated users away from login/register pages to my-account
 * - Can be used in any component to implement route protection
 */
export const useRouteProtection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    // If user is authenticated and trying to access login or register page
    if (isAuthenticated && authRedirectRoutes.includes(pathname)) {
      router.push('/my-account');
    }
  }, [isAuthenticated, pathname, router]);
  
  return {
    isAuthenticated,
    shouldRedirect: isAuthenticated && authRedirectRoutes.includes(pathname)
  };
};

export default useRouteProtection;
