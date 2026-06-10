import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface Item {
  link: string;
  name: string;
  setIsOpen?: (isOpen: boolean) => void;
}

const NavbarItem = ({
  item,
  setIsOpen,
}: {
  item: Item;
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  const pathname = usePathname();
  const { link, name } = item;
  const isActive =
    link === '/'
      ? pathname === '/'
      : pathname === link || pathname.startsWith(`${link}/`);

  return (
    <Link
      href={link}
      onClick={() => setIsOpen?.(false)}
      className={clsx(
        'group relative font-mono text-sm uppercase tracking-[0.14em] transition-colors',
        isActive
          ? 'text-primary'
          : 'text-yankees-blue/70 hover:text-yankees-blue dark:text-white/70 dark:hover:text-white'
      )}
    >
      {name}
      <span
        className={clsx(
          'absolute -bottom-1 left-0 h-px bg-current transition-all duration-200',
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </Link>
  );
};

export default NavbarItem;
