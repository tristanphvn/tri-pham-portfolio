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
    <div className="flex h-full w-full justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="fixed inset-0 left-0 top-0 z-10 h-16 w-full">
          <Navbar isScrolled={isScrolled} />
        </div>
        <div className="flex min-h-screen w-full py-14 xl:max-w-6xl xl:pb-14">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
