import Link from 'next/link';

import DarkModeToggle from '../dark-mode-toggle';
import NavbarItem from './narbar-item';

const navbarList = [
  { link: '/', name: 'Home' },
  { link: '/documents', name: 'Notes' },
];

const Navbar = () => {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" className="font-medium tracking-tight">
        Tri Pham
      </Link>
      <nav aria-label="Main" className="flex items-center gap-x-6 text-sm">
        {navbarList.map((item) => (
          <NavbarItem key={item.name} item={item} />
        ))}
        <DarkModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
