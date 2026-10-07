import Link from 'next/link';

import { experiences, stack } from '@/data/profile';

import SectionTitle from '../section-title';

const AboutCareer = () => {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="scroll-mt-24 pt-24"
    >
      <SectionTitle>Experience</SectionTitle>

      <ol className="group/list">
        {experiences.map((item) => (
          <li
            key={item.company}
            className="-mx-4 grid gap-y-2 rounded-2xl px-4 py-5 transition-[background-color,opacity] duration-300 hover:bg-fg/[0.035] sm:grid-cols-[8rem_1fr] sm:gap-x-6 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          >
            <p className="pt-0.5 text-sm tabular-nums text-muted">
              {item.period}
            </p>
            <div>
              <h3 className="font-medium">
                {item.role} <span className="text-muted">·</span> {item.company}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                {item.summary}
              </p>
              <p className="mt-3 text-sm text-muted/80">
                {item.stack.join(' / ')}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        href="/tri-pham.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex items-center gap-x-1.5 font-medium"
      >
        <span className="link-underline">Full résumé</span>
        <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          ↗
        </span>
      </Link>

      <dl className="mt-16 grid gap-y-4 text-[0.95rem]">
        {stack.map((group) => (
          <div
            key={group.label}
            className="grid sm:grid-cols-[8rem_1fr] sm:gap-x-6"
          >
            <dt className="text-sm text-muted">{group.label}</dt>
            <dd>{group.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default AboutCareer;
