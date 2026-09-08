import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FolderOpen } from 'lucide-react'
import { projectCategories, projects } from '@/data/projects'
import { EASE, viewportOnce } from '@/lib/motion'
import Section, { SectionHeading } from '@/components/ui/Section'
import ProjectCard from '@/components/project/ProjectCard'
import Reveal from '@/components/animation/Reveal'
import { cn } from '@/lib/utils'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  // Featured projects float to the top within whatever filter is active.
  const visibleProjects = useMemo(() => {
    const filtered =
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory)

    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [activeCategory])

  return (
    <Section id="projects" className="relative">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="05 — Projects"
          title="Selected Work"
          description="Setiap project punya halaman case study: masalahnya apa, apa yang saya kerjakan, dan hasilnya bagaimana."
        />

        <Reveal delay={0.1} className="shrink-0">
          <div className="font-mono text-[11px] text-faint">
            <span className="text-accent tabular-nums">{String(projects.length).padStart(2, '0')}</span>{' '}
            project terdokumentasi
          </div>
        </Reveal>
      </div>

      {/* ── Category filter ──────────────────────────────────────────── */}
      <Reveal delay={0.15} className="mt-10">
        <div role="tablist" aria-label="Filter kategori project" className="flex flex-wrap gap-2">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                data-cursor="link"
                className={cn(
                  'relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300',
                  isActive ? 'text-base' : 'text-muted hover:text-fg',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.06 * index, ease: EASE }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state — only reachable if a category is emptied out later */}
      {visibleProjects.length === 0 && (
        <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-white/10 py-16">
          <FolderOpen className="size-8 text-faint" />
          <p className="mt-3 text-sm text-muted">Belum ada project pada kategori ini.</p>
        </div>
      )}
    </Section>
  )
}
