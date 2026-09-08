import { useState } from 'react'
import { Award, Download, ExternalLink, Maximize2 } from 'lucide-react'
import { certifications } from '@/data/certifications'
import { cn, generatedCover } from '@/lib/utils'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card, { Tag } from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { RevealGroup, RevealItem } from '@/components/animation/Reveal'

/** Shared preview surface — a real image if there is one, a gradient if not. */
function CertificatePreview({ certificate, className = '' }) {
  if (certificate.image) {
    return (
      <img
        src={certificate.image}
        alt={`Sertifikat ${certificate.title}`}
        loading="lazy"
        decoding="async"
        className={`size-full object-cover ${className}`}
      />
    )
  }

  return (
    <div className={`relative size-full ${className}`} style={generatedCover(certificate.title)}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div>
          <Award className="mx-auto size-8 text-white/70" />
          <p className="mt-3 font-display text-sm leading-snug font-semibold text-white/90">
            {certificate.title}
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-widest text-white/50 uppercase">
            {certificate.issuer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const [selected, setSelected] = useState(null)

  return (
    <Section id="certifications" className="relative">
      <SectionHeading
        eyebrow="06 — Certifications"
        title="Sertifikat & Pelatihan"
        description="Bukti bahwa saya terus belajar di luar bangku kuliah — klik untuk melihat detail."
        align="center"
        className="mx-auto"
      />

      {/* Kolom mengikuti jumlah sertifikat: dua kartu di grid empat kolom
          menyisakan separuh baris kosong dan terbaca seperti bug. */}
      <RevealGroup
        className={cn(
          'mt-12 grid gap-5 sm:grid-cols-2',
          certifications.length >= 4 && 'lg:grid-cols-4',
          certifications.length === 3 && 'lg:grid-cols-3',
          certifications.length <= 2 && 'mx-auto max-w-3xl',
        )}
        stagger={0.08}
      >
        {certifications.map((certificate) => (
          <RevealItem key={certificate.id}>
            <Card interactive className="group h-full overflow-hidden">
              <button
                type="button"
                onClick={() => setSelected(certificate)}
                data-cursor="view"
                aria-label={`Lihat sertifikat ${certificate.title}`}
                className="relative block aspect-4/3 w-full overflow-hidden"
              >
                <CertificatePreview
                  certificate={certificate}
                  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Hover veil */}
                <span className="absolute inset-0 grid place-items-center bg-base/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-[10px] tracking-widest text-accent uppercase">
                    <Maximize2 className="size-3" />
                    Preview
                  </span>
                </span>
              </button>

              <div className="p-5">
                <h3 className="line-clamp-2 font-display text-[15px] leading-snug font-semibold text-fg">
                  {certificate.title}
                </h3>
                <p className="mt-1.5 text-[12px] text-accent-soft">{certificate.issuer}</p>
                <p className="mt-0.5 font-mono text-[10px] text-faint">{certificate.date}</p>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ── Detail modal ─────────────────────────────────────────────── */}
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.title ?? ''}>
        {selected && (
          <div className="space-y-6">
            <div className="aspect-4/3 overflow-hidden rounded-xl border border-white/8">
              <CertificatePreview certificate={selected} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">Penerbit</p>
                <p className="mt-1 text-sm text-fg">{selected.issuer}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">Tanggal</p>
                <p className="mt-1 text-sm text-fg">{selected.date}</p>
              </div>
              {selected.credentialId && (
                <div className="sm:col-span-2">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                    Credential ID
                  </p>
                  <p className="mt-1 font-mono text-sm break-all text-fg">{selected.credentialId}</p>
                </div>
              )}
            </div>

            {selected.skills?.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                  Kompetensi
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <Tag key={skill} tone="accent">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 border-t border-white/8 pt-5">
              {selected.file ? (
                <Button href={selected.file} download icon={Download} iconPosition="left" size="sm">
                  Download Sertifikat
                </Button>
              ) : (
                <p className="font-mono text-[11px] text-faint">
                  File sertifikat belum ditautkan — tambahkan di{' '}
                  <span className="text-muted">src/data/certifications.js</span>
                </p>
              )}

              {selected.credentialUrl && (
                <Button
                  href={selected.credentialUrl}
                  variant="secondary"
                  icon={ExternalLink}
                  iconPosition="left"
                  size="sm"
                >
                  Verifikasi
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
