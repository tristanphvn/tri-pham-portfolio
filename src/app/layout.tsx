import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
/* Highlight.js styles for syntax highlighting */
import 'highlight.js/styles/github-dark.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

import Provider from './provider';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tristanpham.world'),
  title: 'Tri Pham — Full-stack Engineer',
  description:
    'Tri Pham is a full-stack engineer in Ho Chi Minh City building web products with Next.js and NestJS.',
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/png',
    },
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
