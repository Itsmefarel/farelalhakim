import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/motion'

/**
 * Wraps a route's content so <AnimatePresence> in App.jsx can cross-fade
 * between pages instead of swapping them instantly.
 *
 * Also carries `#main-content`, the skip link's target — putting it here means
 * every route has one, not just the home page.
 */
export default function PageTransition({ children, className }) {
  return (
    <motion.main
      id="main-content"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.main>
  )
}
