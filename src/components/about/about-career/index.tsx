import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import type { IFramework } from '@/interface/IFrameword';

const AboutCasser = () => {
  const listFramework = [
    {
      logo: '/assets/icons/nextjs-original.svg',
      name: 'NextJS',
    },
    {
      logo: '/assets/icons/nestjs-original.svg',
      name: 'NestJS',
    },
    {
      logo: '/assets/icons/react-original.svg',
      name: 'ReactJS',
    },
    {
      logo: '/assets/icons/tailwindcss-original.svg',
      name: 'Tailwindcss',
    },
    {
      logo: '/assets/icons/jira-original.svg',
      name: 'Jira',
    },
    {
      logo: '/assets/icons/git-original.svg',
      name: 'Git',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-x-4 gap-y-5 px-10 xl:flex-row xl:px-0">
      <div className="flex w-full flex-col gap-y-2 xl:w-1/3">
        <p className="text-2xl font-normal text-yankees-blue dark:text-white">
          My Career So Far
        </p>
        <p className="text-justify text-base font-light text-yankees-blue dark:text-white">
          some text here!!!
        </p>
      </div>
      <div className="flex w-full items-center justify-center xl:w-2/3">
        <div className="grid grid-cols-6 gap-4 xl:grid-cols-4">
          {listFramework.map((item: IFramework) => (
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              key={item.name}
              className="flex flex-row items-center justify-center gap-x-2"
            >
              <LazyLoadImage
                src={item.logo}
                className="h-8 w-8 object-cover"
                effect="blur"
              />
              <p>{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutCasser;
