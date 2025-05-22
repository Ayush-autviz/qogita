'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { useCurrentUser } from '@/services/authService';

// Define public and protected routes
const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email', '/verification-sent', '/resend-verification'];

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, token, logout } = useAuthStore();
  
  // Fetch current user if authenticated
  const { data, isError } = useCurrentUser();
  
  useEffect(() => {
    // If there's an error fetching the user (e.g., token expired), log out
    if (isError && isAuthenticated) {
      logout();
      
      // Redirect to login if on a protected route
      if (!isPublicRoute(pathname)) {
        router.push('/login');
      }
    }
  }, [isError, isAuthenticated, logout, router, pathname]);
  
  // Check if a route is public
  const isPublicRoute = (path: string) => {
    return publicRoutes.some(route => {
      if (route.includes('[')) {
        // Handle dynamic routes
        const baseRoute = route.split('/').slice(0, -1).join('/');
        return path.startsWith(baseRoute);
      }
      return path === route || path.startsWith(`${route}/`);
    });
  };
  
  return {
    isAuthenticated,
    user,
    token,
    logout,
    isPublicRoute,
  };
};

export default useAuth;
