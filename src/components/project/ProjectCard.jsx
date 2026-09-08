import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { Tag } from '@/components/ui/Card'
import ProjectImage from '@/components/project/ProjectImage'
import { cn } from '@/lib/utils'

/**
 * Project card used in the showcase grid.
 *
 * When `cover` is missing it paints a deterministic gradient derived from the
 * slug instead of rendering a broken image — so the grid always looks
 * finished, even before real screenshots exist.
 */
export default function ProjectCard({ project, index = 0 }) {
  const { slug, title, category, year, excerpt, tech, cover, links } = project

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface/60',
        'border-glow shadow-[0_24px_60px_-32px_rgba(2,6,23,0.95)]',
        'transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5',
      )}
    >
      {/* ── Cover ──────────────────────────────────────────────────── */}
      <Link
        to={`/projects/${slug}`}
        data-cursor="view"
        aria-label={`Lihat case study ${title}`}
        className="relative block aspect-16/10 overflow-hidden"
      >
        <ProjectImage
          src={cover}
          alt={`Pratinjau ${title}`}
          seed={slug}
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        >
          <span className="absolute right-5 bottom-4 font-display text-6xl font-bold text-white/8 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="absolute top-4 left-5 font-mono text-[10px] tracking-[0.25em] text-white/45 uppercase">
            {category}
          </span>
        </ProjectImage>

        {/* Bottom fade so the meta row below reads cleanly */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
      </Link>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
          <span className="text-accent">{category}</span>
          <span className="h-px flex-1 bg-white/8" />
          <span>{year}</span>
        </div>

        <h3 className="mt-4 font-display text-xl leading-snug font-semibold text-fg transition-colors duration-300 group-hover:text-accent-soft">
          <Link to={`/projects/${slug}`} data-cursor="link" className="before:absolute before:inset-0 before:content-['']">
            {title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted">{excerpt}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tech.slice(0, 4).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
          {tech.length > 4 && <Tag tone="accent">+{tech.length - 4}</Tag>}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
            View Case Study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>

          {/* z-10 keeps these clickable above the card's full-surface link */}
          <div className="relative z-10 flex items-center gap-1">
            {links?.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Repositori ${title}`}
                data-cursor="link"
                className="grid size-8 place-items-center rounded-lg text-faint transition-colors hover:bg-white/5 hover:text-accent"
              >
                <Github className="size-4" />
              </a>
            )}
            {links?.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Demo ${title}`}
                data-cursor="link"
                className="grid size-8 place-items-center rounded-lg text-faint transition-colors hover:bg-white/5 hover:text-accent"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
