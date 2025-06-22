'use client';

import { BookOpenIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from 'next/link';
import { useState } from 'react';

const DocumentScreen = () => {
  const [content, setContent] = useState('<p>Hello World! 🌎️</p>');
  const [activeTab, setActiveTab] = useState<'editor' | 'docs'>('docs');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your document...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-8 text-4xl font-bold">Documents</h1>
        <div className="w-full max-w-4xl">
          <div className="h-96 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start p-4">
      <h1 className="mb-8 text-4xl font-bold">Documents</h1>
      <div className="w-full max-w-6xl">
        {/* Tab Navigation */}
        <div className="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('docs')}
            className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'docs'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpenIcon className="h-4 w-4" />
            <span>Documentation</span>
          </button>
        </div>

        {activeTab === 'docs' ? (
          /* Documentation Section */
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Available Documentation
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/documents/nextjs-15"
                  className="group rounded-lg border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200">
                      <CodeBracketIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        Next.js 15
                      </h3>
                      <p className="text-sm text-gray-600">
                        Complete guide and overview
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Learn about the latest features, installation, routing, and
                    best practices for Next.js 15.
                  </p>
                </Link>

                <Link
                  href="/documents/nestjs-v10"
                  className="group rounded-lg border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200">
                      <CodeBracketIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
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
                <div className="rounded-lg border border-gray-200 p-6 opacity-50">
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
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Editor</h2>
              Coming soon
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentScreen;
