import { Award, FolderCode, GraduationCap, Layers, LineChart, PenTool, Search, Code } from 'lucide-react'
import { profile } from '@/data/profile'
import { workflow } from '@/data/skills'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Reveal, { RevealGroup, RevealItem } from '@/components/animation/Reveal'
import CountUp from '@/components/animation/CountUp'

/** Icon names in the data files map to components here — data stays serialisable. */
const ICONS = {
  award: Award,
  layers: Layers,
  'folder-code': FolderCode,
  'graduation-cap': GraduationCap,
  search: Search,
  'pen-tool': PenTool,
  code: Code,
  'line-chart': LineChart,
}

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Narrative ──────────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="01 — About Me"
            title="My Journey"
            description="Dari ruang kuliah, ke lapangan, sampai ke layar yang Anda buka sekarang."
          />

          <div className="mt-8 space-y-5">
            {profile.intro.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.08 * index}>
                <p className="text-base leading-[1.85] text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* How I work */}
          <Reveal delay={0.15} className="mt-12">
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
              How I Work
            </h3>
          </Reveal>

          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2" stagger={0.09}>
            {workflow.map((step) => {
              const Icon = ICONS[step.icon] ?? Code
              return (
                <RevealItem key={step.step}>
                  <Card interactive className="group h-full p-5">
                    <div className="flex items-start gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/8 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                        <Icon className="size-4.5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-faint">{step.step}</span>
                          <h4 className="text-sm font-semibold text-fg">{step.title}</h4>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>

        {/* ── Achievement cards ──────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <RevealGroup className="grid grid-cols-2 gap-4" stagger={0.1}>
              {profile.stats.map((stat) => {
                const Icon = ICONS[stat.icon] ?? Award
                return (
                  <RevealItem key={stat.label}>
                    <Card interactive className="group relative h-full overflow-hidden p-5">
                      {/* Corner glow that lights up on hover */}
                      <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-accent/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />

                      <Icon className="size-5 text-accent" />

                      <div className="mt-6 font-display text-4xl font-bold tracking-tight text-fg tabular-nums">
                        <CountUp
                          value={stat.value}
                          decimals={stat.decimals ?? 0}
                          suffix={stat.suffix ?? ''}
                          raw={stat.raw}
                        />
                      </div>

                      <div className="mt-2 text-[13px] font-medium text-fg">{stat.label}</div>
                      <div className="mt-0.5 text-[11px] text-faint">{stat.caption}</div>
                    </Card>
                  </RevealItem>
                )
              })}
            </RevealGroup>

            {/* Pull quote */}
            <Reveal delay={0.2} className="mt-4">
              <Card className="relative p-6">
                <span className="absolute top-3 left-5 font-display text-5xl leading-none text-accent/20">
                  &ldquo;
                </span>
                <p className="relative text-[15px] leading-relaxed text-muted italic">
                  Teknologi yang baik bukan yang paling rumit — melainkan yang paling menyelesaikan
                  masalah.
                </p>
                <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                  <span className="h-px w-6 bg-accent/50" />
                  {profile.fullName}
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
