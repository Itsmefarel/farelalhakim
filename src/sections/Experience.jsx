import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Building2,
  Database,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkle,
} from 'lucide-react'
import { education, experiences } from '@/data/experience'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card, { Tag } from '@/components/ui/Card'
import Reveal, { RevealGroup, RevealItem } from '@/components/animation/Reveal'
import ProjectImage from '@/components/project/ProjectImage'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  database: Database,
  'shield-check': ShieldCheck,
  'graduation-cap': GraduationCap,
}

export default function Experience() {
  const timelineRef = useRef(null)
  const lineRef = useRef(null)

  /**
   * The timeline "draws" itself as the section scrolls past.
   *
   * GSAP handles this rather than Framer Motion because it is a scrubbed
   * animation tied to scroll position, and ScrollTrigger is already synced
   * with Lenis in SmoothScrollProvider.
   */
  useEffect(() => {
    const context = gsap.context(() => {
      if (!lineRef.current) return

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 72%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        },
      )

      // Each node pops once the drawn line reaches it.
      gsap.utils.toArray('[data-timeline-node]').forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: node, start: 'top 80%' },
          },
        )
      })
    }, timelineRef)

    // gsap.context().revert() cleans up every tween and ScrollTrigger created
    // inside it — required because StrictMode runs effects twice in dev.
    return () => context.revert()
  }, [])

  return (
    <Section id="experience" className="relative">
      <SectionHeading
        eyebrow="02 — Experience"
        title="Pengalaman & Pendidikan"
        description="Tempat saya belajar menerjemahkan kebutuhan nyata menjadi solusi yang bisa dipakai."
      />

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <div ref={timelineRef} className="relative mt-14 pl-8 sm:pl-12 md:mt-16">
        {/* Track + animated fill */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-white/8 sm:left-[15px]" aria-hidden="true">
          <div ref={lineRef} className="h-full w-full origin-top bg-gradient-to-b from-accent via-primary to-transparent" />
        </div>

        <div className="space-y-8">
          {experiences.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Building2

            return (
              <div key={item.id} className="relative">
                {/* Node */}
                <span
                  data-timeline-node
                  className="absolute top-6 -left-8 grid size-4 place-items-center rounded-full border-2 border-accent bg-base sm:-left-12 sm:size-[18px]"
                  aria-hidden="true"
                >
                  <span className="size-1.5 rounded-full bg-accent" />
                </span>

                <Reveal delay={0.05 * index} direction="left" distance={28}>
                  <Card interactive className="group p-6 md:p-7">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-accent transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
                          <Icon className="size-5" />
                        </span>

                        <div>
                          <h3 className="font-display text-lg leading-tight font-semibold text-fg md:text-xl">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm text-accent-soft">{item.company}</p>

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-faint">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-3" />
                              {item.location}
                            </span>
                            <span>{item.type}</span>
                          </div>
                        </div>
                      </div>

                      <Tag tone="accent" className="shrink-0">
                        {item.period}
                      </Tag>
                    </div>

                    {/* Summary */}
                    <p className="mt-5 text-sm leading-relaxed text-muted">{item.summary}</p>

                    {/* Highlights */}
                    <ul className="mt-5 space-y-2.5">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                          <Sparkle className="mt-1 size-3 shrink-0 text-accent/70" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Education ────────────────────────────────────────────────── */}
      <Reveal className="mt-16">
        <h3 className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
          Education
        </h3>
      </Reveal>

      {/* A lone education entry gets the full width — a half-empty two-column
          grid reads as a layout bug, not a design choice. */}
      <RevealGroup
        className={cn('mt-6 grid gap-4', education.length > 1 && 'md:grid-cols-2')}
        stagger={0.1}
      >
        {education.map((item) => (
          <RevealItem key={item.id}>
            <Card interactive className="group relative h-full overflow-hidden p-6 md:p-7">
              <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/8 text-accent">
                  <GraduationCap className="size-5" />
                </span>

                {/* GPA badge */}
                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-gradient tabular-nums">{item.gpa}</div>
                  <div className="font-mono text-[10px] text-faint">/ {item.gpaScale} IPK</div>
                </div>
              </div>

              {/* Full-width single card splits into two columns so the text
                  never stretches into one long line. */}
              <div
                className={cn(
                  'relative mt-5 grid gap-6',
                  education.length === 1 && 'md:grid-cols-2 md:items-start md:gap-10',
                )}
              >
                <div>
                  <h4 className="font-display text-lg font-semibold text-fg">{item.degree}</h4>
                  <p className="mt-1 text-sm text-accent-soft">{item.school}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-faint">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3" />
                      {item.location}
                    </span>
                    <span>{item.period}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.notes.map((note) => (
                    <li key={note} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                      <Sparkle className="mt-1 size-3 shrink-0 text-accent/70" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tugas akhir — karya terbesar selama kuliah, ditampilkan di
                  kartu pendidikan agar tidak bersaing dengan Selected Work. */}
              {item.thesisTitle && (
                <div className="relative mt-7 border-t border-white/8 pt-6">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-8">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                        Tugas Akhir
                      </p>

                      <h5 className="mt-3 font-display text-base leading-snug font-semibold text-fg">
                        {item.thesisTitle}
                      </h5>

                      {item.role && <p className="mt-2 text-[12px] text-accent-soft">{item.role}</p>}

                      {item.thesisDescription && (
                        <p className="mt-3 text-[13px] leading-relaxed text-muted">
                          {item.thesisDescription}
                        </p>
                      )}

                      {item.technology?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.technology.map((tech) => (
                            <Tag key={tech}>{tech}</Tag>
                          ))}
                        </div>
                      )}

                      {item.repositoryUrl && (
                        <a
                          href={item.repositoryUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          data-cursor="link"
                          className="group/repo mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-accent transition-colors hover:text-accent-soft"
                        >
                          Lihat di repository kampus
                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5" />
                        </a>
                      )}
                    </div>

                    {/* Foto wisuda — pendukung, bukan foto profil utama */}
                    <figure className="aspect-4/3 overflow-hidden rounded-xl border border-white/8 bg-base/40 md:aspect-auto">
                      <ProjectImage src={item.image} alt={`Wisuda ${item.degree}`} seed={item.id}>
                        <div className="absolute inset-0 grid place-items-center">
                          <GraduationCap className="size-7 text-white/25" />
                        </div>
                      </ProjectImage>
                    </figure>
                  </div>
                </div>
              )}
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
