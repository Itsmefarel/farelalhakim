import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Figma, Code2, Sparkles, Layers } from 'lucide-react'
import { profile } from '@/data/profile'
import { EASE } from '@/lib/motion'
import { useIsPointerFine } from '@/hooks/useMediaQuery'

/**
 * The hero's right-hand visual: a tilting identity card with orbiting skill
 * chips. Falls back to a monogram when no photo is supplied, so the layout
 * is never broken by a missing asset.
 */

// Positioned around the card's edges — deliberately clear of the caption bar
// at the bottom of the card so nothing covers the readable text.
//
// Offsets stay small on mobile: the hero clips its overflow, so a chip pushed
// past the page gutter on a 375px screen would be sliced in half.
const CHIPS = [
  { icon: Figma, label: 'Figma', position: '-top-4 -left-2 sm:-top-5 sm:-left-6', delay: 0.9 },
  { icon: Code2, label: 'React', position: 'top-1/4 -right-2 sm:-right-8', delay: 1.05 },
  { icon: Layers, label: 'UI/UX', position: 'top-1/2 -left-2 sm:-left-10', delay: 1.2 },
  { icon: Sparkles, label: 'Prototype', position: '-bottom-4 -right-1 sm:-bottom-5 sm:-right-3', delay: 1.35 },
]

export default function HeroVisual({ started }) {
  const isPointerFine = useIsPointerFine()

  /**
   * If the photo file is missing or fails to load, fall back to the monogram
   * rather than leaving a broken image in the most important spot on the page.
   */
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = Boolean(profile.photo) && !photoFailed

  // Pointer parallax — the card leans toward the cursor.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-10deg', '10deg']), {
    stiffness: 150,
    damping: 20,
  })

  const handleMouseMove = (event) => {
    if (!isPointerFine) return
    const bounds = event.currentTarget.getBoundingClientRect()
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const resetTilt = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={started ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease: EASE, delay: 0.25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md"
      style={{ perspective: 1200 }}
    >
      {/* Glow behind the card */}
      <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-primary/40 to-accent/30 blur-3xl" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass relative aspect-4/5 overflow-hidden rounded-[1.75rem] p-1.5"
      >
        {/* Rotating conic border */}
        <div className="absolute inset-0 rounded-[1.75rem] opacity-40 motion-safe:animate-spin-slow [background:conic-gradient(from_0deg,transparent_0%,rgba(56,189,248,0.55)_25%,transparent_50%,rgba(37,99,235,0.55)_75%,transparent_100%)]" />

        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] bg-base/90">
          {/* Window chrome — signals "this person builds software" */}
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-[10px] text-faint">profile.jsx</span>
          </div>

          {/* Portrait */}
          <div className="group/photo relative flex-1 overflow-hidden">
            {showPhoto ? (
              <>
                <img
                  src={profile.photo}
                  alt={`Foto ${profile.fullName}`}
                  loading="eager"
                  decoding="async"
                  onError={() => setPhotoFailed(true)}
                  /* Headshots sit high in the frame — centring the crop would
                     slice the top of the head off in this 4:5 card. */
                  className="size-full scale-105 object-cover object-[center_18%] grayscale-[18%] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/photo:scale-110 group-hover/photo:grayscale-0"
                />

                {/* Settles a neutral studio backdrop into the dark palette.
                    The vignette does the heavy lifting: it darkens the flat
                    grey corners while leaving the face untouched. */}
                <div className="pointer-events-none absolute inset-0 bg-primary/10 mix-blend-overlay" />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_28px_rgba(5,8,22,0.62)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/85 via-transparent to-base/25" />
              </>
            ) : (
              <div className="grid size-full place-items-center bg-[radial-gradient(120%_120%_at_50%_0%,rgba(37,99,235,0.35),transparent_60%)]">
                <div className="relative grid size-32 place-items-center rounded-full border border-accent/30 bg-surface/60">
                  <span className="font-display text-5xl font-bold text-gradient">{profile.initials}</span>
                  <span className="absolute inset-0 rounded-full border border-accent/40 motion-safe:animate-[pulse-ring_3s_ease-out_infinite]" />
                </div>
              </div>
            )}

            {/* Scanline sweep */}
            <motion.div
              aria-hidden="true"
              initial={{ y: '-100%' }}
              animate={{ y: '120%' }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
              className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/12 to-transparent"
            />
          </div>

          {/* Caption bar */}
          <div className="border-t border-white/8 bg-surface/50 px-4 py-3">
            <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Available for work</p>
            <p className="mt-1 truncate text-sm font-medium text-fg">{profile.headline}</p>
          </div>
        </div>
      </motion.div>

      {/* Floating skill chips */}
      {CHIPS.map(({ icon: Icon, label, position, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={started ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay }}
          className={`absolute ${position} z-10 motion-safe:animate-float`}
          style={{ animationDelay: `${delay}s` }}
        >
          <div className="glass flex items-center gap-2 rounded-full px-3 py-2 shadow-[0_12px_30px_-16px_rgba(2,6,23,1)]">
            <Icon className="size-3.5 text-accent" />
            <span className="font-mono text-[10px] tracking-wide text-muted">{label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
