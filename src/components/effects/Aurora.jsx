import { cn } from '@/lib/utils'

/**
 * Decorative background: blurred brand-coloured blobs plus the blueprint grid.
 * Purely presentational — hidden from assistive tech.
 */
export default function Aurora({ className, variant = 'default' }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className="absolute inset-0 bg-grid mask-radial opacity-60" />

      <div
        className={cn(
          'absolute -top-32 -left-24 size-[32rem] rounded-full bg-primary/25 blur-[120px]',
          'motion-safe:animate-float-slow',
        )}
      />
      <div
        className={cn(
          'absolute top-1/3 -right-32 size-[28rem] rounded-full bg-accent/20 blur-[130px]',
          'motion-safe:animate-float',
        )}
        style={{ animationDelay: '1.5s' }}
      />

      {variant === 'default' && (
        <div className="absolute -bottom-40 left-1/3 size-[30rem] rounded-full bg-primary-deep/20 blur-[140px]" />
      )}

      {/* Fade the whole field into the page background at the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent" />
    </div>
  )
}
