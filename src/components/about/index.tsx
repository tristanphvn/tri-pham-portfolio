'use client';

import AboutCareer from './about-career';
import AboutMe from './about-me';
import AboutSendMessage from './about-send-message';

const About = () => {
  return (
    <div className="flex w-full flex-col">
      <AboutMe />
      <AboutCareer />
      <AboutSendMessage />
    </div>
  );
};

export default About;
