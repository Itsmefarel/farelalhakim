import { Home as HomeIcon } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import Seo from '@/components/seo/Seo'
import Aurora from '@/components/effects/Aurora'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <PageTransition>
      <Seo title="404 — Halaman tidak ditemukan" />

      <section className="relative grid min-h-svh place-items-center overflow-hidden px-6">
        <Aurora />

        <div className="relative z-10 text-center">
          <p className="font-mono text-[11px] tracking-[0.35em] text-accent uppercase">Error 404</p>
          <h1 className="mt-4 text-display text-gradient">Halaman tidak ditemukan</h1>
          <p className="mx-auto mt-5 max-w-md text-muted">
            Tautan yang Anda buka mungkin sudah dipindahkan atau tidak pernah ada.
          </p>
          <Button to="/" className="mt-8" icon={HomeIcon} iconPosition="left">
            Kembali ke Beranda
          </Button>
        </div>
      </section>
    </PageTransition>
  )
}
