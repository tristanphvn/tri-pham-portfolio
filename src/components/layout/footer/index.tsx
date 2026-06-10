import Link from 'next/link';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/TriPham9001',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.2 1.18a11.13 11.13 0 0 1 5.82 0c2.22-1.49 3.19-1.18 3.19-1.18.64 1.59.24 2.77.12 3.06.75.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.26 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.22 21.42 23.5 17.12 23.5 12.03 23.5 5.66 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tri-pham-85a26b239/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.78A1.77 1.77 0 0 0 0 1.75v20.5C0 23.22.8 24 1.78 24h20.44A1.78 1.78 0 0 0 24 22.25V1.75A1.77 1.77 0 0 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:tri.pham1101@gmail.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <rect x="3" y="5" width="18" height="14" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 w-full border-t border-yankees-blue/15 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-y-4 px-6 py-8 sm:flex-row sm:items-center xl:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-yankees-blue/60 dark:text-white/60">
          © {year} Tri Pham — Built with Next.js
        </p>
        <div className="flex flex-row items-center gap-x-5">
          {socialLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-yankees-blue/70 transition-colors hover:text-primary dark:text-white/70 dark:hover:text-primary"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
