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
  const isActive = pathname === link || pathname.startsWith(`${link}/`);

  return (
    <Link
      href={link}
      onClick={() => setIsOpen?.(false)}
      className={clsx(
        'rounded-sm p-2',
        isActive ? 'text-primary' : 'text-black dark:text-white'
      )}
    >
      <p className="text-xl font-medium">{name}</p>
    </Link>
  );
};

export default NavbarItem;
