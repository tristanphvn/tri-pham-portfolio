import { LazyLoadImage } from 'react-lazy-load-image-component';

type SkillItem = { name: string; logo: string };

type SkillGroup = {
  label: string;
  items: SkillItem[];
};

const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js', logo: '/assets/icons/nextjs.svg' },
      { name: 'React', logo: '/assets/icons/react.svg' },
      { name: 'Tailwind CSS', logo: '/assets/icons/tailwindcss.svg' },
    ],
  },
  {
    label: 'Backend',
    items: [{ name: 'NestJS', logo: '/assets/icons/nestjs.svg' }],
  },
  {
    label: 'Tooling',
    items: [
      { name: 'Git', logo: '/assets/icons/git.svg' },
      { name: 'Jira', logo: '/assets/icons/jira.svg' },
      { name: 'Figma', logo: '/assets/icons/figma.svg' },
      { name: 'Linear', logo: '/assets/icons/linear.svg' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { name: 'Neovim', logo: '/assets/icons/neovim.svg' },
      { name: 'Cursor', logo: '/assets/icons/cursor.svg' },
      { name: 'Claude', logo: '/assets/icons/claude.svg' },
    ],
  },
];

const AboutCareer = () => {
  return (
    <section className="w-full border-t border-yankees-blue/15 py-12 dark:border-white/10">
      <div className="mb-8 flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-yankees-blue/60 dark:text-white/60">
          &#x2F;&#x2F; stack
        </p>
        <p className="font-mono text-xs text-yankees-blue/40 dark:text-white/40">
          {skillGroups.reduce((sum, g) => sum + g.items.length, 0)} items
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="border border-yankees-blue/15 bg-white/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/60 dark:border-white/10 dark:bg-white/[0.02]"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {group.label}
              </p>
              <span className="font-mono text-[11px] text-yankees-blue/40 dark:text-white/40">
                0{group.items.length}
              </span>
            </div>
            <ul className="flex flex-col gap-y-3">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-x-3 font-mono text-sm text-yankees-blue dark:text-white"
                >
                  <LazyLoadImage
                    src={item.logo}
                    alt={item.name}
                    className="h-5 w-5 object-contain dark:invert"
                    effect="blur"
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutCareer;
