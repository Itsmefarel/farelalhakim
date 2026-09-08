import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUp, MapPin } from 'lucide-react'
import { navLinks } from '@/data/navigation'
import { profile } from '@/data/profile'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import SocialLinks from '@/components/ui/SocialLinks'

export default function Footer() {
  const { scrollTo } = useSmoothScroll()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goToSection = (id) => {
    if (pathname === '/') scrollTo(id === 'home' ? 'top' : id)
    else navigate('/', { state: { scrollTo: id } })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-surface/30">
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px]" />

      <div className="container-page relative py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl border border-accent/30 bg-accent/5 font-display text-sm font-bold text-accent">
                {profile.initials}
              </span>
              <span className="font-display text-base font-semibold">
                {profile.fullName}
                <span className="text-accent">.</span>
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{profile.tagline}</p>

            <div className="mt-5 flex items-center gap-2 font-mono text-xs text-faint">
              <MapPin className="size-3.5 text-accent" />
              {profile.location}
            </div>

            <SocialLinks className="mt-6" size="sm" />
          </div>

          {/* Sitemap */}
          <nav className="md:col-span-4" aria-label="Navigasi footer">
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-faint uppercase">Navigasi</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.id)}
                    data-cursor="link"
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Availability */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-faint uppercase">Status</h3>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-300">{profile.availability}</span>
            </div>

            <a
              href={`mailto:${profile.email}`}
              data-cursor="link"
              className="mt-5 block text-sm break-all text-muted transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-center font-mono text-[11px] text-faint sm:text-left">
            © {new Date().getFullYear()} {profile.fullName}. Dibangun dengan React, Tailwind CSS &amp; Framer Motion.
          </p>

          <button
            type="button"
            onClick={() => scrollTo('top')}
            data-cursor="link"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            Kembali ke atas
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
