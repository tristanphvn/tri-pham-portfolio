'use client';

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import NavbarItem from './narbar-item';

const navbarList = [
  {
    link: '/',
    name: 'about',
  },
  {
    link: '/documents',
    name: 'documents',
  },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/TriPham9001',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="currentColor"
      >
        <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.2 1.18a11.13 11.13 0 0 1 5.82 0c2.22-1.49 3.19-1.18 3.19-1.18.64 1.59.24 2.77.12 3.06.75.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.26 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.22 21.42 23.5 17.12 23.5 12.03 23.5 5.66 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tri-pham-85a26b239/',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="currentColor"
      >
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.78A1.77 1.77 0 0 0 0 1.75v20.5C0 23.22.8 24 1.78 24h20.44A1.78 1.78 0 0 0 24 22.25V1.75A1.77 1.77 0 0 0 22.22 0Z" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'sticky top-0 z-30 w-full border-b border-yankees-blue/15 bg-neutral-50/85 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-neutral-950/85',
        { 'border-yankees-blue/30 dark:border-white/20': isScrolled }
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 xl:px-10">
        <Link
          href="/"
          className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-yankees-blue dark:text-white"
        >
          TRI_PHAM
          <span className="ml-1 inline-block h-2 w-2 -translate-y-px animate-pulse bg-primary align-middle" />
        </Link>

        <div className="hidden flex-row items-center gap-x-8 xl:flex">
          {navbarList.map((item) => (
            <NavbarItem key={item.name} item={item} />
          ))}
          <span className="h-4 w-px bg-yankees-blue/20 dark:bg-white/20" />
          {socialLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-yankees-blue/80 transition-colors hover:text-primary dark:text-white/80 dark:hover:text-primary"
            >
              {item.icon}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="flex items-center justify-center p-2 text-yankees-blue dark:text-white xl:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            key={isOpen ? 'xmark' : 'bars'}
            initial={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3BottomRightIcon className="h-5 w-5" />
            )}
          </motion.span>
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 top-full z-20 border-b border-yankees-blue/15 bg-neutral-50/95 px-6 py-4 backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/95 xl:hidden"
        >
          <div className="flex flex-col gap-y-3">
            {navbarList.map((item) => (
              <NavbarItem key={item.name} item={item} setIsOpen={setIsOpen} />
            ))}
            <div className="mt-2 flex flex-row items-center gap-x-5 border-t border-yankees-blue/10 pt-3 dark:border-white/10">
              {socialLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="text-yankees-blue/80 transition-colors hover:text-primary dark:text-white/80 dark:hover:text-primary"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
