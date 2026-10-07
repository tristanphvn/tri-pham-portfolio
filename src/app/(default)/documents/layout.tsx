import React from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function DocumentsLayout(props: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 md:px-12 lg:px-16">
      <Navbar />
      <main className="flex-1 pb-24 pt-12 lg:pt-20">{props.children}</main>
      <Footer />
    </div>
  );
}
