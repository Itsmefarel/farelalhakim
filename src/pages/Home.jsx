import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import PageTransition from '@/components/layout/PageTransition'
import Seo from '@/components/seo/Seo'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Leadership from '@/sections/Leadership'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Certifications from '@/sections/Certifications'
import Blog from '@/sections/Blog'
import Contact from '@/sections/Contact'

/**
 * HOME — one continuous scroll so a recruiter can read the whole story
 * without a single extra click. Deep links (project case studies, blog posts)
 * live on their own routes.
 */
export default function Home() {
  const location = useLocation()
  const { scrollTo } = useSmoothScroll()

  // Arriving from another page via the navbar: finish the scroll here.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return

    // Wait one frame so the sections are mounted before measuring offsets.
    const timeout = setTimeout(() => {
      if (target === 'home') scrollTo('top')
      else scrollTo(target)
    }, 120)

    return () => clearTimeout(timeout)
  }, [location.state, scrollTo])

  return (
    <PageTransition>
      <Seo />

      <Hero />
      <About />
      <Experience />
      <Leadership />
      <Skills />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
    </PageTransition>
  )
}
