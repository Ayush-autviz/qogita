'use client';

import { ReactNode, useEffect } from 'react';
import useInitAuth from '@/hooks/useInitAuth';

interface AuthInitializerProps {
  children: ReactNode;
}

/**
 * Component to initialize authentication state on app load
 */
export default function AuthInitializer({ children }: AuthInitializerProps) {
  // Initialize auth state
  const { isInitialized } = useInitAuth();

  // You could add a loading state here if needed
  // if (!isInitialized) {
  //   return <div>Loading...</div>;
  // }

  return <>{children}</>;
}
