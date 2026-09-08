import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsPointerFine } from '@/hooks/useMediaQuery'

/**
 * Pulls its child slightly toward the cursor on hover.
 *
 * Disabled on touch devices, where there is no cursor to follow and the
 * transform would only cost frames.
 */
export default function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null)
  const isPointerFine = useIsPointerFine()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMouseMove = (event) => {
    if (!ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - (bounds.left + bounds.width / 2)
    const offsetY = event.clientY - (bounds.top + bounds.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  if (!isPointerFine) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
