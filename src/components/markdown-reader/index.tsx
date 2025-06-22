'use client';

import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface MarkdownReaderProps {
  content: string;
  title?: string;
}

// Custom components for ReactMarkdown
const CustomH1 = ({ children, ...props }: any) => (
  <h1
    {...props}
    className="mb-6 mt-8 flex items-center text-3xl font-bold text-gray-900"
  >
    <RocketLaunchIcon className="mr-4 h-8 w-8 text-blue-600" />
    {children}
  </h1>
);

const CustomH2 = ({ children, ...props }: any) => (
  <h2
    {...props}
    className="mb-4 mt-8 flex items-center border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900"
  >
    <BookOpenIcon className="mr-3 h-6 w-6 text-blue-600" />
    {children}
  </h2>
);

const CustomH3 = ({ children, ...props }: any) => (
  <h3 {...props} className="mb-3 mt-6 text-xl font-semibold text-gray-800">
    {children}
  </h3>
);

const CustomStrong = ({ children, ...props }: any) => (
  <strong
    {...props}
    className="rounded bg-yellow-50 px-1 font-semibold text-gray-900"
  >
    {children}
  </strong>
);

const CustomEm = ({ children, ...props }: any) => (
  <em {...props} className="italic text-gray-700">
    {children}
  </em>
);

const CustomCode = ({ inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 font-mono text-sm text-gray-300">
            {match[1]}
          </span>
        </div>
        <button
          type="button"
          onClick={() =>
            navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
          }
          className="rounded bg-gray-700 px-2 py-1 text-sm text-gray-400 transition-colors hover:bg-gray-600 hover:text-white"
        >
          Copy
        </button>
      </div>
      <pre className="overflow-x-auto bg-gray-900 p-4 font-mono text-sm leading-relaxed text-gray-100">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  ) : (
    <code
      className="rounded border border-gray-200 bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800"
      {...props}
    >
      {children}
    </code>
  );
};

const CustomA = ({ children, ...props }: any) => (
  <a
    {...props}
    className="text-blue-600 underline decoration-blue-300 transition-colors hover:text-blue-800 hover:decoration-blue-600"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const CustomLi = ({ children, ...props }: any) => (
  <li {...props} className="mb-2 ml-6 flex items-start">
    <span className="mr-2 mt-2 text-blue-500">•</span>
    <span>{children}</span>
  </li>
);

const CustomP = ({ children, ...props }: any) => (
  <p {...props} className="mb-6 leading-relaxed text-gray-700">
    {children}
  </p>
);

const MarkdownReader = ({ content, title }: MarkdownReaderProps) => {
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);
  const [activeSection, setActiveSection] = useState<string>('');

  // Parse markdown content and extract headings for table of contents
  useEffect(() => {
    const headings = content
      .split('\n')
      .filter((line) => line.startsWith('#'))
      .map((line) => {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { id, text, level };
      });
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-white shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">Complete guide and overview</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 flex-shrink-0"
          >
            <div className="sticky top-8">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                <CodeBracketIcon className="mr-2 h-5 w-5" />
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 font-medium text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl flex-1"
          >
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <div className="prose prose-lg prose-headings:scroll-mt-20 max-w-none">
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

              {/* Navigation Footer */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <RocketLaunchIcon className="h-5 w-5" />
                    <span className="text-sm">{title}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-800"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                      <span className="text-sm">Previous</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-800"
                    >
                      <span className="text-sm">Next</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownReader;
