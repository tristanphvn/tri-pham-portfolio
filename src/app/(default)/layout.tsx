'use client';

import React, { useEffect, useState } from 'react';

import Navbar from '@/components/layout/navbar';

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
    <div className="flex h-full w-full justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="fixed inset-0 left-0 top-0 z-10 w-full">
          <Navbar isScrolled={isScrolled} />
        </div>
        <div className="mt-16 flex min-h-screen w-full xl:max-w-6xl">
          {props.children}
        </div>
      </div>
    </div>
  );
}
