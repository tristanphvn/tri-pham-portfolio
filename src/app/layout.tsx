import '@/styles/global.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Provider from './provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Tri Pham',
  description: 'Portfolio by Tri Pham',
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/png',
    },
  },
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={props.params.locale}>
      <body className={poppins.className}>
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
