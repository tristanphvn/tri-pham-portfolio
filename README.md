# tri-pham-portfolio

Personal portfolio of **Tri Pham** — full-stack engineer based in Ho Chi Minh City, working with Next.js on the frontend and NestJS on the backend.

Live: _coming soon_ · Source: [github.com/TriPham9001/tri-pham-portfolio](https://github.com/TriPham9001/tri-pham-portfolio)

## What's in it

- **About** — short intro, current stack, downloadable resume.
- **Documents** — working notes I keep while learning a framework (Next.js 15, NestJS v10).
- **Contact** — form wired to EmailJS so messages land directly in my inbox.

## Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS, Geist Mono + Poppins via `next/font`
- **State / forms**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Email**: EmailJS (client-side, free tier)
- **Tooling**: TypeScript, ESLint (Airbnb), Prettier, Husky, Commitlint

The design leans brutalist — monospace accents, hard 1px borders, flat backgrounds, a single coral accent (`#FF6464`). No glass, no shadows.

## Run it locally

Requires Node.js 20+.

```bash
git clone git@github.com:TriPham9001/tri-pham-portfolio.git
cd tri-pham-portfolio
npm install
cp .env.example .env.local   # fill in the EmailJS keys (see below)
npm run dev
```

Open http://localhost:3000.

## Environment

The contact form needs an EmailJS account (free tier — 200 emails/month).

1. Create a service + template at <https://www.emailjs.com/>.
2. The template must reference the variables `from_name`, `from_email`, `message`.
3. Copy the IDs into `.env.local`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

The values are validated at build time via `@t3-oss/env-nextjs`, so the app will refuse to start if any are missing.

## Useful scripts

| Command              | What it does                          |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Dev server (Turbopack)                |
| `npm run build`      | Production build                      |
| `npm run start`      | Serve production build                |
| `npm run lint`       | ESLint                                |
| `npm run check-types`| TypeScript check (no emit)            |
| `npm run test`       | Jest unit tests                       |
| `npm run test:e2e`   | Playwright E2E                        |
| `npm run build-stats`| Build + bundle analyzer               |

## Project layout

```
src/
├── app/
│   ├── (default)/          # routes sharing the main layout
│   │   ├── documents/      # /documents + nested doc pages
│   │   └── page.tsx        # about page
│   ├── layout.tsx          # root layout, fonts, providers
│   └── provider.tsx        # NextUI + theme + react-query + toast
├── components/
│   ├── about/              # hero, stack, contact form
│   ├── documents/          # docs landing
│   ├── markdown-reader/    # markdown renderer with TOC
│   └── layout/             # navbar, footer
├── data/markdown/          # notes content (English)
├── libs/Env.mjs            # T3 Env — validated env vars
└── styles/global.css       # Tailwind entry
```

## Status

Active. Things I'm still planning to add: a real **Projects** section with case studies, custom domain, blog.

## License

Source code in this repo is private to the author. Brand assets in `public/assets/icons/` come from [Simple Icons](https://simpleicons.org/) (CC0).
