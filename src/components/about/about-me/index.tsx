import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import DarkModeToggle from '@/components/layout/dark-mode-toggle';
import LocalTime from '@/components/layout/local-time';
import { socialLinks } from '@/data/profile';

import { type SectionId, sections } from '../sections';

const AboutMe = ({ active }: { active: SectionId }) => {
  return (
    <header className="flex flex-col justify-between pb-16 pt-16 lg:sticky lg:top-0 lg:h-screen lg:w-[44%] lg:py-24">
      <div className="animate-fade-up">
        <Image
          src="/assets/images/my-avatar.jpg"
          alt="Portrait of Tri Pham"
          width={64}
          height={64}
          priority
          className="mb-8 h-16 w-16 rounded-full object-cover object-top"
        />
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
          Tri Pham
        </h1>
        <p className="mt-3 font-serif text-2xl italic text-muted sm:text-[1.75rem]">
          Full-stack engineer
        </p>
        <p className="mt-6 max-w-xs leading-relaxed text-muted">
          I build web products end to end, from the interface people touch to
          the API and database behind it.
        </p>

        <nav aria-label="Sections" className="mt-16 hidden lg:block">
          <ul className="flex flex-col gap-y-1">
            {sections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group flex items-center gap-x-4 py-2 text-sm"
                  >
                    <span
                      className={clsx(
                        'h-px transition-all duration-300',
                        isActive
                          ? 'w-16 bg-fg'
                          : 'w-8 bg-muted/50 group-hover:w-16 group-hover:bg-fg'
                      )}
                    />
                    <span
                      className={clsx(
                        'transition-colors',
                        isActive ? 'text-fg' : 'text-muted group-hover:text-fg'
                      )}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-10 flex animate-fade-up flex-col gap-y-6 [animation-delay:150ms]">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {socialLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-fg"
              >
                {item.label}
                <span className="ml-0.5 text-muted">↗</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-x-6 text-sm text-muted">
          <span>
            Ho Chi Minh City · <LocalTime />
          </span>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default AboutMe;
