'use client';

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';

import DarkModeToggle from '../dark-mode-toggle';
import NavbarItem from './narbar-item';

const navbarList = [
  {
    link: '/',
    name: 'About',
  },
];

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={clsx(
        { 'bg-opacity-30 drop-shadow-lg backdrop-blur-md': isScrolled },
        'mx-auto flex h-16 w-full flex-col items-center justify-center bg-white px-4 shadow-outside shadow-white/5 dark:bg-black/50'
      )}
    >
      <div className="flex h-16 w-full flex-row items-center xl:max-w-6xl">
        <div className="flex h-full w-1/2 items-center">
          <p className="text-2xl font-medium text-yankees-blue dark:text-white">
            Tri Pham
          </p>
        </div>
        <div className="hidden w-1/2 flex-row items-center justify-end gap-x-6 xl:flex">
          {navbarList.map((item) => (
            <NavbarItem key={item.name} item={item} />
          ))}
          <DarkModeToggle />
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
          className="absolute right-4 top-16 z-20 flex w-32 flex-col gap-y-2 rounded-md border border-gray-100 bg-white/30 p-1 shadow-lg backdrop-blur-md xl:hidden"
        >
          {navbarList.map((item) => (
            <Link
              href={item.link}
              key={item.name}
              className={clsx('rounded-md px-2 hover:bg-primary')}
            >
              <p className="text-yankees-blue hover:text-white dark:text-white">
                {item.name}
              </p>
            </Link>
          ))}
          <DarkModeToggle />
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
