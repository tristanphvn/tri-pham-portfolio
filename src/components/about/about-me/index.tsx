import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AboutMe = () => {
  return (
    <section className="w-full pb-16 pt-8 xl:pb-24 xl:pt-16">
      <div className="flex flex-col-reverse items-start gap-y-10 xl:flex-row xl:items-center xl:gap-x-16">
        <div className="flex w-full flex-col gap-y-7 xl:w-2/3">
          <p className="flex items-center gap-x-2 font-mono text-xs uppercase tracking-[0.3em] text-yankees-blue/60 dark:text-white/60">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            &#x2F;&#x2F; portfolio — v1
          </p>

          <div className="flex flex-row items-center gap-x-4">
            <h1 className="text-5xl font-semibold tracking-tight text-yankees-blue dark:text-white xl:text-6xl">
              Hi, I&apos;m Tri.
            </h1>
            <motion.span
              className="text-4xl xl:text-5xl"
              animate={{ rotate: [25, -10, 25, -10, 25] }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
              }}
            >
              👋🏼
            </motion.span>
          </div>

          <div className="h-px w-16 bg-primary" />

          <p className="font-mono text-sm uppercase tracking-[0.18em] text-yankees-blue dark:text-white">
            Full-stack Engineer{' '}
            <span className="text-yankees-blue/40 dark:text-white/40">·</span>{' '}
            Next.js + NestJS{' '}
            <span className="text-yankees-blue/40 dark:text-white/40">·</span>{' '}
            Ho Chi Minh City
          </p>

          <p className="max-w-xl text-base leading-relaxed text-yankees-blue/80 dark:text-white/80">
            I build production web applications end-to-end — typed React/Next.js
            frontends, NestJS APIs, and the database layer in between. Two years
            shipping features in real teams, with a focus on responsive UX,
            type-safe contracts, and pragmatic system design.
          </p>

          <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-3 pt-2">
            <Link
              href="/tri-pham.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-x-2 border border-yankees-blue bg-yankees-blue px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-primary hover:bg-primary dark:border-white dark:bg-white dark:text-yankees-blue dark:hover:border-primary dark:hover:bg-primary dark:hover:text-white"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Download Resume
            </Link>
            <Link
              href="mailto:tri.pham1101@gmail.com"
              className="inline-flex items-center gap-x-2 border border-yankees-blue/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-yankees-blue transition-colors hover:border-primary hover:text-primary dark:border-white/30 dark:text-white"
            >
              Get in touch →
            </Link>
          </div>
        </div>

        <div className="relative w-full xl:w-1/3">
          <div className="relative mx-auto aspect-square w-64 xl:w-full xl:max-w-sm">
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full border border-primary"
            />
            <LazyLoadImage
              src="/assets/images/my-avatar.jpg"
              alt="Tri Pham"
              effect="blur"
              className="relative aspect-square w-full border border-yankees-blue/20 object-cover object-top dark:border-white/20"
            />
            <div
              aria-hidden
              className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center border border-yankees-blue/30 bg-neutral-50 font-mono text-[10px] text-yankees-blue/60 dark:border-white/30 dark:bg-neutral-950 dark:text-white/60"
            >
              01
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
