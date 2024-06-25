'use client';

import clsx from 'clsx';

import NavbarItem from './narbar-item';

const navbarList = [
  {
    link: '/',
    name: 'About',
  },
  {
    link: '/blog',
    name: 'Blog',
  },
  {
    link: '/work',
    name: 'Work',
  },
];

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <div
      className={clsx(
        { 'bg-opacity-30 drop-shadow-lg backdrop-blur-md': isScrolled },
        'mx-auto flex h-16 w-full flex-row items-center justify-center bg-white px-4'
      )}
    >
      <div className="flex w-full flex-row items-center xl:max-w-6xl">
        <div className="flex h-full w-2/3 items-center">
          <p className="text-2xl font-medium text-black">Tri Pham</p>
        </div>
        <div className="flex w-2/3 flex-row items-center justify-end gap-x-6">
          {navbarList.map((item) => (
            <NavbarItem item={item} key={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
