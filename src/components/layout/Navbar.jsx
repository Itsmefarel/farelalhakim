import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { navLinks } from '@/data/navigation'
import { profile } from '@/data/profile'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'
import Button from '@/components/ui/Button'

const SECTION_IDS = navLinks.map((link) => link.id)

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { scrollTo } = useSmoothScroll()
  const { scrollY } = useScroll()

  const isHome = pathname === '/'
  const activeSection = useScrollSpy(SECTION_IDS)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /**
   * From the home page: smooth-scroll to the section.
   * From anywhere else: go home first and let Home.jsx perform the scroll.
   */
  const goToSection = useCallback(
    (id) => {
      setMenuOpen(false)
      if (isHome) {
        if (id === 'home') scrollTo('top')
        else scrollTo(id)
      } else {
        navigate('/', { state: { scrollTo: id } })
      }
    },
    [isHome, navigate, scrollTo],
  )

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 md:px-6 md:pt-5"
      >
        <nav
          className={cn(
            'container-page flex items-center justify-between rounded-full transition-all duration-500',
            'ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled
              ? 'glass h-14 shadow-[0_18px_50px_-24px_rgba(2,6,23,0.9)]'
              : 'h-16 border border-transparent bg-transparent',
          )}
          aria-label="Navigasi utama"
        >
          {/* Monogram */}
          <button
            type="button"
            onClick={() => goToSection('home')}
            data-cursor="link"
            className="group flex items-center gap-2.5"
            aria-label="Kembali ke atas"
          >
            <span className="relative grid size-9 place-items-center rounded-xl border border-accent/30 bg-accent/5">
              <span className="font-display text-sm font-bold text-accent">{profile.initials}</span>
              <span className="absolute inset-0 rounded-xl border border-accent/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-safe:group-hover:animate-[pulse-ring_1.8s_ease-out_infinite]" />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {profile.fullName}
              <span className="text-accent">.</span>
            </span>
          </button>

          {/* Desktop links — xl, not lg: with nine sections the row no longer
              fits beside the logo and CTAs at 1024px. */}
          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.id
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.id)}
                    data-cursor="link"
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-accent/25 bg-accent/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              href={profile.resumeUrl}
              download
              variant="secondary"
              size="sm"
              icon={Download}
              iconPosition="left"
              className="hidden sm:inline-flex"
            >
              CV
            </Button>

            <Button onClick={() => goToSection('contact')} size="sm" className="hidden sm:inline-flex">
              Hire Me
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              data-cursor="link"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full border border-white/10 text-fg transition-colors hover:border-accent/40 hover:text-accent xl:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] bg-base/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-page flex h-full flex-col justify-center gap-2 pt-20 pb-10">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.45, delay: 0.05 * index, ease: EASE }}
                  className="group flex items-baseline gap-4 border-b border-white/5 py-4 text-left"
                >
                  <span className="font-mono text-[11px] text-accent/70">
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      'font-display text-2xl font-semibold transition-colors duration-300 group-hover:text-accent',
                      isHome && activeSection === link.id ? 'text-accent' : 'text-fg',
                    )}
                  >
                    {link.label}
                  </span>
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button href={profile.resumeUrl} download variant="secondary" icon={Download} iconPosition="left">
                  Download CV
                </Button>
                <Button onClick={() => goToSection('contact')}>Hire Me</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
