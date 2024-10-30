import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AboutMe = () => {
  return (
    <div className="flex h-auto w-full flex-col gap-y-5 xl:h-[450px] xl:flex-row">
      <div className="mt-5 flex h-full w-full items-center justify-center xl:hidden">
        <div className="relative">
          <div className="absolute -right-2 top-3 aspect-square w-80 rounded-full bg-yankees-blue/70 blur-md backdrop-blur dark:bg-white/40" />
          <LazyLoadImage
            src="/assets/images/my-avatar.jpg"
            className="aspect-square w-80 rounded-full object-cover object-top"
            effect="blur"
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 xl:w-2/3 xl:items-start">
        <div className="flex flex-row items-center gap-x-3">
          <p className="text-5xl font-bold text-yankees-blue dark:text-white">
            Hi, I&apos;m Tri!
          </p>
          <motion.div
            className="text-5xl"
            animate={{
              rotate: [30, 0, 30, 0, 30],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.8],
              repeat: Infinity,
            }}
          >
            👋🏼
          </motion.div>
        </div>
        <p className="w-2/3 text-center text-justify text-base font-light text-yankees-blue dark:text-white xl:text-start">
          I am a passionate Software Engineer with 2 years of experience in
          full-stack development, specializing in Next.js and NestJS. I thrive
          on creating responsive, user-friendly applications and have a solid
          understanding of system design concepts. My expertise encompasses
          frontend technologies like TypeScript and Tailwind CSS, alongside
          backend development with Node.js. I am dedicated to continuous
          learning and delivering high-quality solutions that enhance user
          experiences. Explore my portfolio to see my work and projects!
        </p>
        <div>
          <Button
            as={Link}
            href="/tri-pham.pdf"
            target="_blank"
            radius="md"
            size="lg"
            className="bg-primary text-white"
          >
            DOWNLOAD MY RESUME
          </Button>
        </div>
      </div>
      <div className="hidden h-full w-1/3 items-center justify-center xl:flex">
        <div className="relative">
          <div className="absolute -right-2 top-3 aspect-square w-80 rounded-full bg-yankees-blue/70 blur-md backdrop-blur dark:bg-white/40" />
          <LazyLoadImage
            src="/assets/images/my-avatar.jpg"
            className="aspect-square w-80 rounded-full object-cover object-top"
            effect="blur"
          />
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
