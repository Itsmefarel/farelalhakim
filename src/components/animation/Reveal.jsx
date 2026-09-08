import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, viewportOnce } from '@/lib/motion'

/**
 * Scroll reveal wrapper.
 *
 * Wrap anything that should fade in as it enters the viewport instead of
 * repeating `initial/whileInView/viewport` on every element.
 *
 *   <Reveal delay={0.1}><Card /></Reveal>
 */
export default function Reveal({
  children,
  direction = 'up',
  distance = 24,
  delay = 0,
  className,
  as = 'div',
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeIn(direction, distance, delay)}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Reveals its children one after another.
 * Children must be <Reveal.Item> (or any element using the `fadeIn` variants).
 */
export function RevealGroup({ children, stagger = 0.08, delayChildren = 0, className, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** A single item inside <RevealGroup>. */
export function RevealItem({ children, direction = 'up', distance = 20, className, ...props }) {
  return (
    <motion.div variants={fadeIn(direction, distance)} className={className} {...props}>
      {children}
    </motion.div>
  )
}
