import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 *
 * `raw` renders the number unformatted (years like 2025 must not become
 * "2.025" under the id-ID locale).
 */
export default function CountUp({ value, decimals = 0, suffix = '', duration = 1600, raw = false, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    if (reduceMotion) {
      setDisplay(value)
      return undefined
    }

    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // expo-out: fast start, gentle landing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(value * eased)

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    /**
     * Safety net. The browser pauses requestAnimationFrame whenever it stops
     * painting the page (backgrounded tab, occluded window). A paused counter
     * would freeze mid-count and display a number that is simply wrong — so a
     * timer, which keeps firing regardless, snaps it to the real value.
     */
    const settle = setTimeout(() => setDisplay(value), duration + 250)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
    }
  }, [inView, value, duration, reduceMotion])

  // `toFixed` rather than `toLocaleString`: a GPA must read "3.61" everywhere
  // on the site, not "3,61" here and "3.61" in the education card.
  const formatted = raw ? Math.round(display).toString() : display.toFixed(decimals)

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  )
}
