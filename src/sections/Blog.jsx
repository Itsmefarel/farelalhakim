import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import { formatDate, posts } from '@/data/posts'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card, { Tag } from '@/components/ui/Card'
import { RevealGroup, RevealItem } from '@/components/animation/Reveal'

export default function Blog() {
  return (
    <Section id="blog" className="relative">
      <SectionHeading
        eyebrow="07 — Blog"
        title="Catatan & Pemikiran"
        description="Tulisan singkat tentang proses belajar, keputusan desain, dan hal-hal yang saya temukan di lapangan."
      />

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
        {posts.map((post) => (
          <RevealItem key={post.slug}>
            <Card interactive className="group relative flex h-full flex-col p-6 md:p-7">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-wide text-faint uppercase">
                <span className="text-accent">{post.category}</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg leading-snug font-semibold text-fg transition-colors duration-300 group-hover:text-accent-soft">
                <Link
                  to={`/blog/${post.slug}`}
                  data-cursor="link"
                  className="before:absolute before:inset-0 before:content-['']"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 line-clamp-4 flex-1 text-[13px] leading-relaxed text-muted">
                {post.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Tag key={tag}>#{tag}</Tag>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-1.5 border-t border-white/8 pt-4 text-[13px] font-medium text-accent">
                Baca artikel
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
