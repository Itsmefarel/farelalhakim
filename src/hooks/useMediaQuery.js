import { useEffect, useState } from 'react'

/**
 * Subscribe to a CSS media query from JS.
 * Used to skip desktop-only effects (custom cursor, magnetic hover) on touch
 * devices instead of rendering them and hiding with CSS.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    setMatches(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the device has a real pointer (mouse/trackpad). */
export const useIsPointerFine = () => useMediaQuery('(hover: hover) and (pointer: fine)')
