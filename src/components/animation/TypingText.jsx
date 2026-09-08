import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Terminal-style typing effect that cycles through a list of words.
 *
 * Reduced-motion users get the first word rendered statically — the
 * information is identical, only the theatre is removed.
 */
export default function TypingText({
  words = [],
  typingSpeed = 75,
  deletingSpeed = 38,
  pauseDuration = 1800,
  className,
  cursorClassName,
}) {
  const reduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion || words.length === 0) return undefined

    const currentWord = words[wordIndex % words.length]
    const isWordComplete = !isDeleting && text === currentWord
    const isWordCleared = isDeleting && text === ''

    // Finished typing → hold, then start deleting.
    if (isWordComplete) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => clearTimeout(timeout)
    }

    // Finished deleting → move to the next word.
    if (isWordCleared) {
      setIsDeleting(false)
      setWordIndex((index) => (index + 1) % words.length)
      return undefined
    }

    const timeout = setTimeout(
      () => {
        setText((current) =>
          isDeleting ? currentWord.slice(0, current.length - 1) : currentWord.slice(0, current.length + 1),
        )
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, reduceMotion])

  if (reduceMotion) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* aria-live keeps screen readers from announcing every keystroke */}
      <span aria-live="off">{text}</span>
      <span
        aria-hidden="true"
        className={cn(
          'ml-1 inline-block h-[1em] w-[2px] translate-y-[0.08em] bg-accent',
          'motion-safe:animate-[blink_1s_steps(2,start)_infinite]',
          cursorClassName,
        )}
        style={{ animationName: 'blink' }}
      />
      <style>{`@keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`}</style>
    </span>
  )
}
