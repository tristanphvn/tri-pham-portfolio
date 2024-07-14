'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextUIProvider>
        {children}
        <ToastContainer />
      </NextUIProvider>
    </ThemeProvider>
  );
}
