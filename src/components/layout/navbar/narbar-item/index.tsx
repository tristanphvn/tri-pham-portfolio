import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface Item {
  link: string;
  name: string;
}

const NavbarItem = ({ item }: { item: Item }) => {
  const router = usePathname();
  const { link, name } = item;
  return (
    <Link
      href={link}
      className={clsx(
        router === link ? 'text-primary' : 'text-black dark:text-white'
      )}
    >
      <p className="text-xl font-medium">{name}</p>
    </Link>
  );
};

export default NavbarItem;
