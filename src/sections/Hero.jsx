import { motion } from 'framer-motion'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import { profile } from '@/data/profile'
import { EASE, fadeIn, staggerContainer } from '@/lib/motion'
import { useAppReady } from '@/hooks/useAppReady'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Aurora from '@/components/effects/Aurora'
import ParticleField from '@/components/effects/ParticleField'
import TypingText from '@/components/animation/TypingText'
import Magnetic from '@/components/animation/Magnetic'
import Button from '@/components/ui/Button'
import SocialLinks from '@/components/ui/SocialLinks'
import HeroVisual from '@/components/hero/HeroVisual'

/**
 * HERO — the first 10 seconds decide whether a recruiter keeps scrolling.
 *
 * Entrance order (starts only after the preloader hands over):
 *   background → visual → eyebrow → name → role → tagline → buttons
 */
export default function Hero() {
  const started = useAppReady()
  const { scrollTo } = useSmoothScroll()

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20 lg:pt-24 lg:pb-24"
    >
      <Aurora />
      <ParticleField className="absolute inset-0 size-full opacity-70" />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Text column ────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate={started ? 'visible' : 'hidden'}
            variants={staggerContainer(0.12, 0.35)}
            className="lg:col-span-7"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeIn('up', 16)} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3.5 py-1.5">
                <Sparkles className="size-3.5 text-accent" />
                <span className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
                  Hello, I&apos;m
                </span>
              </span>
            </motion.div>

            {/* Name — the single biggest thing on the page */}
            <motion.h1 variants={fadeIn('up', 28)} className="mt-6">
              <span className="block text-display text-fg">{profile.fullName}</span>
              <span className="mt-3 block font-display text-[clamp(1.25rem,2.8vw,2rem)] leading-tight font-semibold text-gradient">
                {profile.headline}
              </span>
            </motion.h1>

            {/* Rotating role */}
            <motion.div
              variants={fadeIn('up', 20)}
              className="mt-6 flex items-center gap-3 font-mono text-base text-muted sm:text-lg"
            >
              <span className="text-accent">&gt;</span>
              <TypingText words={profile.roles} className="text-fg" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeIn('up', 20)}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {profile.tagline}
            </motion.p>

            {/* Actions */}
            <motion.div variants={fadeIn('up', 20)} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.22}>
                <Button size="lg" onClick={() => scrollTo('projects')} icon={ArrowDown}>
                  Explore My Portfolio
                </Button>
              </Magnetic>

              <Magnetic strength={0.22}>
                <Button
                  size="lg"
                  variant="secondary"
                  href={profile.resumeUrl}
                  download
                  icon={Download}
                  iconPosition="left"
                >
                  Download CV
                </Button>
              </Magnetic>
            </motion.div>

            {/* Socials + availability */}
            <motion.div variants={fadeIn('up', 18)} className="mt-10 flex flex-wrap items-center gap-5">
              <SocialLinks size="sm" />
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[11px] tracking-wide text-muted">
                  {profile.availability}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Visual column ──────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <HeroVisual started={started} />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
        data-cursor="link"
        aria-label="Gulir ke bagian About"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-faint uppercase">Scroll</span>
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="size-1 rounded-full bg-accent"
          />
        </span>
      </motion.button>
    </section>
  )
}
