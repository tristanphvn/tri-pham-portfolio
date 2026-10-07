import { email } from '@/data/profile';

const AboutStory = () => {
  return (
    <section
      id="about"
      aria-label="About me"
      className="animate-fade-up scroll-mt-24 space-y-5 leading-relaxed text-muted [animation-delay:100ms]"
    >
      <p>
        I started out studying mobile development, then fell for the web during
        a short course in web design. Since 2022 I&apos;ve been shipping
        production software: annotation tools at{' '}
        <span className="text-fg">Annotab AI</span>, and now{' '}
        <span className="text-fg">Indiemunkey</span>, an indie comic platform I
        build and run myself.
      </p>
      <p>
        Most of my days are spent in TypeScript on both sides of the wire, with
        Next.js in front and NestJS behind. I care about the parts users feel
        but rarely notice: a layout that holds up on a small phone, a form that
        tells you what went wrong, and an API contract that doesn&apos;t
        surprise anyone.
      </p>
      <p>
        I&apos;m open to full-stack roles and freelance work. The quickest way
        to reach me is{' '}
        <a href={`mailto:${email}`} className="link-underline text-fg">
          {email}
        </a>
        .
      </p>
    </section>
  );
};

export default AboutStory;
