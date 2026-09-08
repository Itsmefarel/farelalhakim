import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeIn, viewportOnce } from '@/lib/motion'

/**
 * Section wrapper. Owns the vertical rhythm and the `id` that both the
 * navbar scroll-spy and the smooth-scroll navigation depend on.
 */
export default function Section({ id, children, className, ...props }) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-20 md:py-28 lg:py-36', className)} {...props}>
      <div className="container-page">{children}</div>
    </section>
  )
}

/**
 * Section heading with the numbered eyebrow used site-wide.
 * `align="center"` for full-width sections, default left for content sections.
 */
export function SectionHeading({ eyebrow, title, description, align = 'left', className }) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeIn('up', 24)}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-accent uppercase',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
          {eyebrow}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent" />
        </div>
      )}

      <h2 className="text-headline text-gradient">{title}</h2>

      {description && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </motion.header>
  )
}
