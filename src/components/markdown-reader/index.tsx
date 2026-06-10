'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface MarkdownReaderProps {
  content: string;
  title?: string;
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const CustomH1 = ({ children, ...props }: any) => {
  const text = String(children);
  return (
    <h1
      {...props}
      id={slugify(text)}
      className="mb-6 mt-10 text-3xl font-semibold tracking-tight text-yankees-blue dark:text-white"
    >
      {children}
    </h1>
  );
};

const CustomH2 = ({ children, ...props }: any) => {
  const text = String(children);
  return (
    <h2
      {...props}
      id={slugify(text)}
      className="mb-4 mt-10 border-b border-yankees-blue/15 pb-2 text-2xl font-semibold tracking-tight text-yankees-blue dark:border-white/10 dark:text-white"
    >
      {children}
    </h2>
  );
};

const CustomH3 = ({ children, ...props }: any) => {
  const text = String(children);
  return (
    <h3
      {...props}
      id={slugify(text)}
      className="mb-3 mt-8 text-lg font-semibold tracking-tight text-yankees-blue dark:text-white"
    >
      {children}
    </h3>
  );
};

const CustomStrong = ({ children, ...props }: any) => (
  <strong
    {...props}
    className="font-semibold text-yankees-blue dark:text-white"
  >
    {children}
  </strong>
);

const CustomEm = ({ children, ...props }: any) => (
  <em {...props} className="italic text-yankees-blue/80 dark:text-white/80">
    {children}
  </em>
);

const CustomCode = ({ inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  if (!inline && match) {
    return (
      <div className="my-6 overflow-hidden border border-yankees-blue/20 dark:border-white/15">
        <div className="flex items-center justify-between border-b border-yankees-blue/15 bg-neutral-100 px-4 py-2 dark:border-white/10 dark:bg-neutral-900">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-yankees-blue/60 dark:text-white/60">
            {match[1]}
          </span>
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
            }
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-yankees-blue/60 transition-colors hover:text-primary dark:text-white/60"
          >
            copy
          </button>
        </div>
        <pre className="overflow-x-auto bg-neutral-950 p-4 font-mono text-sm leading-relaxed text-neutral-100">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  }
  return (
    <code
      className="border border-yankees-blue/15 bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em] text-yankees-blue dark:border-white/10 dark:bg-neutral-900 dark:text-white"
      {...props}
    >
      {children}
    </code>
  );
};

const CustomA = ({ children, ...props }: any) => (
  <a
    {...props}
    className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const CustomLi = ({ children, ...props }: any) => (
  <li {...props} className="mb-2 ml-6 flex items-start">
    <span className="mr-3 mt-1.5 inline-block h-1 w-1 flex-shrink-0 bg-primary" />
    <span>{children}</span>
  </li>
);

const CustomP = ({ children, ...props }: any) => (
  <p
    {...props}
    className="mb-5 leading-relaxed text-yankees-blue/80 dark:text-white/80"
  >
    {children}
  </p>
);

const MarkdownReader = ({ content, title }: MarkdownReaderProps) => {
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    const headings: Array<{ id: string; text: string; level: number }> = [];

    for (const line of lines) {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
      } else if (!inCodeBlock && line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        headings.push({ id: slugify(text), text, level });
      }
    }
    setTableOfContents(headings);
  }, [content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <section className="w-full pb-16 pt-8 xl:pb-24 xl:pt-16">
      <Link
        href="/documents"
        className="mb-6 inline-flex items-center gap-x-2 font-mono text-xs uppercase tracking-[0.2em] text-yankees-blue/60 transition-colors hover:text-primary dark:text-white/60"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to documents
      </Link>

      <div className="mb-6 flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-yankees-blue/60 dark:text-white/60">
          &#x2F;&#x2F; reference
        </p>
        <p className="font-mono text-xs text-yankees-blue/40 dark:text-white/40">
          {tableOfContents.length} sections
        </p>
      </div>

      <h1 className="mb-3 text-4xl font-semibold tracking-tight text-yankees-blue dark:text-white xl:text-5xl">
        {title ?? 'Reference'}
      </h1>
      <div className="mb-10 h-px w-16 bg-primary" />

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[220px_1fr]">
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-yankees-blue/60 dark:text-white/60">
              &#x2F;&#x2F; contents
            </p>
            <nav className="max-h-[calc(100vh-180px)] space-y-0.5 overflow-y-auto pr-2">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={clsx(
                    'block w-full border-l py-1.5 pr-2 text-left font-mono text-[12px] transition-colors',
                    activeSection === item.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-yankees-blue/60 hover:border-yankees-blue/30 hover:text-yankees-blue dark:text-white/60 dark:hover:border-white/30 dark:hover:text-white'
                  )}
                  style={{ paddingLeft: `${(item.level - 1) * 10 + 12}px` }}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <article className="max-w-3xl">
          <div className="prose prose-lg prose-headings:scroll-mt-24 max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: CustomH1,
                h2: CustomH2,
                h3: CustomH3,
                strong: CustomStrong,
                em: CustomEm,
                code: CustomCode,
                a: CustomA,
                li: CustomLi,
                p: CustomP,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-yankees-blue/15 pt-6 dark:border-white/10">
            <Link
              href="/documents"
              className="font-mono text-xs uppercase tracking-[0.2em] text-yankees-blue/60 transition-colors hover:text-primary dark:text-white/60"
            >
              ← All documents
            </Link>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-yankees-blue/40 dark:text-white/40">
              {title}
            </span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default MarkdownReader;
