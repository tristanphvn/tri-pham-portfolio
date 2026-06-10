# Next.js 15 — Overview & Quick Reference

## 1. Introduction
**Next.js** is a React framework built by Vercel that supports **server-side rendering (SSR)**, **static site generation (SSG)**, **incremental static regeneration (ISR)**, and **client-side rendering (CSR)** in a single app.

### Key features in Next.js 15:
- **React Server Components (RSC)**: first-class server-side rendering
- **App Router**: file-based routing with nested layouts
- **Turbopack**: faster bundler that replaces Webpack in dev
- **Partial Prerendering**: hybrid static + dynamic rendering for performance
- **Server Actions**: server-side form handling and mutations
- **Metadata API**: SEO and metadata management
- **Image Optimization**: automatic image optimization
- **Font Optimization**: automatic font loading

## 2. Setting Up a Next.js 15 Project

### Using create-next-app (recommended)
```bash
# Create a new project with TypeScript
npx create-next-app@latest my-next15-app --typescript --tailwind --eslint

# Or use the interactive prompts
npx create-next-app@latest my-next15-app

# Move into the project directory
cd my-next15-app

# Start the dev server
npm run dev
```

### Manual installation
```bash
npm init -y
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/node
```

## 3. Default Folder Structure

```
my-next15-app/
├── app/                    # App Router (new)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error UI
│   ├── not-found.tsx      # 404 page
│   └── api/               # API routes
│       └── hello/
│           └── route.ts
├── components/            # Reusable components
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Additional styles
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies
```

## 4. What's New in Next.js 15

### a. Stronger React Server Components (RSC)
```tsx
// app/page.tsx
import { Suspense } from 'react';

// Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Client Component
'use client';
function UserActions({ userId }: { userId: string }) {
  const handleEdit = () => {
    // Client-side logic
  };

  return (
    <button onClick={handleEdit}>
      Edit Profile
    </button>
  );
}

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile userId="123" />
      </Suspense>
      <UserActions userId="123" />
    </div>
  );
}
```

### b. Turbopack — the new bundler
```bash
# Use Turbopack for development
npm run dev -- --turbo

# Or via environment variable
NEXT_BUILDER=turbopack npm run dev
```

### c. Server Actions
```tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Save to database
  await savePost({ title, content });

  // Revalidate the posts page
  revalidatePath('/posts');
}

// app/posts/page.tsx
import { createPost } from '../actions';

export default function CreatePost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

### d. Partial Prerendering
```tsx
// app/page.tsx
import { Suspense } from 'react';

// Static content (prerendered)
export default function Page() {
  return (
    <div>
      <h1>Welcome to our site</h1>
      <p>This content is prerendered for better performance.</p>

      {/* Dynamic content (streamed) */}
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <Recommendations />
      </Suspense>
    </div>
  );
}

// Dynamic component
async function Recommendations() {
  const recommendations = await fetchRecommendations();
  return (
    <div>
      {recommendations.map(rec => (
        <div key={rec.id}>{rec.title}</div>
      ))}
    </div>
  );
}
```

## 5. Routing in the App Router

### File-based routing
```tsx
// app/about/page.tsx
export default function About() {
  return <h1>About Us</h1>;
}

// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Blog Post: {params.slug}</h1>;
}

// app/shop/[...slug]/page.tsx
export default function Shop({ params }: { params: { slug: string[] } }) {
  return <h1>Shop: {params.slug.join('/')}</h1>;
}
```

### Layouts
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>Navigation</nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}

// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-layout">
      <aside>Blog sidebar</aside>
      <article>{children}</article>
    </div>
  );
}
```

## 6. Data Fetching (Server-Side)

### Fetch with caching
```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Parallel data fetching
```tsx
// app/dashboard/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function Dashboard() {
  // Fetch data in parallel
  const [users, posts] = await Promise.all([
    getUsers(),
    getPosts(),
  ]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>Users: {users.length}</div>
      <div>Posts: {posts.length}</div>
    </div>
  );
}
```

## 7. Loading UI and Error Handling

### Loading UI
```tsx
// app/posts/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

### Error UI
```tsx
// app/posts/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
```

### Not Found UI
```tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Not Found</h2>
      <p className="text-gray-600 mb-4">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
```

## 8. Styling

### Tailwind CSS
```bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
  }
}
```

### CSS Modules
```tsx
// app/components/Button.module.css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: all 0.2s;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
}

// app/components/Button.tsx
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary' }: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

### Styled Components
```bash
npm install styled-components
npm install -D @types/styled-components
```

```tsx
// app/components/StyledButton.tsx
'use client';

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: ${props => props.variant === 'primary' ? '#3b82f6' : '#6b7280'};
  color: white;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#2563eb' : '#4b5563'};
  }
`;

export default function Button({ children, variant = 'primary' }: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  return <StyledButton variant={variant}>{children}</StyledButton>;
}
```

## 9. Authentication & Authorization

### NextAuth.js integration
```bash
npm install next-auth
```

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
```

```tsx
// app/components/AuthButton.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
```

## 10. Middleware

### Authentication middleware
```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('auth-token');

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users away from the login page
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

### Internationalization middleware
```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'vi'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## 11. Configuring `next.config.js`

### Basic configuration
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Enable SWC minification
  swcMinify: true,

  // Image domains
  images: {
    domains: ['example.com', 'images.unsplash.com'],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },

  // Headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Advanced configuration
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental features
  experimental: {
    serverActions: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack config
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },

  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      );
      return config;
    },
  }),
};

module.exports = nextConfig;
```

## 12. Deployment

### Vercel (recommended)
```bash
# Install the Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or deploy to production
vercel --prod
```

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Environment variables
```bash
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 13. Testing

### Unit testing with Jest
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

```tsx
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-gray-500');
  });
});
```

### E2E testing with Playwright
```bash
npm install -D @playwright/test
npx playwright install
```

```ts
// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test('home page loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Next.js/);
  await expect(page.locator('h1')).toContainText('Welcome');
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL(/.*about/);
});
```

## 14. Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image';

export default function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  );
}
```

### Font Optimization
```tsx
// app/layout.tsx
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze
```

## 15. Debugging & Development

### Debug configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Development tools
```bash
# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Check bundle size
npm run build:analyze
```

## Learning Resources
- **Official Docs**: https://nextjs.org/docs
- **Blog**: https://nextjs.org/blog
- **Examples**: https://github.com/vercel/next.js/tree/canary/examples
- **YouTube**: "Next.js 15 Crash Course"
- **Discord**: https://discord.gg/nextjs
- **GitHub**: https://github.com/vercel/next.js

## Best Practices
1. **Use the App Router** for new projects
2. **Reach for Server Components** whenever you can
3. **Prefer Server Actions** for form handling
4. **Optimize images** with the Next.js Image component
5. **Set up proper error boundaries** and loading states
6. **Use TypeScript** for type safety
7. **Follow the file-based routing** conventions
8. **Implement proper SEO** via the Metadata API
9. **Use environment variables** for configuration
10. **Write tests** for critical functionality
