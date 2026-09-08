import { cn } from '@/lib/utils'

/**
 * The surface every panel on the site sits on.
 * `interactive` adds the gradient hairline + lift used on hoverable cards.
 */
export default function Card({ children, className, interactive = false, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/8 bg-surface/60 backdrop-blur-sm',
        'shadow-[0_24px_60px_-32px_rgba(2,6,23,0.95)]',
        interactive &&
          'border-glow transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-surface-2/60',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Small pill used for tech stacks, tags and categories. */
export function Tag({ children, className, tone = 'default' }) {
  const tones = {
    default: 'border-white/10 bg-white/5 text-muted',
    accent: 'border-accent/30 bg-accent/10 text-accent-soft',
    primary: 'border-primary/40 bg-primary/15 text-primary-soft',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
