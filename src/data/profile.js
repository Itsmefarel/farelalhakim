/**
 * PROFILE — single source of truth for personal identity.
 *
 * ⚠️ EDIT THIS FIRST. Every section (hero, about, contact, footer, SEO)
 * reads from here, so changing a value once updates the whole site.
 */

export const profile = {
  firstName: 'Farel',
  fullName: 'Farel Al Hakim',
  // Monogram untuk navbar, preloader, dan hero. Dua huruf tetap terbaca
  // pada badge kecil; tiga huruf mulai berdesakan.
  initials: 'FA',

  headline: 'Fresh Graduate Information Technology',

  // Foto profil. Simpan file Anda tepat di `public/images/profile.jpg`.
  // Kalau file belum ada atau gagal dimuat, hero otomatis menampilkan
  // monogram — jadi tidak akan pernah muncul gambar rusak.
  photo: '/images/profile.jpg',

  // Rotating job titles used by the hero typing animation
  roles: [
    'Data Management Specialist',
    'Digital Administration',
    'System Operations',
    'Halal Certification Support',
    'UI/UX Designer',
  ],

  location: 'Lampung, Indonesia',
  availability: 'Open for Internship & Entry Level',

  // Short pitch — hero subtitle
  tagline:
    'Saya mengelola data dan sistem digital agar akurat, tertelusur, dan siap dipakai — sekaligus merancang antarmuka yang membuatnya mudah dijalankan sehari-hari.',

  // Long form — about section
  intro: [
    'Saya Fresh Graduate Teknik Informatika dari Institut Informatika dan Bisnis Darmajaya dengan IPK 3.61, dengan fokus pada pengelolaan data, administrasi digital, dan operasional sistem informasi.',
    'Pengalaman profesional saya berpusat pada data dan kepatuhan: mengelola serta memvalidasi lebih dari 3.000 data pelaku usaha pada sistem SiHalal BPJPH, memverifikasi dokumen legalitas dan kesesuaian bahan baku sesuai standar sertifikasi halal, hingga mengelola data satuan pendidikan agar akurat dan sinkron dengan sistem pusat.',
    'Latar belakang Teknik Informatika membuat saya tidak berhenti di penginputan data. Saya terbiasa menelusuri dari mana kesalahan berasal, merapikan alur kerjanya, lalu merancang antarmuka yang membuat kesalahan yang sama lebih sulit terulang — pendekatan yang saya pakai saat merancang MY Asrama TEL-U di Figma.',
  ],

  // Contact + social. Empty string = the link is hidden automatically.
  email: 'farelalhakim12@gmail.com',
  phone: '+62 823-8225-0786',
  socials: {
    github: 'https://github.com/Itsmefarel',
    linkedin: 'https://www.linkedin.com/in/farel-al-hakim',
    instagram: '',
    dribbble: '',
  },

  // Letakkan file CV di folder /public dengan nama ini
  resumeUrl: '/cv/CV-Farel-Al-Hakim.pdf',

  /**
   * Endpoint form kontak (opsional).
   * Kosong  → form membuka aplikasi email dengan pesan yang sudah terisi.
   * Diisi   → form dikirim lewat POST (mis. Formspree: https://formspree.io/f/xxxx
   *           atau Web3Forms). Cocok untuk hosting statis seperti Vercel.
   */
  formEndpoint: '',

  // Achievement cards in the About section.
  // `decimals` controls formatting, `raw` prints the number unformatted (years).
  stats: [
    { value: 3.61, decimals: 2, suffix: '', label: 'IPK Kelulusan', caption: 'Skala 4.00', icon: 'award' },
    {
      value: 3,
      suffix: '+',
      label: 'Peran Profesional',
      caption: 'Data · Compliance · Sistem',
      icon: 'layers',
    },
    {
      value: 3,
      suffix: '.000+',
      label: 'Data Pelaku Usaha',
      caption: 'Dikelola melalui SiHalal BPJPH',
      icon: 'line-chart',
    },
    {
      value: 2025,
      raw: true,
      label: 'Fresh Graduate',
      caption: 'S1 Teknik Informatika',
      icon: 'graduation-cap',
    },
  ],
}

/** SEO defaults used by the <Seo /> component on every route. */
export const siteMeta = {
  siteName: `${profile.fullName} — Portfolio`,
  // TODO: ganti dengan domain Vercel Anda yang sebenarnya setelah deploy,
  // lalu samakan juga di index.html, public/robots.txt, dan public/sitemap.xml.
  url: 'https://farelalhakim.vercel.app',
  defaultTitle: `${profile.fullName} — Data Management & Digital Administration`,
  defaultDescription:
    'Portfolio Farel Al Hakim — Fresh Graduate Teknik Informatika Institut Informatika dan Bisnis Darmajaya (IPK 3.61). Data Management, Halal Certification Support, Digital Administration, dan System Operations.',
}
