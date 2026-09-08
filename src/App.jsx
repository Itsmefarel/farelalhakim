import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SmoothScrollProvider } from '@/hooks/useSmoothScroll'
import { AppReadyProvider } from '@/hooks/useAppReady'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/effects/CustomCursor'
import ScrollProgress from '@/components/effects/ScrollProgress'
import Preloader from '@/components/effects/Preloader'
import Home from '@/pages/Home'

// Detail pages are split out of the initial bundle — a recruiter landing on
// the home page should not download case-study code they may never open.
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)

  // Stable identity: an inline arrow would be a new prop on every App render,
  // restarting the preloader's effect each time.
  const handleReady = useCallback(() => setReady(true), [])

  /**
   * The preloader locks body scroll while it runs, so every ScrollTrigger
   * created underneath it measures against a page that cannot scroll.
   * Re-measure once the curtain lifts, and again whenever the route changes.
   */
  useEffect(() => {
    if (!ready) return undefined
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [ready, location.pathname])

  return (
    <SmoothScrollProvider>
      <AppReadyProvider value={ready}>
        {/* First focusable element on the page, so a keyboard user reaches it
            with one Tab. Visible only while focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[400] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Lompat ke konten utama
        </a>

        <Preloader onComplete={handleReady} />

        <CustomCursor />
        <ScrollProgress />
        <Navbar />

        {/* `mode="wait"` lets the outgoing page finish before the next enters */}
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<RouteFallback />} key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>

        <Footer />

        {reduceMotion && <span className="sr-only">Mode animasi minimal aktif.</span>}
      </AppReadyProvider>
    </SmoothScrollProvider>
  )
}

/** Shown while a lazily-loaded route is fetched. */
function RouteFallback() {
  return (
    <div className="grid min-h-svh place-items-center">
      <div className="flex flex-col items-center gap-3">
        <span className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
        <span className="font-mono text-[11px] tracking-[0.3em] text-faint uppercase">Loading</span>
      </div>
    </div>
  )
}
