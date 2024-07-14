'use client';

import AboutCasser from './about-career';
import AboutMe from './about-me';
import AboutSendMessage from './about-send-message';

const About = () => {
  return (
    <div className="flex w-full flex-col gap-y-12">
      <AboutMe />
      <AboutCasser />
      <AboutSendMessage />
    </div>
  );
};

export default About;
