import Link from 'next/link';

import { socialLinks } from '@/data/profile';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-y-3 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>© {year} Tri Pham</p>
      <ul className="flex gap-x-6">
        {socialLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
