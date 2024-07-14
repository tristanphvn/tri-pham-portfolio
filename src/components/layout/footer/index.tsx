import { motion } from 'framer-motion';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const informationList = [
  {
    icon: '/assets/icons/github.svg',
    link: 'https://github.com/TriPham9001',
  },
  {
    icon: '/assets/icons/linkedin.svg',
    link: 'https://www.linkedin.com/in/tri-pham-85a26b239/',
  },
  {
    icon: '/assets/icons/google.svg',
    link: 'mailto:tri.pham1101@gmail.com',
  },
];

const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2 py-5">
      <div className="flex flex-row items-center gap-x-4">
        {informationList.map((item) => (
          <motion.div
            whileHover={{ scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            key={item.link}
          >
            <Link href={item.link} target="_blank">
              <LazyLoadImage
                src={item.icon}
                className="aspect-square w-8"
                effect="blur"
              />
            </Link>
          </motion.div>
        ))}
      </div>
      <p>&copy;Tri Pham.</p>
    </div>
  );
};

export default Footer;
