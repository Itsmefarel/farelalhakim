import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently filling the viewport.
 *
 * Uses IntersectionObserver (cheap, off the main scroll thread) rather than a
 * scroll listener recomputing offsets on every frame.
 *
 * @param {string[]} ids  section ids in document order
 */
export function useScrollSpy(ids, { offset = 0.4 } = {}) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null)

    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport among visible ones.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round((1 - offset) * 100 - 10)}% 0px`,
        threshold: 0,
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}
