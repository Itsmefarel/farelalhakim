import { useState } from 'react'
import { cn, generatedCover } from '@/lib/utils'

/**
 * Project image with a graceful placeholder.
 *
 * Renders the file at `src`; if the path is empty or the file fails to load,
 * it falls back to the same deterministic gradient tile used elsewhere in the
 * app. That means a case study can ship with its asset paths already wired up
 * before the screenshots exist, without ever showing a broken image.
 *
 * `children` renders on top of the placeholder (label, icon, index number).
 */
export default function ProjectImage({
  src,
  alt,
  seed,
  fit = 'cover',
  loading = 'lazy',
  className,
  children,
}) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('size-full', fit === 'contain' ? 'object-contain' : 'object-cover', className)}
      />
    )
  }

  return (
    <div className={cn('relative size-full', className)} style={generatedCover(seed ?? src ?? alt ?? '')}>
      <div className="absolute inset-0 bg-grid opacity-40" />
      {children}
    </div>
  )
}
