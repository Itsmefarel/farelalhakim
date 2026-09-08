import { MapPin, Sparkle, Users } from 'lucide-react'
import { leadership } from '@/data/leadership'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card, { Tag } from '@/components/ui/Card'
import Reveal, { RevealGroup, RevealItem } from '@/components/animation/Reveal'
import ProjectImage from '@/components/project/ProjectImage'

const ICONS = { users: Users }

/**
 * LEADERSHIP EXPERIENCE
 *
 * Sengaja terpisah dari timeline Experience: peran kepemimpinan program
 * bukan pengalaman kerja, dan mencampurnya membuat riwayat profesional
 * jadi kabur. Kartu memakai bahasa visual yang sama persis dengan
 * Experience agar halaman tetap terbaca satu kesatuan.
 */
export default function Leadership() {
  return (
    <Section id="leadership">
      <SectionHeading
        eyebrow="03 — Leadership"
        title="Leadership Experience"
        description="Peran organisasi tempat saya belajar mengoordinasi orang, bukan hanya data."
      />

      <div className="mt-12 space-y-6">
        {leadership.map((item, index) => {
          const Icon = ICONS[item.icon] ?? Users

          return (
            <Reveal key={item.id} delay={0.05 * index}>
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
                      <p className="mt-1 text-sm text-accent-soft">{item.organization}</p>

                      {item.location && (
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-faint">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3" />
                            {item.location}
                          </span>
                        </div>
                      )}
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

                {/* Skills */}
                {item.stack?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.stack.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                )}

                {/* Dokumentasi */}
                {item.gallery?.length > 0 && (
                  <div className="mt-7 border-t border-white/8 pt-6">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                      Dokumentasi
                    </p>

                    <RevealGroup className="mt-4 grid gap-5 sm:grid-cols-2" stagger={0.08}>
                      {item.gallery.map((photo) => (
                        <RevealItem key={photo.src}>
                          <figure>
                            <div className="aspect-16/10 overflow-hidden rounded-xl border border-white/8 bg-base/40">
                              <ProjectImage
                                src={photo.src}
                                alt={photo.caption}
                                seed={photo.src}
                                className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                              >
                                <div className="absolute inset-0 grid place-items-center">
                                  <Users className="size-7 text-white/25" />
                                </div>
                              </ProjectImage>
                            </div>

                            {photo.caption && (
                              <figcaption className="mt-3 text-[13px] leading-relaxed text-muted">
                                {photo.caption}
                              </figcaption>
                            )}
                          </figure>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </div>
                )}
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
