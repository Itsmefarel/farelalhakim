import { motion } from 'framer-motion'
import { Code2, PenTool, ServerCog, Users } from 'lucide-react'
import { focusAreas, skillCategories, toolbelt } from '@/data/skills'
import { EASE, viewportOnce } from '@/lib/motion'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card, { Tag } from '@/components/ui/Card'
import RadialStat from '@/components/ui/RadialStat'
import Reveal, { RevealGroup, RevealItem } from '@/components/animation/Reveal'
import CountUp from '@/components/animation/CountUp'
import Marquee from '@/components/animation/Marquee'

const ICONS = {
  'pen-tool': PenTool,
  'code-2': Code2,
  'server-cog': ServerCog,
  users: Users,
}

/** One row of the skill dashboard: label, level, and an animated meter. */
function SkillMeter({ skill, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: 0.06 * index, ease: EASE }}
      className="group"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-fg transition-colors duration-300 group-hover:text-accent-soft">
          {skill.name}
        </span>
        <span className="font-mono text-[11px] text-faint tabular-nums">
          <CountUp value={skill.level} suffix="%" />
        </span>
      </div>

      {/* Meter */}
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/6">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, delay: 0.1 + 0.06 * index, ease: EASE }}
          className="relative h-full rounded-full bg-gradient-to-r from-primary to-accent"
        >
          {/* Travelling highlight */}
          <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-safe:animate-shimmer bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.55)_50%,transparent_80%)] bg-[length:200%_100%]" />
        </motion.div>
      </div>

      {/* Tools appear on hover — keeps the default view uncluttered */}
      <div className="mt-2 flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:opacity-60">
        {skill.tools.map((tool) => (
          <span key={tool} className="font-mono text-[10px] text-faint">
            {tool}
          </span>
        ))}
      </div>
    </motion.li>
  )
}

export default function Skills() {
  return (
    <Section id="skills" className="relative overflow-hidden">
      {/* Section-level glow */}
      <div className="pointer-events-none absolute top-1/4 -left-40 size-96 rounded-full bg-primary/10 blur-[130px]" />

      <SectionHeading
        eyebrow="04 — Skills"
        title="Capability Dashboard"
        description="Bukan sekadar daftar keahlian — ini gambaran seberapa jauh saya bisa diandalkan di tiap area."
        align="center"
        className="mx-auto"
      />

      {/* ── Focus areas ──────────────────────────────────────────────── */}
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-3" stagger={0.1}>
        {focusAreas.map((area) => {
          const Icon = ICONS[area.icon] ?? Code2
          return (
            <RevealItem key={area.id}>
              <Card interactive className="group flex h-full items-center gap-5 p-6">
                <RadialStat value={area.value}>
                  <span className="font-display text-base font-bold text-fg tabular-nums">
                    <CountUp value={area.value} suffix="%" />
                  </span>
                </RadialStat>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-accent" />
                    <h3 className="font-display text-base font-semibold text-fg">{area.label}</h3>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{area.caption}</p>
                </div>
              </Card>
            </RevealItem>
          )
        })}
      </RevealGroup>

      {/* ── Skill panels ─────────────────────────────────────────────── */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = ICONS[category.icon] ?? Code2
          return (
            <Reveal key={category.id} delay={0.08 * categoryIndex}>
              <Card className="h-full p-6 md:p-8">
                {/* Panel header */}
                <div className="flex items-start gap-4 border-b border-white/8 pb-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/8 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-fg">{category.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{category.description}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-5">
                  {category.skills.map((skill, index) => (
                    <SkillMeter key={skill.name} skill={skill} index={index} />
                  ))}
                </ul>
              </Card>
            </Reveal>
          )
        })}
      </div>

      {/* ── Toolbelt ─────────────────────────────────────────────────── */}
      <Reveal delay={0.1} className="mt-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/20" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-faint uppercase">Toolbelt</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/20" />
        </div>
        <Marquee items={toolbelt} className="mt-5 py-2" />
      </Reveal>

      {/* Honest note — recruiters value calibration over inflated bars */}
      <Reveal delay={0.15} className="mt-6">
        <p className="text-center font-mono text-[11px] text-faint">
          Persentase menggambarkan tingkat kemandirian, bukan sertifikasi formal.
        </p>
      </Reveal>

      {/* Legend */}
      <Reveal delay={0.2} className="mt-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            ['40–59', 'Familiar'],
            ['60–74', 'Competent'],
            ['75–89', 'Proficient'],
            ['90+', 'Advanced'],
          ].map(([range, label]) => (
            <Tag key={label}>
              {range} · {label}
            </Tag>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
