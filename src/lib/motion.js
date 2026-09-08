/**
 * MOTION PRESETS
 *
 * Centralising variants keeps the animation language consistent: every
 * element on the site eases the same way and travels the same distance.
 * Components import from here instead of inventing their own timings.
 */

export const EASE = [0.16, 1, 0.3, 1] // expo-out

/** Fade + rise. Direction: 'up' | 'down' | 'left' | 'right' */
export const fadeIn = (direction = 'up', distance = 24, delay = 0) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'down' || direction === 'right' ? -1 : 1

  return {
    hidden: { opacity: 0, [axis]: distance * sign },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: { duration: 0.7, delay, ease: EASE },
    },
  }
}

/** Parent that releases its children one after another. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/** Scale-in for cards and media. */
export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, delay, ease: EASE },
  },
})

/** Per-word or per-letter reveal (hero headline). */
export const textReveal = {
  hidden: { opacity: 0, y: '110%' },
  visible: (index = 0) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.8, delay: 0.05 * index, ease: EASE },
  }),
}

/** Route transition used by <PageTransition />. */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE } },
}

/** Shared viewport config so scroll reveals trigger at the same point. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' }
