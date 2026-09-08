# Portfolio Website — Modern Interactive Tech Portfolio

Website portfolio pribadi untuk melamar magang dan posisi entry level di
perusahaan teknologi. Dibangun sebagai *personal branding website*, bukan CV
online biasa.

**Stack:** React 18 · Vite 6 · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger ·
Lenis · Lucide React · React Router 6

---

## Menjalankan project

```bash
npm install
```

```bash
npm run dev
```

Buka <http://localhost:5173>.

| Perintah          | Fungsi                                        |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Menjalankan development server (hot reload)   |
| `npm run build`   | Membuat build produksi ke folder `dist/`      |
| `npm run preview` | Menguji hasil build secara lokal              |

---

## ⚡ 6 hal yang HARUS dilengkapi sebelum dipublikasikan

Semua konten dipisahkan dari komponen. Anda hampir tidak perlu menyentuh file
UI — cukup edit file di `src/data/` dan menaruh berkas di `public/`.

1. **`public/images/profile.jpg`** — simpan foto formal Anda di sini dengan
   nama persis itu. Kode sudah menunjuk ke path tersebut; selama file belum
   ada, hero menampilkan monogram "FA" sebagai pengganti.
2. **`public/cv/CV-Farel-Al-Hakim.pdf`** — letakkan file CV Anda di sini.
3. **`src/data/profile.js`** — username GitHub & LinkedIn masih berupa URL
   dasar tanpa username. Nomor telepon juga masih kosong (opsional).
4. **`src/data/experience.js`** — poin `highlights` ditulis sebagai titik awal
   berdasarkan judul posisi. **Sesuaikan dengan tugas nyata Anda** — recruiter
   sering menanyakan detailnya saat interview.
5. **`src/data/projects.js`** — berisi 3 project **contoh**. Ganti dengan
   project Anda sendiri.
6. **`src/data/certifications.js`** — berisi sertifikat **contoh**. Ganti
   dengan sertifikat asli.

Selain itu: ganti domain `farelalhakim.vercel.app` di `index.html`,
`src/data/profile.js` (`siteMeta.url`), `public/robots.txt`, dan
`public/sitemap.xml` setelah domain Vercel Anda jadi.

---

## Struktur project

```
src/
├── data/                    ← SEMUA KONTEN ADA DI SINI
│   ├── profile.js           Identitas, kontak, statistik, SEO
│   ├── navigation.js        Menu navbar + target scroll-spy
│   ├── experience.js        Pengalaman kerja + pendidikan
│   ├── skills.js            Skill, focus area, toolbelt, alur kerja
│   ├── projects.js          Project + isi lengkap case study
│   ├── certifications.js    Galeri sertifikat
│   └── posts.js             Artikel blog
│
├── components/
│   ├── layout/              Navbar, Footer, PageTransition
│   ├── ui/                  Button, Card, Section, Modal, RadialStat, SocialLinks
│   ├── animation/           Reveal, TypingText, CountUp, Marquee, Magnetic
│   ├── effects/             CustomCursor, ParticleField, Preloader, ScrollProgress, Aurora
│   ├── hero/                HeroVisual
│   ├── project/             ProjectCard
│   ├── contact/             ContactForm
│   └── seo/                 Seo
│
├── sections/                Hero, About, Experience, Skills, Projects,
│                            Certifications, Blog, Contact
│
├── pages/                   Home, ProjectDetail, BlogPost, NotFound
│
├── hooks/                   useSmoothScroll, useScrollSpy, useMediaQuery, useAppReady
├── lib/                     utils.js (helper), motion.js (preset animasi)
├── index.css                DESIGN SYSTEM — token warna, tipografi, motion
├── App.jsx                  Routing, provider, efek global
└── main.jsx                 Entry point
```

### Kenapa Home berupa satu halaman panjang?

Recruiter memindai, bukan menjelajah. Delapan section digabung dalam satu
scroll agar seluruh cerita bisa dibaca tanpa satu klik pun. Yang butuh
kedalaman — case study project dan artikel blog — mendapat halaman sendiri
(`/projects/:slug`, `/blog/:slug`) sehingga tautannya bisa dikirim terpisah ke
recruiter.

---

## Cara menambah konten

### Menambah project baru

1. Buka `src/data/projects.js`.
2. Salin `PROJECT_TEMPLATE` di bagian bawah file.
3. Tempel sebagai item **pertama** pada array `projects`.
4. Isi datanya. `slug` harus unik → menjadi URL `/projects/<slug>`.

Selesai. Kartu di halaman utama, filter kategori, halaman case study, dan
navigasi prev/next terbentuk otomatis. **Tidak ada komponen yang perlu diubah.**

Belum punya screenshot? Biarkan `cover: null` — sistem membuat cover gradien
otomatis dari slug, jadi tidak akan pernah muncul gambar rusak.

### Menambah artikel blog

Tambahkan satu objek di array `posts` pada `src/data/posts.js`. Isi `content`
memakai blok: `heading`, `paragraph`, `list`, `quote`, `code`.

Konten disimpan sebagai blok terstruktur, bukan markdown mentah — tidak butuh
library parser dan tidak ada `dangerouslySetInnerHTML`, jadi konten tidak bisa
menyisipkan markup ke halaman.

### Menambah section baru di halaman utama

1. Buat komponen di `src/sections/`, bungkus dengan `<Section id="nama">`.
2. Tambahkan `{ id: 'nama', label: 'Label' }` di `src/data/navigation.js`.
3. Render komponennya di `src/pages/Home.jsx`.

Navbar, scroll-spy, dan link footer mengikuti otomatis.

---

## Design system

Semua token ada di blok `@theme` pada `src/index.css`. Ubah satu nilai di sana
dan seluruh website ikut berubah — **jangan pernah menulis kode warna langsung
di komponen.**

| Token             | Nilai     | Dipakai untuk        |
| ----------------- | --------- | -------------------- |
| `--color-base`    | `#050816` | Latar halaman        |
| `--color-surface` | `#0A1020` | Kartu                |
| `--color-primary` | `#2563EB` | Aksi utama           |
| `--color-accent`  | `#38BDF8` | Sorotan, ikon, garis |
| `--color-fg`      | `#FFFFFF` | Teks utama           |
| `--color-muted`   | `#94A3B8` | Teks sekunder        |

Tipografi: **Sora** (judul) · **Inter** (isi) · **JetBrains Mono** (label teknis).

---

## Fitur

- **Smooth scrolling** (Lenis) yang disinkronkan dengan GSAP ScrollTrigger
- **Loading animation** dengan penghitung progres, tampil sekali per sesi
- **Custom cursor** dua lapis yang bereaksi pada elemen interaktif
- **Page transition** antar halaman via `AnimatePresence`
- **Scroll reveal** di seluruh section
- **Timeline pengalaman** yang menggambar dirinya sendiri mengikuti scroll (GSAP)
- **Skills dashboard** dengan progress bar dan radial chart beranimasi
- **Filter project** dengan animasi layout
- **Galeri sertifikat** dengan modal yang dapat diakses keyboard
- **Form kontak** dengan validasi (lihat di bawah)
- **Responsive mobile-first** + menu overlay
- **SEO**: meta per halaman, Open Graph, Twitter Card, JSON-LD, sitemap, robots

### Aksesibilitas

- Seluruh animasi menghormati `prefers-reduced-motion`
- Modal memiliki focus trap, tutup dengan `Escape`, dan mengembalikan fokus
- Ada skip link ke konten utama
- Custom cursor hanya aktif di perangkat berpenunjuk (tidak di layar sentuh)
- Angka pada counter selalu berakhir di nilai yang benar, bahkan jika browser
  menjeda animasi karena tab tidak aktif

---

## Form kontak

Secara default (`profile.formEndpoint` kosong), form membuka aplikasi email
pengunjung dengan pesan yang sudah terisi. Ini bekerja di hosting statis mana
pun tanpa backend.

Ingin pesan masuk langsung ke email tanpa membuka aplikasi email? Daftar di
[Formspree](https://formspree.io) atau [Web3Forms](https://web3forms.com), lalu
isi endpoint-nya di `src/data/profile.js`:

```js
formEndpoint: 'https://formspree.io/f/xxxxxxx',
```

---

## Deploy ke Vercel

1. Push project ini ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) → import repository.
3. Vercel mendeteksi Vite otomatis (`build`: `npm run build`, output: `dist`).
4. Klik **Deploy**.

`vercel.json` sudah menyertakan *SPA fallback*. Tanpa itu, me-refresh halaman
seperti `/projects/my-asrama-telu` akan menghasilkan 404.

---

## Catatan performa

Bundle dipecah menjadi beberapa chunk (`react`, `motion`, `gsap`, dan kode
halaman). Halaman case study dan blog dimuat *lazy* — pengunjung yang hanya
membaca halaman utama tidak ikut mengunduhnya.

Canvas partikel di hero berhenti sendiri saat keluar dari layar atau saat tab
tidak aktif, dan tidak dirender sama sekali untuk pengguna reduced-motion.
