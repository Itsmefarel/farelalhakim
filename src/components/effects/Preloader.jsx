import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { profile } from '@/data/profile'

const SESSION_KEY = 'portfolio:intro-played'

/**
 * First-load curtain: a counter runs to 100 while the app boots, then the
 * panel splits away and hands control to the hero.
 *
 * Shown once per browser session, so someone navigating back to the tab is
 * not made to sit through it again.
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === '1'
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (alreadyPlayed || prefersReduced) {
      setDone(true)
      onComplete?.()
      return undefined
    }

    document.body.style.overflow = 'hidden'

    let frame
    const duration = 1750
    const start = performance.now()

    const tick = (now) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        sessionStorage.setItem(SESSION_KEY, '1')
        // Small beat at 100% before the curtain lifts.
        setTimeout(() => {
          setDone(true)
          onComplete?.()
        }, 380)
      }
    }

    frame = requestAnimationFrame(tick)

    /**
     * Hard deadline. requestAnimationFrame stops entirely when the browser
     * is not painting the page, which would strand a visitor behind the
     * curtain with a frozen counter and no way in. A timer always fires, so
     * the site is guaranteed to become reachable.
     */
    const failsafe = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setProgress(100)
      setDone(true)
      onComplete?.()
    }, duration + 1200)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(failsafe)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-base"
        >
          <motion.div
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-center gap-6"
          >
            {/* Monogram */}
            <div className="relative grid size-16 place-items-center">
              <span className="absolute inset-0 rounded-2xl border border-accent/30" />
              <span className="absolute inset-0 rounded-2xl border border-accent/60 motion-safe:animate-[pulse-ring_2.4s_ease-out_infinite]" />
              <span className="font-display text-2xl font-bold text-gradient">{profile.initials}</span>
            </div>

            <div className="font-mono text-[11px] tracking-[0.4em] text-muted uppercase">
              {profile.fullName}
            </div>
          </motion.div>

          {/* Progress */}
          <div className="mt-10 w-56">
            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono text-[10px] tracking-widest text-faint">
              <span>LOADING</span>
              <span className="tabular-nums text-accent">{String(progress).padStart(3, '0')}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
