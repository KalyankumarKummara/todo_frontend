import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
  },
};

const transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      className="relative h-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
    >
      {/* subtle background layer */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-neutral-white dark:bg-neutral-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* actual content */}
      <motion.div className="relative z-10">
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;
