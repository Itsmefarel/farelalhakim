import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteMeta } from '@/data/profile'

/** Create the tag if missing, then set its content. */
const setMeta = (selector, attributes) => {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== 'content') tag.setAttribute(key, value)
    })
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', attributes.content)
}

/**
 * Per-route SEO. Drop <Seo /> at the top of any page component.
 *
 * A dependency-free alternative to react-helmet: for a site this size, one
 * effect writing to document.head is all that is needed.
 */
export default function Seo({ title, description, image, type = 'website' }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const pageTitle = title ? `${title} — ${siteMeta.siteName}` : siteMeta.defaultTitle
    const pageDescription = description ?? siteMeta.defaultDescription
    const url = `${siteMeta.url}${pathname}`
    const pageImage = image ?? `${siteMeta.url}/og-image.svg`

    document.title = pageTitle

    setMeta('meta[name="description"]', { name: 'description', content: pageDescription })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: pageDescription })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: pageImage })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: pageDescription })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: pageImage })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, image, type, pathname])

  return null
}
