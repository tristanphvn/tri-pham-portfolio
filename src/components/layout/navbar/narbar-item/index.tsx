'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface Item {
  link: string;
  name: string;
}

const NavbarItem = ({ item }: { item: Item }) => {
  const pathname = usePathname();
  const { link, name } = item;
  const isActive =
    link === '/'
      ? pathname === '/'
      : pathname === link || pathname.startsWith(`${link}/`);

  return (
    <Link
      href={link}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'transition-colors',
        isActive ? 'text-fg' : 'text-muted hover:text-fg'
      )}
    >
      {name}
    </Link>
  );
};

export default NavbarItem;
