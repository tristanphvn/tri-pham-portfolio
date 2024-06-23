'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <NextUIProvider>
      {children}
      <ToastContainer />
    </NextUIProvider>
  );
}
