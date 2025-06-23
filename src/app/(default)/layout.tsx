'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Footer = dynamic(() => import('@/components/layout/footer'), {
  ssr: false,
});

const Navbar = dynamic(() => import('@/components/layout/navbar'), {
  ssr: false,
});

export default function DefaultLayout(props: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="dark:via-grey-900 flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:bg-gray-900 dark:from-gray-900 dark:to-gray-900">
      <div className="flex h-full w-full flex-col items-center justify-center">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-30 w-full bg-transparent transition-all">
          <Navbar isScrolled={isScrolled} />
        </div>
        <div className="mt-14 flex min-h-screen w-full xl:mt-16 xl:max-w-6xl">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
