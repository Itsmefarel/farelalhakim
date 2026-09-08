import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { formatDate, getPostBySlug, posts } from '@/data/posts'
import PageTransition from '@/components/layout/PageTransition'
import Seo from '@/components/seo/Seo'
import Aurora from '@/components/effects/Aurora'
import { Tag } from '@/components/ui/Card'
import Reveal from '@/components/animation/Reveal'

/**
 * Renders one content block.
 *
 * Keeping posts as structured blocks rather than raw markdown means no parser
 * dependency and no `dangerouslySetInnerHTML` — the content can never inject
 * markup into the page.
 */
function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="mt-12 mb-4 font-display text-xl font-bold text-fg md:text-2xl">{block.text}</h2>
      )

    case 'paragraph':
      return <p className="my-5 text-[15px] leading-[1.9] text-muted">{block.text}</p>

    case 'list':
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3.5 text-[15px] leading-relaxed text-muted">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'quote':
      return (
        <blockquote className="my-8 border-l-2 border-accent/60 bg-accent/5 py-4 pr-4 pl-6">
          <p className="font-display text-lg leading-relaxed text-fg italic">{block.text}</p>
        </blockquote>
      )

    case 'code':
      return (
        <div className="my-7 overflow-hidden rounded-xl border border-white/8 bg-surface/70">
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-red-400/60" />
            <span className="size-2.5 rounded-full bg-amber-400/60" />
            <span className="size-2.5 rounded-full bg-emerald-400/60" />
            <span className="ml-2 font-mono text-[10px] text-faint">{block.lang}</span>
          </div>
          {/* Wide code must scroll inside its own box, never the page */}
          <pre className="overflow-x-auto p-4">
            <code className="font-mono text-[12.5px] leading-relaxed whitespace-pre text-muted">
              {block.code}
            </code>
          </pre>
        </div>
      )

    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/404" replace />

  const currentIndex = posts.findIndex((item) => item.slug === slug)
  const nextPost = posts[(currentIndex + 1) % posts.length]

  return (
    <PageTransition>
      <Seo title={post.title} description={post.excerpt} type="article" />

      <article className="relative">
        <header className="relative overflow-hidden pt-32 pb-10 md:pt-40">
          <Aurora variant="compact" />

          <div className="container-page relative max-w-3xl">
            <Reveal>
              <Link
                to="/"
                state={{ scrollTo: 'blog' }}
                data-cursor="link"
                className="group inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-accent"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Semua artikel
              </Link>
            </Reveal>

            <Reveal delay={0.05} className="mt-8">
              <Tag tone="accent">{post.category}</Tag>

              <h1 className="mt-5 font-display text-3xl leading-tight font-bold text-fg md:text-4xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {post.readTime} baca
                </span>
              </div>
            </Reveal>
          </div>
        </header>

        {/* Body */}
        <div className="container-page max-w-3xl pb-16">
          <Reveal>
            <p className="border-l-2 border-accent/40 pl-5 text-base leading-relaxed text-fg/90 md:text-lg">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mt-10">
            {post.content.map((block, index) => (
              // eslint-disable-next-line react/no-array-index-key -- blocks have no stable id
              <Block key={index} block={block} />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2 border-t border-white/8 pt-8">
            {post.tags.map((tag) => (
              <Tag key={tag}>#{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Next post */}
        {nextPost && nextPost.slug !== post.slug && (
          <div className="container-page max-w-3xl pb-24">
            <Link
              to={`/blog/${nextPost.slug}`}
              data-cursor="link"
              className="group block rounded-2xl border border-white/8 bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                Artikel berikutnya
                <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <p className="mt-3 font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent-soft">
                {nextPost.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{nextPost.excerpt}</p>
            </Link>
          </div>
        )}
      </article>
    </PageTransition>
  )
}
