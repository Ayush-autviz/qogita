import { AxiosError } from 'axios';

/**
 * Extract error message from Axios error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  
  return 'An unknown error occurred';
};

/**
 * Handle API errors with a callback
 */
export const handleApiError = (error: unknown, callback?: (message: string) => void): string => {
  const message = getErrorMessage(error);
  
  if (callback) {
    callback(message);
  }
  
  return message;
};

/**
 * Check if error is due to unverified email
 */
export const isUnverifiedEmailError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message === 'Please verify your email before logging in';
  }
  
  return false;
};
