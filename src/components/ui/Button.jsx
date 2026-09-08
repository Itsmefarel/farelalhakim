import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * One button, three jobs: router link (`to`), external link (`href`) or
 * plain button. Keeping this in a single component is what stops
 * "almost the same button" copies from spreading across sections.
 */

const VARIANTS = {
  primary:
    'bg-primary text-white shadow-[0_10px_40px_-12px_rgba(37,99,235,0.9)] hover:bg-primary-deep',
  secondary: 'glass text-fg hover:border-accent/50 hover:text-accent-soft',
  ghost: 'bg-transparent text-muted hover:text-fg hover:bg-white/5',
  accent: 'bg-accent text-base font-semibold hover:bg-accent-soft',
}

const SIZES = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className,
    to,
    href,
    icon: Icon,
    iconPosition = 'right',
    ...props
  },
  ref,
) {
  const classes = cn(
    'group relative inline-flex items-center justify-center rounded-full font-medium',
    'transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  )

  // Framer wrappers give every button the same press/hover feel.
  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 24 },
  }

  if (to) {
    return (
      <motion.div className="inline-flex" {...motionProps}>
        <Link ref={ref} to={to} className={classes} data-cursor="link" {...props}>
          {content}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div className="inline-flex" {...motionProps}>
        <a
          ref={ref}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className={classes}
          data-cursor="link"
          {...props}
        >
          {content}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button ref={ref} type="button" className={classes} data-cursor="link" {...motionProps} {...props}>
      {content}
    </motion.button>
  )
})

export default Button
