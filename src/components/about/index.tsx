'use client';

import { useEffect, useState } from 'react';

import AboutCareer from './about-career';
import AboutMe from './about-me';
import AboutNotes from './about-notes';
import AboutSendMessage from './about-send-message';
import AboutStory from './about-story';
import { type SectionId, sections } from './sections';

const About = () => {
  const [active, setActive] = useState<SectionId>('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-12 lg:flex lg:gap-x-16 lg:px-16">
      <AboutMe active={active} />
      <main className="pb-24 pt-4 lg:w-[56%] lg:py-24">
        <AboutStory />
        <AboutCareer />
        <AboutNotes />
        <AboutSendMessage />
      </main>
    </div>
  );
};

export default About;
