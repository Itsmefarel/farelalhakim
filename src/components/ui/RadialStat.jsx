import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from '@/lib/motion'

/**
 * Circular progress ring. Draws itself once when scrolled into view.
 *
 * SVG rather than a canvas or a library: it scales crisply, needs no runtime,
 * and the stroke can be animated by Framer directly.
 */
export default function RadialStat({ value = 0, size = 92, stroke = 6, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div ref={ref} className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-white/8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#radial-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference * (1 - value / 100) } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        />
        <defs>
          <linearGradient id="radial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
