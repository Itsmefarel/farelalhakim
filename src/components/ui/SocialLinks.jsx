import { Dribbble, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

/**
 * Social icon row.
 * Entries with an empty URL in profile.js are skipped automatically, so the
 * footer never shows a link that goes nowhere.
 */
const ICONS = {
  github: { icon: Github, label: 'GitHub' },
  linkedin: { icon: Linkedin, label: 'LinkedIn' },
  instagram: { icon: Instagram, label: 'Instagram' },
  dribbble: { icon: Dribbble, label: 'Dribbble' },
}

export default function SocialLinks({ className, size = 'md', withEmail = true }) {
  const entries = Object.entries(profile.socials).filter(([key, url]) => url && ICONS[key])

  const sizes = {
    sm: 'size-9 [&_svg]:size-4',
    md: 'size-11 [&_svg]:size-[18px]',
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {entries.map(([key, url]) => {
        const { icon: Icon, label } = ICONS[key]
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            title={label}
            data-cursor="link"
            className={cn(
              'group grid place-items-center rounded-full border border-white/10 bg-surface/50 text-muted',
              'transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent',
              sizes[size],
            )}
          >
            <Icon />
          </a>
        )
      })}

      {withEmail && profile.email && (
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          title="Email"
          data-cursor="link"
          className={cn(
            'group grid place-items-center rounded-full border border-white/10 bg-surface/50 text-muted',
            'transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent',
            sizes[size],
          )}
        >
          <Mail />
        </a>
      )}
    </div>
  )
}
