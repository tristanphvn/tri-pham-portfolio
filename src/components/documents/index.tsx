import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

type DocItem = {
  href: string;
  index: string;
  name: string;
  caption: string;
  description: string;
  status?: 'active' | 'soon';
};

const docs: DocItem[] = [
  {
    href: '/documents/nextjs-15',
    index: '01',
    name: 'Next.js 15',
    caption: 'Framework · React 19',
    description:
      'Notes on the App Router, Server Components, caching model, and migration gotchas.',
    status: 'active',
  },
  {
    href: '/documents/nestjs-v10',
    index: '02',
    name: 'NestJS v10',
    caption: 'Node.js · TypeScript',
    description:
      'Modules, DI, decorators, validation pipes, and structuring a real-world API.',
    status: 'active',
  },
  {
    href: '#',
    index: '03',
    name: 'More notes',
    caption: 'In progress',
    description:
      'Additional writings on system design, testing strategy, and DX are being drafted.',
    status: 'soon',
  },
];

const DocumentScreen = () => {
  return (
    <section className="w-full pb-16 pt-8 xl:pb-24 xl:pt-16">
      <div className="mb-6 flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-yankees-blue/60 dark:text-white/60">
          &#x2F;&#x2F; documents
        </p>
        <p className="font-mono text-xs text-yankees-blue/40 dark:text-white/40">
          {docs.filter((d) => d.status === 'active').length} live ·{' '}
          {docs.length} total
        </p>
      </div>

      <h1 className="mb-3 text-4xl font-semibold tracking-tight text-yankees-blue dark:text-white xl:text-5xl">
        Notes & references.
      </h1>
      <div className="mb-6 h-px w-16 bg-primary" />
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-yankees-blue/70 dark:text-white/70">
        A growing collection of working notes on the frameworks I use day to
        day. Treat them as my own cheat sheet — not a replacement for official
        docs.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {docs.map((doc) => {
          const isSoon = doc.status === 'soon';
          const Wrapper: React.ElementType = isSoon ? 'div' : Link;
          const wrapperProps = isSoon ? {} : { href: doc.href };
          return (
            <Wrapper
              key={doc.index}
              {...wrapperProps}
              className={clsx(
                'group flex flex-col gap-y-4 border p-6 transition-colors',
                isSoon
                  ? 'cursor-default border-dashed border-yankees-blue/15 opacity-60 dark:border-white/10'
                  : 'border-yankees-blue/15 hover:border-primary dark:border-white/10'
              )}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-yankees-blue/50 dark:text-white/50">
                  {doc.index}
                </span>
                {!isSoon && (
                  <ArrowUpRightIcon className="h-4 w-4 text-yankees-blue/40 transition-colors group-hover:text-primary dark:text-white/40" />
                )}
                {isSoon && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-yankees-blue/40 dark:text-white/40">
                    soon
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <h3
                  className={clsx(
                    'text-lg font-semibold tracking-tight',
                    isSoon
                      ? 'text-yankees-blue/50 dark:text-white/50'
                      : 'text-yankees-blue group-hover:text-primary dark:text-white'
                  )}
                >
                  {doc.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-yankees-blue/50 dark:text-white/50">
                  {doc.caption}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-yankees-blue/70 dark:text-white/70">
                {doc.description}
              </p>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
};

export default DocumentScreen;
