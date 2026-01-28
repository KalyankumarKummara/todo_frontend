import { motion } from "framer-motion";

const headerVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const headerTransition = {
  duration: 0.25,
  ease: "easeOut",
};

const AnimatedPageHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      variants={headerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={headerTransition}
      className="mb-8"
    >
      <h1 className="text-4xl font-heading font-bold text-neutral-darkest dark:text-neutral-white">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-base font-body text-neutral-dark dark:text-neutral-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default AnimatedPageHeader;
