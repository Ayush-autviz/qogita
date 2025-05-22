'use client';

import { useState } from 'react';

interface ApiStatusHook {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetStatus: () => void;
}

/**
 * Custom hook to manage API loading and error states
 */
export const useApiStatus = (): ApiStatusHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const resetStatus = () => {
    setIsLoading(false);
    setError(null);
  };

  return {
    isLoading,
    error,
    setLoading,
    setError,
    resetStatus,
  };
};

export default useApiStatus;
