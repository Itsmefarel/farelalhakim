import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsPointerFine } from '@/hooks/useMediaQuery'

/**
 * Two-part custom cursor: an instant dot plus a trailing ring.
 *
 * Any element marked `data-cursor="link"` expands the ring; `data-cursor="view"`
 * turns it into a labelled disc (used on project covers).
 *
 * Never rendered on touch devices, and the native cursor is only hidden while
 * this component is actually mounted — so nobody is left without a pointer.
 */
export default function CustomCursor() {
  const isPointerFine = useIsPointerFine()
  const [variant, setVariant] = useState('default')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.55 })

  useEffect(() => {
    if (!isPointerFine) return undefined

    document.body.classList.add('cursor-none-desktop')

    const onMouseMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)

      const target = event.target.closest('[data-cursor]')
      setVariant(target?.dataset.cursor ?? 'default')
    }

    const onMouseLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.body.classList.remove('cursor-none-desktop')
    }
  }, [isPointerFine, visible, x, y])

  if (!isPointerFine) return null

  const isLink = variant === 'link'
  const isView = variant === 'view'

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden lg:block" aria-hidden="true">
      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            width: isView ? 78 : isLink ? 46 : 30,
            height: isView ? 78 : isLink ? 46 : 30,
            opacity: visible ? 1 : 0,
            backgroundColor: isView ? 'rgba(56,189,248,0.16)' : 'rgba(56,189,248,0)',
            borderColor: isLink || isView ? 'rgba(56,189,248,0.9)' : 'rgba(148,163,184,0.45)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-[1px]"
        >
          {isView && (
            <span className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase">View</span>
          )}
        </motion.div>
      </motion.div>

      {/* Instant dot */}
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <motion.div
          animate={{ scale: isLink || isView ? 0 : 1, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        />
      </motion.div>
    </div>
  )
}
