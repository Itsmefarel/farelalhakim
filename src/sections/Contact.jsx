import { Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import { profile } from '@/data/profile'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Reveal from '@/components/animation/Reveal'
import ContactForm from '@/components/contact/ContactForm'

/** Contact channels — entries without a value in profile.js are skipped. */
const buildChannels = () =>
  [
    profile.email && {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    profile.socials.github && {
      icon: Github,
      label: 'GitHub',
      value: profile.socials.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: profile.socials.github,
    },
    profile.socials.linkedin && {
      icon: Linkedin,
      label: 'LinkedIn',
      value: profile.socials.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: profile.socials.linkedin,
    },
    profile.phone && {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: profile.phone,
      // wa.me needs the number in international form with no separators.
      href: `https://wa.me/${profile.phone.replace(/\D/g, '')}`,
    },
  ].filter(Boolean)

export default function Contact() {
  const channels = buildChannels()

  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]" />

      <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ── Pitch + channels ───────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-accent uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
              08 — Contact
            </div>

            <h2 className="mt-4 text-headline text-gradient">Let&apos;s build something together.</h2>

            <p className="mt-5 text-base leading-relaxed text-muted">
              Sedang mencari kandidat magang atau entry level untuk peran UI/UX, frontend, atau IT
              support? Saya terbuka untuk berdiskusi — ceritakan kebutuhannya, saya balas secepatnya.
            </p>
          </Reveal>

          {/* Availability */}
          <Reveal delay={0.1} className="mt-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[13px] font-medium text-emerald-300">{profile.availability}</span>
            </div>
          </Reveal>

          {/* Channels */}
          <div className="mt-8 space-y-3">
            {channels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <Reveal key={channel.label} delay={0.06 * index}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    data-cursor="link"
                    className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-surface/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-2/50"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/8 text-accent transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-fg">{channel.value}</span>
                    </span>
                  </a>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.25} className="mt-6">
            <p className="flex items-center gap-2 font-mono text-[11px] text-faint">
              <MapPin className="size-3.5 text-accent" />
              {profile.location}
            </p>
          </Reveal>
        </div>

        {/* ── Form ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <Card className="p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-fg">Kirim pesan langsung</h3>
              <p className="mt-1.5 text-[13px] text-muted">
                Isi form di bawah — biasanya saya balas dalam 1×24 jam.
              </p>

              <div className="mt-6">
                <ContactForm />
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
