import React from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function DefaultLayout(props: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-neutral-50 text-yankees-blue dark:bg-neutral-950 dark:text-neutral-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(33,36,61,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(33,36,61,0.04)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]"
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center">
        <Navbar />
        <main className="flex w-full flex-1 flex-col px-6 pt-24 xl:max-w-6xl xl:px-10">
          {props.children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
