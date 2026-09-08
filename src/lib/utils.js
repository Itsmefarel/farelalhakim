/**
 * Small helpers shared across the app.
 * Deliberately dependency-free — nothing here justifies an extra package.
 */

/** Join class names, dropping falsy values. `cn('a', cond && 'b')` */
export const cn = (...classes) => classes.filter(Boolean).join(' ')

/** Clamp a number into a range. */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Deterministic hue from a string, so a project without a cover image still
 * gets a consistent, good-looking gradient instead of a broken <img>.
 */
export const hueFromString = (input = '') => {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % 360
}

/** CSS background for a generated project/certificate cover. */
export const generatedCover = (seed) => {
  const hue = hueFromString(seed)
  // Stay inside the brand's cyan→blue band (196–232deg). Going past ~240
  // drifts into violet, which reads as a different brand.
  const brandHue = 196 + (hue % 36)
  // The second stop shifts *down* toward cyan rather than up toward violet.
  const accentHue = brandHue - 18
  return {
    backgroundImage: `radial-gradient(120% 120% at 15% 10%, hsl(${brandHue} 90% 56% / 0.5) 0%, transparent 55%),
       radial-gradient(100% 100% at 90% 90%, hsl(${accentHue} 95% 60% / 0.38) 0%, transparent 60%),
       linear-gradient(160deg, #0b1224 0%, #050816 100%)`,
  }
}

/** Initials for avatar fallbacks: "Farel Al Hakim" → "FA" */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

/** True on touch-primary devices — used to skip cursor/hover-only effects. */
export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
