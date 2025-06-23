'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, return null to prevent hydration mismatch
  if (!mounted) return null;
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer />
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}
