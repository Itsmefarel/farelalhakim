import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

/** Minimal client-side validation — enough to catch honest mistakes. */
const validate = (values) => {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Nama wajib diisi.'
  if (!values.email.trim()) errors.email = 'Email wajib diisi.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = 'Format email belum benar.'
  if (!values.message.trim()) errors.message = 'Pesan wajib diisi.'
  else if (values.message.trim().length < 12) errors.message = 'Ceritakan sedikit lebih detail (min. 12 karakter).'
  return errors
}

/**
 * Contact form.
 *
 * Two delivery modes, chosen by `profile.formEndpoint`:
 *  · endpoint set  → POST as JSON (Formspree / Web3Forms / your own function)
 *  · endpoint empty → opens the visitor's mail client with the message
 *    pre-filled, so the form still works on a purely static deploy.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear the error as soon as the visitor starts fixing it.
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')

    try {
      if (profile.formEndpoint) {
        const response = await fetch(profile.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      } else {
        // Static fallback: hand the message to the visitor's mail client.
        const subject = encodeURIComponent(values.subject || `Pesan dari ${values.name}`)
        const body = encodeURIComponent(
          `Nama: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
        )
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      }

      setStatus('success')
      setValues(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (name) =>
    cn(
      'w-full rounded-xl border bg-surface/50 px-4 py-3 text-sm text-fg placeholder:text-faint',
      'transition-colors duration-300 outline-none',
      errors[name]
        ? 'border-red-400/50 focus:border-red-400'
        : 'border-white/10 focus:border-accent/60 focus:bg-surface-2/50',
    )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nama" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder="Nama Anda"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={fieldClass('name')}
          />
        </Field>

        <Field label="Email" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="nama@perusahaan.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={fieldClass('email')}
          />
        </Field>
      </div>

      <Field label="Subjek" name="subject" optional>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          placeholder="Peluang magang, kolaborasi, atau pertanyaan"
          className={fieldClass('subject')}
        />
      </Field>

      <Field label="Pesan" name="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Ceritakan sedikit tentang peran atau project-nya…"
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldClass('message'), 'resize-y')}
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'sending'}
        data-cursor="link"
        className={cn(
          'group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6',
          'text-sm font-medium text-white shadow-[0_10px_40px_-12px_rgba(37,99,235,0.9)]',
          'transition-all duration-300 hover:bg-primary-deep disabled:opacity-60',
        )}
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Mengirim…
          </>
        ) : (
          <>
            Kirim Pesan
            <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {/* Result banner */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <Banner key="success" tone="success" icon={CheckCircle2}>
            {profile.formEndpoint
              ? 'Terima kasih! Pesan Anda sudah terkirim. Saya akan membalas secepatnya.'
              : 'Aplikasi email Anda terbuka dengan pesan yang sudah terisi — tinggal tekan kirim.'}
          </Banner>
        )}

        {status === 'error' && (
          <Banner key="error" tone="error" icon={AlertCircle}>
            Pengiriman gagal. Silakan kirim langsung ke{' '}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
              {profile.email}
            </a>
            .
          </Banner>
        )}
      </AnimatePresence>
    </form>
  )
}

function Field({ label, name, error, optional = false, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 flex items-center gap-2 text-[13px] font-medium text-muted">
        {label}
        {optional && <span className="font-mono text-[10px] text-faint">opsional</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

function Banner({ tone, icon: Icon, children }) {
  const tones = {
    success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    error: 'border-red-400/30 bg-red-400/10 text-red-300',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      role="status"
      className={cn('flex items-start gap-3 rounded-xl border px-4 py-3 text-[13px]', tones[tone])}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <p>{children}</p>
    </motion.div>
  )
}
