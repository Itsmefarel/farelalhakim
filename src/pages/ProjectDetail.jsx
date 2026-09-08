import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Figma,
  Github,
  Image as ImageIcon,
  Lightbulb,
  Target,
  TriangleAlert,
} from 'lucide-react'
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects'
import PageTransition from '@/components/layout/PageTransition'
import Seo from '@/components/seo/Seo'
import Aurora from '@/components/effects/Aurora'
import Card, { Tag } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '@/components/animation/Reveal'
import ProjectImage from '@/components/project/ProjectImage'

/** Case-study section wrapper: anchor id + consistent heading treatment. */
function CaseSection({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">{eyebrow}</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-fg md:text-3xl">{title}</h2>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  )
}

/** Bulleted list with a coloured marker — used for problem / goals / solution. */
function MarkedList({ items, tone = 'accent' }) {
  const tones = {
    accent: 'bg-accent',
    danger: 'bg-red-400',
    primary: 'bg-primary-soft',
  }

  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 text-[15px] leading-relaxed text-muted">
          <span className={`mt-2 size-1.5 shrink-0 rounded-full ${tones[tone]}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Gallery entries accept a bare path or a `{ src, caption }` object. */
const normaliseGallery = (gallery = []) =>
  gallery.map((item) => (typeof item === 'string' ? { src: item, caption: '' } : item))

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem & Goal' },
  { id: 'research', label: 'Research' },
  { id: 'process', label: 'Design Process' },
  { id: 'solution', label: 'Solution' },
  { id: 'technology', label: 'Technology' },
  { id: 'result', label: 'Result' },
]

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  // A fresh case study must start at the top, not at the reader's old offset.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return <Navigate to="/404" replace />

  const { previous, next } = getAdjacentProjects(slug)
  const meta = [
    { label: 'Peran', value: project.role },
    { label: 'Timeline', value: project.timeline },
    { label: 'Tim', value: project.team },
    { label: 'Tahun', value: project.year },
  ]

  // `overview` may be a single string or several paragraphs.
  const overviewParagraphs = Array.isArray(project.overview) ? project.overview : [project.overview]
  const gallery = normaliseGallery(project.gallery)

  // Keep the sidebar honest: only list Screenshot when the section renders.
  const toc = gallery.length > 0 ? [...TOC, { id: 'gallery', label: 'Screenshot' }] : TOC

  return (
    <PageTransition>
      <Seo
        title={project.title}
        description={project.excerpt}
        type="article"
      />

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-32 pb-14 md:pt-40">
        <Aurora variant="compact" />

        <div className="container-page relative">
          <Reveal>
            <Link
              to="/"
              state={{ scrollTo: 'projects' }}
              data-cursor="link"
              className="group inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Semua project
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag tone="accent">{project.category}</Tag>
              <span className="font-mono text-[11px] text-faint">{project.year}</span>
            </div>

            <h1 className="mt-5 text-headline text-gradient">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {project.excerpt}
            </p>
          </Reveal>

          {/* Links */}
          {(project.links?.demo || project.links?.github || project.links?.figma) && (
            <Reveal delay={0.1} className="mt-8">
              <div className="flex flex-wrap gap-3">
                {project.links.demo && (
                  <Button href={project.links.demo} icon={ExternalLink} iconPosition="left" size="sm">
                    Live Demo
                  </Button>
                )}
                {project.links.github && (
                  <Button
                    href={project.links.github}
                    variant="secondary"
                    icon={Github}
                    iconPosition="left"
                    size="sm"
                  >
                    Source Code
                  </Button>
                )}
                {project.links.figma && (
                  <Button
                    href={project.links.figma}
                    variant="secondary"
                    icon={Figma}
                    iconPosition="left"
                    size="sm"
                  >
                    Figma File
                  </Button>
                )}
              </div>
            </Reveal>
          )}

          {/* Cover */}
          <Reveal delay={0.15} className="mt-12">
            <div className="relative aspect-16/9 overflow-hidden rounded-2xl border border-white/8">
              <ProjectImage
                src={project.cover}
                alt={`Tampilan ${project.title}`}
                seed={project.slug}
                loading="eager"
              >
                <div className="absolute inset-0 grid place-items-center">
                  <span className="px-8 text-center font-display text-2xl font-bold text-white/25 md:text-4xl">
                    {project.title}
                  </span>
                </div>
              </ProjectImage>
            </div>
          </Reveal>

          {/* Meta strip */}
          <RevealGroup className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-4">
            {meta.map((item) => (
              <RevealItem key={item.label} className="bg-surface/80 p-5">
                <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm font-medium text-fg">{item.value}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="container-page pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky table of contents */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-28" aria-label="Isi case study">
              <p className="font-mono text-[10px] tracking-[0.25em] text-faint uppercase">
                Case Study
              </p>
              <ul className="mt-4 space-y-1 border-l border-white/8">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      data-cursor="link"
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-16 lg:col-span-9">
            <CaseSection id="overview" eyebrow="01" title="Overview">
              <div className="space-y-5">
                {overviewParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-[15px] leading-[1.85] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CaseSection>

            <CaseSection id="problem" eyebrow="02" title="Problem & Goal">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <div className="flex items-center gap-2.5 text-red-300">
                    <TriangleAlert className="size-4" />
                    <h3 className="text-sm font-semibold">Masalah</h3>
                  </div>
                  <div className="mt-4">
                    <MarkedList items={project.problem} tone="danger" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-2.5 text-accent">
                    <Target className="size-4" />
                    <h3 className="text-sm font-semibold">Tujuan</h3>
                  </div>
                  <div className="mt-4">
                    <MarkedList items={project.goals} />
                  </div>
                </Card>
              </div>
            </CaseSection>

            <CaseSection id="research" eyebrow="03" title="Research">
              <MarkedList items={project.research} tone="primary" />
            </CaseSection>

            <CaseSection id="process" eyebrow="04" title="Design Process">
              <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
                {project.process.map((step, index) => (
                  <RevealItem key={step.title}>
                    <Card interactive className="h-full p-6">
                      <span className="font-mono text-xs text-accent tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-3 font-display text-base font-semibold text-fg">{step.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">{step.description}</p>
                    </Card>
                  </RevealItem>
                ))}
              </RevealGroup>
            </CaseSection>

            <CaseSection id="solution" eyebrow="05" title="Solution">
              <MarkedList items={project.solution} />
            </CaseSection>

            <CaseSection id="technology" eyebrow="06" title="Technology">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Tag key={item} tone="accent" className="px-4 py-2 text-xs">
                    {item}
                  </Tag>
                ))}
              </div>
            </CaseSection>

            <CaseSection id="result" eyebrow="07" title="Result">
              <RevealGroup className="grid gap-4 sm:grid-cols-3" stagger={0.08}>
                {project.results.map((result) => (
                  <RevealItem key={result.label}>
                    <Card className="h-full p-6">
                      <p className="font-display text-2xl font-bold text-gradient">{result.value}</p>
                      <p className="mt-2 text-[13px] font-medium text-fg">{result.label}</p>
                      <p className="mt-1 text-[11px] text-faint">{result.detail}</p>
                    </Card>
                  </RevealItem>
                ))}
              </RevealGroup>

              {project.learned && (
                <Reveal delay={0.1} className="mt-6">
                  <Card className="border-accent/20 bg-accent/5 p-6">
                    <div className="flex items-center gap-2.5 text-accent">
                      <Lightbulb className="size-4" />
                      <h3 className="text-sm font-semibold">Yang saya pelajari</h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.learned}</p>
                  </Card>
                </Reveal>
              )}
            </CaseSection>

            {/* Gallery — only rendered when the project defines screenshots */}
            {gallery.length > 0 && (
              <CaseSection id="gallery" eyebrow="08" title="Screenshot">
                <RevealGroup className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
                  {gallery.map((item) => (
                    <RevealItem key={item.src}>
                      <figure>
                        {/* `contain` on a padded tile: app screenshots are tall
                            and would be cropped to pieces by `cover`. */}
                        <div className="aspect-4/3 overflow-hidden rounded-xl border border-white/8 bg-base/40 p-3">
                          <ProjectImage
                            src={item.src}
                            alt={item.caption || `Screenshot ${project.title}`}
                            seed={item.src}
                            fit="contain"
                            className="rounded-lg"
                          >
                            <div className="absolute inset-0 grid place-items-center">
                              <ImageIcon className="size-7 text-white/25" />
                            </div>
                          </ProjectImage>
                        </div>

                        {item.caption && (
                          <figcaption className="mt-3 text-[13px] leading-relaxed text-muted">
                            {item.caption}
                          </figcaption>
                        )}
                      </figure>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </CaseSection>
            )}
          </div>
        </div>

        {/* ── Prev / next ────────────────────────────────────────────── */}
        {previous && next && (
          <nav className="mt-20 grid gap-4 border-t border-white/8 pt-10 sm:grid-cols-2" aria-label="Project lain">
            <Link
              to={`/projects/${previous.slug}`}
              data-cursor="link"
              className="group rounded-2xl border border-white/8 bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
                Sebelumnya
              </span>
              <p className="mt-3 font-display text-base font-semibold text-fg transition-colors group-hover:text-accent-soft">
                {previous.title}
              </p>
            </Link>

            <Link
              to={`/projects/${next.slug}`}
              data-cursor="link"
              className="group rounded-2xl border border-white/8 bg-surface/50 p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                Berikutnya
                <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <p className="mt-3 font-display text-base font-semibold text-fg transition-colors group-hover:text-accent-soft">
                {next.title}
              </p>
            </Link>
          </nav>
        )}
      </div>
    </PageTransition>
  )
}
