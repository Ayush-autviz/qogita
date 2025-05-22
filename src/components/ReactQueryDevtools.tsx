'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';

export default function TanStackQueryDevtools() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || process.env.NODE_ENV === 'production') return null;

  return (
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  );
}
