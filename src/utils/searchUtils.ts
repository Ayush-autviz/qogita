'use client';

/**
 * Utility function for handling search across the application
 * This ensures consistent search behavior throughout the app
 * 
 * @param value - The search query string
 * @param router - Next.js router instance
 * @param callback - Optional callback function to execute after search (e.g., close modal)
 * @returns void
 */
export const handleSearch = (
  value: string, 
  router: any, 
  callback?: () => void
): void => {
  if (!value.trim()) return;
  
  // Use the standardized search URL format with query parameter
  router.push(`/search-result?query=${encodeURIComponent(value)}`);
  
  // Execute callback if provided (e.g., close modal, clear input)
  if (callback) {
    callback();
  }
};
