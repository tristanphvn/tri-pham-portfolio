export type Experience = {
  period: string;
  role: string;
  company: string;
  href?: string;
  summary: string;
  stack: string[];
};

export type Note = {
  href: string;
  title: string;
  caption: string;
  description: string;
  soon?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const email = 'tri.pham1101@gmail.com';

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/TriPham9001' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tri-pham-85a26b239/',
  },
  { label: 'Résumé', href: '/tri-pham.pdf' },
];

export const experiences: Experience[] = [
  {
    period: '2024 — Now',
    role: 'Software Engineer',
    company: 'Indiemunkey',
    summary:
      'Building an indie comic platform end-to-end on my own: the Next.js reader and storefront, the NestJS API behind it, and the Vercel deployments that keep it running.',
    stack: ['Next.js', 'NestJS', 'Tailwind CSS', 'Vercel'],
  },
  {
    period: '2022 — 2024',
    role: 'Software Engineer',
    company: 'Annotab AI',
    summary:
      'Worked on Annotab Studio, a data annotation tool. Shipped the annotation UI on the frontend and REST and GraphQL services on the backend, handling large PostgreSQL datasets across a Kubernetes-hosted microservice stack.',
    stack: [
      'Next.js',
      'NestJS',
      'Laravel',
      'RabbitMQ',
      'KrakenD',
      'Kubernetes',
    ],
  },
  {
    period: 'Summer 2022',
    role: 'Frontend Intern',
    company: 'Alta Software',
    summary:
      'Built student profiles, status and discipline views, and teacher screens for tests and announcements in a learning management system.',
    stack: ['React', 'Ant Design'],
  },
];

export const stack: { label: string; items: string[] }[] = [
  {
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  { label: 'Backend', items: ['NestJS', 'PostgreSQL', 'MySQL', 'GraphQL'] },
  { label: 'Tools', items: ['Git', 'Figma', 'Linear', 'Neovim', 'Cursor'] },
];

export const notes: Note[] = [
  {
    href: '/documents/nextjs-15',
    title: 'Next.js 15',
    caption: 'Framework',
    description:
      'The App Router, Server Components, the caching model, and the things that broke when I migrated.',
  },
  {
    href: '/documents/nestjs-v10',
    title: 'NestJS v10',
    caption: 'Backend',
    description:
      'Modules, dependency injection, validation pipes, and how I structure a real API.',
  },
  {
    href: '#',
    title: 'More on the way',
    caption: 'Drafting',
    description: 'System design, testing strategy, and developer experience.',
    soon: true,
  },
];
