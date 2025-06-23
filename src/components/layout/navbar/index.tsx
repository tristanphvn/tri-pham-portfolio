'use client';

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';

import NavbarItem from './narbar-item';

const navbarList = [
  {
    link: '/',
    name: 'About',
  },
  {
    link: '/documents',
    name: 'Documents',
  },
];

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={clsx(
        'sticky top-4 z-30',
        'mx-auto mt-2 flex h-16 w-[95%] flex-col items-center justify-center px-4',
        'rounded-2xl border border-gray-200 shadow-sm shadow-black/5',
        'mx-auto flex h-16 w-full flex-col items-center justify-center bg-white px-4 shadow-outside shadow-white/5 dark:bg-black/50',
        'bg-opacity-70 backdrop-blur-xl',
        'transition-all duration-500',
        { 'scale-[1.01] drop-shadow-2xl': isScrolled }
      )}
    >
      <div className="flex h-16 w-full flex-row items-center xl:max-w-6xl">
        <div className="flex h-full w-1/2 items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-yankees-blue drop-shadow-sm dark:text-white"
          >
            Tri Pham
          </Link>
        </div>
        <div className="hidden w-1/2 flex-row items-center justify-end gap-x-6 xl:flex">
          {navbarList.map((item) => (
            <NavbarItem key={item.name} item={item} />
          ))}
        </div>
        <div className="flex w-1/2 flex-row items-center justify-end xl:hidden">
          <Button
            isIconOnly
            className="bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              key={isOpen ? 'xmark' : 'bars'}
              initial={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <XMarkIcon width={20} height={20} />
              ) : (
                <Bars3BottomRightIcon width={20} height={20} />
              )}
            </motion.div>
          </Button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute right-4 top-16 z-20 flex w-40 flex-col gap-y-2 rounded-xl border border-gray-100 bg-white/60 p-2 shadow-2xl backdrop-blur-xl dark:bg-black/60 xl:hidden"
        >
          {navbarList.map((item) => (
            <NavbarItem key={item.name} item={item} setIsOpen={setIsOpen} />
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
