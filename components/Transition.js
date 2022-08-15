import { motion, AnimatePresence } from "framer-motion";

const Transition = ({ children }) => {
  return (
    <div className="effects-1">
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div>{children}</motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Transition;
