'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="group inline-flex items-center gap-x-2 text-sm text-muted transition-colors hover:text-fg"
    >
      <span className="relative inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-current">
        <span
          className={`absolute inset-y-0 left-0 w-1/2 bg-current transition-transform duration-500 ${
            isDark ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
      </span>
      <span>{mounted ? (isDark ? 'Dark' : 'Light') : 'Theme'}</span>
    </button>
  );
};

export default DarkModeToggle;
