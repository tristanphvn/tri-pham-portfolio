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
      className="mb-6 mt-12 text-3xl font-medium tracking-tight text-fg first:mt-0"
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
      className="mb-4 mt-14 scroll-mt-24 font-serif text-3xl italic text-fg"
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
      className="mb-3 mt-10 scroll-mt-24 text-lg font-medium tracking-tight text-fg"
    >
      {children}
    </h3>
  );
};

const CustomStrong = ({ children, ...props }: any) => (
  <strong {...props} className="font-medium text-fg">
    {children}
  </strong>
);

const CustomEm = ({ children, ...props }: any) => (
  <em {...props} className="italic">
    {children}
  </em>
);

const CustomCode = ({ inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  if (!inline && match) {
    return (
      <div className="my-8 overflow-hidden rounded-2xl bg-[#16161a]">
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="font-mono text-xs text-neutral-400">{match[1]}</span>
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
            }
            className="text-xs text-neutral-400 transition-colors hover:text-neutral-100"
          >
            Copy
          </button>
        </div>
        <pre className="overflow-x-auto px-5 pb-5 pt-3 font-mono text-[13px] leading-relaxed text-neutral-100 [&_.hljs]:bg-transparent [&_.hljs]:p-0">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  }
  return (
    <code
      className="rounded-md bg-fg/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
      {...props}
    >
      {children}
    </code>
  );
};

const CustomA = ({ children, ...props }: any) => (
  <a
    {...props}
    className="text-fg underline decoration-muted/50 underline-offset-4 transition-colors hover:decoration-accent"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const CustomLi = ({ children, ...props }: any) => (
  <li {...props} className="mb-2 flex items-start">
    <span className="mr-3 mt-[0.7em] inline-block h-1 w-1 shrink-0 rounded-full bg-muted" />
    <span>{children}</span>
  </li>
);

const CustomP = ({ children, ...props }: any) => (
  <p {...props} className="mb-5 leading-relaxed text-muted">
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
    <section className="animate-fade-up">
      <Link
        href="/documents"
        className="group mb-10 inline-flex items-center gap-x-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All notes
      </Link>

      <h1 className="max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">
        {title ?? 'Reference'}
      </h1>
      <p className="mb-16 mt-3 text-sm text-muted">
        {tableOfContents.length} sections
      </p>

      <div className="grid grid-cols-1 gap-16 xl:grid-cols-[1fr_220px]">
        <article className="min-w-0 max-w-[68ch]">
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
        </article>

        <aside className="order-first hidden xl:order-none xl:block">
          <div className="sticky top-12">
            <p className="mb-4 text-sm font-medium">On this page</p>
            <nav className="max-h-[calc(100vh-160px)] space-y-1 overflow-y-auto pr-2">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={clsx(
                    'block w-full py-1 text-left text-[13px] leading-snug transition-colors',
                    activeSection === item.id
                      ? 'text-fg'
                      : 'text-muted hover:text-fg'
                  )}
                  style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default MarkdownReader;
