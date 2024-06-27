import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        'card-height': '238px',
        'inner-card-height': '156px',
      },
      maxWidth: {
        'card-width': '230px',
      },
      colors: {
        primary: '#FF6464',
        'yankees-blue': '#21243D',
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
