'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React from 'react';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button isIconOnly className="bg-transparent" onClick={handleClick}>
      <motion.div
        key={theme === 'dark' ? 'moon' : 'bars'}
        initial={{ opacity: 0, rotate: theme === 'dark' ? 180 : -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: theme === 'dark' ? -180 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'light' ? (
          <SunIcon width={24} height={24} />
        ) : (
          <MoonIcon width={24} height={24} />
        )}
      </motion.div>
    </Button>
  );
};

export default DarkModeToggle;
