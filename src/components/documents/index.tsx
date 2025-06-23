'use client';

import { BookOpenIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

const tabs = [
  {
    key: 'docs',
    label: 'Documentation',
    icon: BookOpenIcon,
  },
  {
    key: 'editor',
    label: 'Editor',
    icon: CodeBracketIcon,
  },
];

const DocumentScreen = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'docs'>('docs');

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start bg-transparent px-2 py-8">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm dark:text-white">
        Documents
      </h1>
      <div className="w-full max-w-6xl">
        {/* Tab Navigation */}
        <div className="mb-8 flex space-x-2 rounded-xl border border-gray-100 bg-white/80 p-2 shadow dark:border-gray-700 dark:bg-gray-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <Button
                key={tab.key}
                onPress={() => setActiveTab(tab.key as 'docs' | 'editor')}
                color="default"
                variant={isActive ? 'solid' : 'light'}
                startContent={
                  <Icon
                    className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`}
                  />
                }
                className={`font-semibold transition-all duration-200 ${isActive ? 'bg-blue-100 text-blue-800 shadow-md' : ''}`}
                radius="lg"
              >
                {tab.label}
                {isActive && (
                  <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                )}
              </Button>
            );
          })}
        </div>

        {activeTab === 'docs' ? (
          /* Documentation Section */
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800/90">
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                <BookOpenIcon className="mr-2 h-6 w-6 text-blue-500" />
                Available Documentation
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/documents/nextjs-15"
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-blue-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200">
                      <CodeBracketIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
                        Next.js 15
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Complete guide and overview
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Learn about the latest features, installation, routing, and
                    best practices for Next.js 15.
                  </p>
                </Link>

                <Link
                  href="/documents/nestjs-v10"
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-green-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200">
                      <CodeBracketIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-green-600">
                        NestJS
                      </h3>
                      <p className="text-sm text-gray-600">
                        Node.js framework guide
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Learn about TypeScript-first Node.js framework with
                    decorators, DI, and modular architecture.
                  </p>
                </Link>

                {/* Placeholder for future documentation */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 opacity-60">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                      <BookOpenIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-400">More Docs</h3>
                      <p className="text-sm text-gray-400">Coming soon</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Additional documentation will be added here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl">
              <CodeBracketIcon className="mb-4 h-12 w-12 text-gray-300" />
              <h2 className="mb-2 text-xl font-bold text-gray-700">
                Editor Coming Soon
              </h2>
              <p className="text-gray-500">
                A beautiful markdown/code editor will be available here in the
                future.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentScreen;
