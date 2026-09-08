import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScrollContext = createContext({ scrollTo: () => {}, lenis: null })

/**
 * Drives page-wide smooth scrolling with Lenis and keeps GSAP's ScrollTrigger
 * in sync with it — without this, GSAP would read the native scroll position
 * while Lenis renders an interpolated one, and every pinned animation would
 * drift.
 *
 * Users who asked their OS for reduced motion get native scrolling instead.
 */
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setReady(true)
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    // Let GSAP's ticker own the RAF loop so both libraries share one frame.
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    setReady(true)

    // Late layout shifts (web fonts landing, the preloader releasing the body
    // scroll lock) invalidate every cached trigger position. Without these
    // refreshes ScrollTrigger keeps measuring against a page that no longer
    // exists and scroll animations never fire.
    // Lenis emits 'scroll' only for scrolls it drives. A native scroll from
    // elsewhere (a hash jump, scrollIntoView, the keyboard) would otherwise
    // leave ScrollTrigger reading a stale position.
    const onNativeScroll = () => ScrollTrigger.update()
    window.addEventListener('scroll', onNativeScroll, { passive: true })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {})

    return () => {
      window.removeEventListener('scroll', onNativeScroll)
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /**
   * Scroll to a section id (or the top). Falls back to the native API when
   * Lenis is disabled, so navigation always works.
   */
  const scrollTo = useCallback((target, options = {}) => {
    const offset = options.offset ?? -72 // clears the fixed navbar
    const lenis = lenisRef.current

    if (target === 'top' || target === 0) {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const selector = typeof target === 'string' ? `#${target.replace(/^#/, '')}` : target
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector
    if (!element) return

    if (lenis) {
      lenis.scrollTo(element, { offset, duration: 1.25 })
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, lenis: lenisRef.current, ready }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export const useSmoothScroll = () => useContext(SmoothScrollContext)
