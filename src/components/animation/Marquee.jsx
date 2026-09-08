import { cn } from '@/lib/utils'

/**
 * Infinite horizontal ticker.
 *
 * The list is rendered twice and translated -50%, so the loop is seamless
 * with a single CSS animation — no JS on the scroll path.
 */
export default function Marquee({ items = [], className, itemClassName, reverse = false, speed = 34 }) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        '[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]',
        className,
      )}
    >
      <div
        className="flex shrink-0 items-center gap-3 pr-3 motion-safe:animate-[marquee_var(--speed)_linear_infinite] motion-safe:group-hover:[animation-play-state:paused]"
        style={{ '--speed': `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key -- duplicated list, index is the only stable key
            key={`${item}-${index}`}
            className={cn(
              'rounded-full border border-white/8 bg-surface/60 px-4 py-2 font-mono text-xs whitespace-nowrap text-muted',
              'transition-colors duration-300 hover:border-accent/40 hover:text-accent-soft',
              itemClassName,
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
