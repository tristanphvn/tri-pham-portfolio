'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, return null to prevent hydration mismatch
  if (!mounted) return null;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
      <NextUIProvider>
        {children}
        <ToastContainer />
      </NextUIProvider>
    </ThemeProvider>
  );
}
