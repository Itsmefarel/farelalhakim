/**
 * PROJECTS — the most important data file on this site.
 *
 * ⚠️ Isi di bawah adalah CONTOH STRUKTUR agar Anda bisa melihat tampilannya.
 *    Ganti dengan project Anda sendiri. JANGAN publikasikan project contoh
 *    seolah-olah milik Anda.
 *
 * CARA MENAMBAH PROJECT BARU
 * ──────────────────────────
 * 1. Salin `PROJECT_TEMPLATE` di bawah file ini.
 * 2. Tempel sebagai item pertama pada array `projects`.
 * 3. Isi datanya. `slug` harus unik → jadi URL: /projects/<slug>
 * 4. Selesai. Kartu di halaman utama DAN halaman case study
 *    otomatis terbentuk. Tidak ada komponen yang perlu disentuh.
 *
 * `cover: null` aman — sistem membuat cover gradien otomatis dari slug,
 * jadi tidak akan pernah ada gambar rusak sebelum aset asli tersedia.
 */

export const projects = [
  {
    slug: 'aroma-coffee-website',
    title: 'Aroma Coffee Website',
    category: 'Frontend Development',
    year: '2026',
    role: 'Frontend Developer & UI/UX Designer',
    timeline: '1 bulan',
    team: 'Solo',
    featured: true,
    cover: '/projects/aroma-coffee/cover.jpg',
    excerpt:
      'Website coffee shop modern dengan fokus pada branding digital, pengalaman pengguna, dan tampilan visual premium. Dibangun menggunakan React, Tailwind CSS, Framer Motion, dan GSAP.',
    tech: [
      'React',
      'Tailwind CSS',
      'JavaScript',
      'Framer Motion',
      'GSAP',
      'Vite',
      'Responsive Design',
      'Vercel',
    ],
    links: { demo: 'https://aroma-coffee-one.vercel.app/', github: '', figma: '' },

    // ── Case study ────────────────────────────────────────────────────────
    overview:
      'Project ini merupakan website coffee shop modern yang dirancang untuk menghadirkan pengalaman digital yang profesional bagi sebuah brand kopi. Website berfokus pada penyajian informasi produk, storytelling brand, visual identity, serta pengalaman pengguna yang responsif di berbagai perangkat.',
    problem: [
      'Bisnis coffee shop membutuhkan kehadiran digital yang mampu merepresentasikan identitas brand dan memberikan informasi produk secara menarik kepada pelanggan.',
      'Website yang tidak memiliki struktur visual dan pengalaman pengguna yang baik dapat membuat pengguna kesulitan memahami produk serta layanan yang ditawarkan.',
    ],
    goals: [
      'Membangun website coffee shop dengan visual branding yang kuat.',
      'Membuat pengalaman pengguna yang sederhana dan responsif.',
      'Menampilkan informasi produk secara terstruktur dan mudah dipahami.',
    ],
    research: [
      'Menganalisis referensi website coffee shop modern.',
      'Menentukan struktur halaman berdasarkan kebutuhan pengguna.',
      'Menyesuaikan desain dengan karakter brand dan pengalaman pengguna.',
    ],
    process: [
      {
        title: 'Brand & UI Planning',
        description:
          'Menganalisis kebutuhan visual brand, menentukan struktur halaman, menyusun user flow, serta membuat rancangan tampilan yang sesuai dengan karakter coffee shop modern.',
      },
      {
        title: 'Frontend Development',
        description:
          'Mengimplementasikan desain menjadi website interaktif menggunakan React, Tailwind CSS, Framer Motion, dan GSAP dengan pendekatan komponen yang terstruktur.',
      },
      {
        title: 'Responsive Optimization',
        description:
          'Mengoptimalkan tampilan website agar dapat digunakan dengan baik pada berbagai ukuran layar mulai dari desktop hingga perangkat mobile.',
      },
      {
        title: 'Deployment',
        description:
          'Melakukan deployment website menggunakan Vercel serta memastikan website dapat diakses secara optimal melalui browser.',
      },
    ],
    solution: [
      'Mengembangkan website menggunakan React dengan pendekatan component-based.',
      'Menggunakan Tailwind CSS untuk membangun sistem desain yang konsisten.',
      'Menambahkan animasi interaktif menggunakan Framer Motion dan GSAP.',
      'Mengoptimalkan tampilan agar responsif pada berbagai perangkat.',
    ],
    results: [
      {
        value: 'React',
        label: 'Frontend Framework',
        detail: 'Mengembangkan website menggunakan arsitektur component-based.',
      },
      {
        value: 'Responsive',
        label: 'Multi Device',
        detail: 'Website dapat digunakan pada berbagai ukuran layar.',
      },
      {
        value: 'Modern UI',
        label: 'Design Approach',
        detail: 'Menggabungkan visual branding, animasi, dan pengalaman pengguna.',
      },
    ],
    learned:
      'Melalui project ini, saya mempelajari proses membangun website modern mulai dari perancangan UI hingga implementasi frontend. Project ini meningkatkan kemampuan saya dalam React, Tailwind CSS, responsive design, animasi web, optimasi performa, dan deployment aplikasi berbasis web.',
    gallery: [
      {
        src: '/projects/aroma-coffee/home.jpg',
        caption: 'Homepage dengan visual branding coffee shop, navigasi utama, dan struktur informasi produk.',
      },
      {
        src: '/projects/aroma-coffee/menu.jpg',
        caption:
          'Menu section untuk menampilkan pilihan produk kopi dengan tampilan yang mudah dipahami pengguna.',
      },
      {
        src: '/projects/aroma-coffee/story.jpg',
        caption:
          'Coffee story section untuk membangun identitas brand melalui storytelling dan informasi produk.',
      },
      {
        src: '/projects/aroma-coffee/gallery.jpg',
        caption: 'Gallery section yang menampilkan suasana visual dan pengalaman brand coffee shop.',
      },
      {
        src: '/projects/aroma-coffee/contact.jpg',
        caption: 'Contact section dengan informasi komunikasi dan detail layanan.',
      },
      {
        src: '/projects/aroma-coffee/mobile.jpg',
        caption: 'Responsive design yang dioptimalkan untuk pengalaman pengguna pada perangkat mobile.',
      },
    ],
  },

  {
    slug: 'my-asrama-telu',
    title: 'MY Asrama TEL-U',
    category: 'UI/UX Design',
    year: '2024',
    role: 'Lead Designer & UI/UX Designer',
    timeline: '1 semester',
    team: '4 desainer (saya sebagai lead)',
    featured: true,
    // Board Figma penuh, sudah dikomposisikan ke kanvas 16:9 agar cocok
    // dengan bingkai cover tanpa ada bagian yang terpotong.
    cover: '/projects/my-asrama-telu/cover.jpg',
    excerpt:
      'Aplikasi pendamping penghuni asrama Telkom University — absensi, pembayaran, aduan, dan kebutuhan harian dalam satu tempat.',
    tech: [
      'Figma',
      'Prototyping',
      'Design System',
      'User Flow',
      'Wireframing',
      'Auto Layout',
      'Component Variants',
    ],
    links: {
      demo: '',
      github: '',
      // ⚠️ Pastikan file Figma disetel "Anyone with the link → can view",
      // kalau tidak recruiter akan mendapat halaman minta akses.
      figma:
        'https://www.figma.com/design/K5XKxLI9dr0SwXW7o66yYF/UI-UX-MY-Asrama-TEL-U?node-id=0-1',
    },

    overview: [
      'Penghuni asrama Telkom University mengurus banyak hal yang sebenarnya rutin, tetapi tersebar: jadwal dan peraturan asrama diumumkan di kanal yang berbeda-beda, absensi dilakukan manual, pembayaran tidak meninggalkan jejak yang mudah dicek ulang, dan keluhan kerusakan kamar disampaikan lisan tanpa kejelasan tindak lanjut.',
      'MY Asrama TEL-U adalah prototype aplikasi mobile yang menyatukan kebutuhan itu ke dalam satu aplikasi: satu tempat untuk tahu jadwal, melakukan absensi, membayar, melapor, dan memesan kebutuhan harian. Proyek ini saya kerjakan bersama tiga rekan sebagai tugas mata kuliah Interaksi Manusia dan Komputer, dengan saya sebagai lead desain yang memegang arah visual dan konsistensi antar layar.',
      'Proyek ini berjalan selama saya mengikuti program Pertukaran Mahasiswa Merdeka di Telkom University.',
    ],
    problem: [
      'Informasi jadwal, peraturan, dan pengumuman asrama tersebar di banyak kanal sehingga mudah terlewat.',
      'Absensi penghuni masih manual dan menimbulkan antrean di jam-jam tertentu.',
      'Status pembayaran sulit dipastikan karena bukti transaksi tidak tersimpan rapi di satu tempat.',
      'Keluhan kerusakan atau kendala fasilitas disampaikan lisan, tanpa nomor laporan maupun kejelasan sudah ditangani atau belum.',
      'Kebutuhan harian penghuni dibeli terpisah di luar, padahal permintaannya berulang setiap bulan.',
    ],
    goals: [
      'Menyatukan seluruh urusan harian penghuni asrama dalam satu aplikasi.',
      'Membuat status yang paling sering ditanyakan — absensi, pembayaran, dan aduan — selalu terlihat tanpa perlu bertanya ke pengurus.',
      'Menjaga tugas yang paling sering dipakai tetap dekat: cukup beberapa ketukan dari halaman utama.',
      'Membangun bahasa visual yang selaras dengan identitas Telkom University dan tetap konsisten walau dikerjakan empat orang.',
    ],
    research: [
      'Mengumpulkan keluhan penghuni asrama lewat obrolan langsung selama tinggal di lingkungan kampus, bukan lewat asumsi.',
      'Mencatat tugas mana yang berulang setiap bulan dan mana yang hanya sesekali, untuk menentukan apa yang layak berada di halaman utama.',
      'Menelusuri alur layanan asrama yang berjalan saat itu untuk menemukan langkah yang paling sering membuat orang berhenti atau bertanya ulang.',
      'Meninjau pola antarmuka aplikasi kampus dan hunian lain sebagai pembanding, terutama untuk pola absensi dan pembayaran.',
    ],
    process: [
      {
        title: 'Riset & pemetaan kebutuhan',
        description: 'Mengubah keluhan lapangan menjadi daftar kebutuhan yang bisa diprioritaskan.',
      },
      {
        title: 'Information architecture',
        description:
          'Menyusun delapan modul fitur dan menentukan mana yang naik ke halaman utama, mana yang masuk sidebar.',
      },
      {
        title: 'User flow',
        description:
          'Memecah tugas panjang seperti pembayaran dan pengaduan menjadi tahap yang jelas ujung pangkalnya.',
      },
      {
        title: 'Wireframe',
        description: 'Rangka layar low-fidelity untuk menguji urutan layar sebelum masuk ke visual.',
      },
      {
        title: 'Design system',
        description:
          'Menetapkan palet warna, komponen, dan state overlay lebih dulu supaya empat orang menghasilkan layar yang terasa satu produk.',
      },
      {
        title: 'UI & prototype',
        description: 'Desain akhir dan prototype interaktif di Figma, lengkap dengan alur antar layar.',
      },
    ],
    solution: [
      'Home & Sidebar — ringkasan singkat kondisi penghuni hari itu, dengan navigasi ke seluruh modul lewat sidebar.',
      'QR Barcode — absensi penghuni lewat pemindaian kode, menggantikan pencatatan manual dan antrean.',
      'Kalender & Timeline — jadwal kegiatan asrama dan jatuh tempo pembayaran di satu tampilan, ditambah linimasa pengumuman.',
      'My Asrama — peraturan asrama dan daftar fasilitas yang bisa digunakan penghuni, tertulis dan bisa dibuka kapan saja.',
      'Payment — pembayaran asrama secara online, riwayat transaksi, dan bukti bayar yang tersimpan di aplikasi.',
      'Complaint Hub — kanal pengaduan kendala kamar atau fasilitas, dengan status laporan yang bisa diikuti penghuni.',
      'Help Center — kumpulan pertanyaan yang paling sering diajukan, agar pertanyaan berulang terjawab sebelum ditanyakan.',
      'Dorm Store — etalase kebutuhan harian penghuni yang bisa dipesan langsung dari aplikasi.',
      'Ditambah User Profile untuk data penghuni dan pengaturan akun.',
    ],
    results: [
      {
        value: '8 Modul',
        label: 'Cakupan fitur',
        detail: 'Dari absensi QR sampai Dorm Store, seluruhnya dirancang dalam satu sistem.',
      },
      {
        value: 'Design System',
        label: 'Komponen dipakai ulang',
        detail: 'Palet warna, komponen, dan state (kosong, berhasil, gagal) konsisten di seluruh layar.',
      },
      {
        value: 'Prototype',
        label: 'Alur utama bisa dijalankan',
        detail: 'Dapat dijalankan penuh di Figma, termasuk perpindahan antar modul.',
      },
    ],
    learned:
      'Sebagai lead desain untuk tim berisi empat orang, menyepakati design system di awal jauh lebih murah daripada merapikan konsistensi di akhir. Begitu palet, komponen, dan state disepakati, empat orang bisa menggambar layar yang berbeda-beda dan hasilnya tetap terbaca sebagai satu produk.',
    gallery: [
      {
        src: '/projects/my-asrama-telu/home.jpg',
        caption: 'Halaman utama dengan pintasan ke delapan modul, profil penghuni, dan pengaturan akun.',
      },
      {
        src: '/projects/my-asrama-telu/barcode-absensi.jpg',
        caption: 'Absensi lewat pemindaian QR, dari layar pengantar sampai kode berhasil terbaca.',
      },
      {
        src: '/projects/my-asrama-telu/payment.jpg',
        caption:
          'Alur pembayaran: pilih metode, isi ulang kredit, daftar tagihan, hingga konfirmasi pembayaran.',
      },
      {
        src: '/projects/my-asrama-telu/complaint-hub.jpg',
        caption: 'Complaint Hub: formulir laporan, proses verifikasi, dan lampiran bukti kerusakan.',
      },
      {
        src: '/projects/my-asrama-telu/dorm-store.jpg',
        caption: 'Dorm Store: etalase kategori, daftar produk, keranjang, dan checkout pesanan.',
      },
      {
        src: '/projects/my-asrama-telu/design-system.jpg',
        caption: 'Skala warna Primary–Error dan kumpulan state overlay yang dipakai seluruh tim.',
      },
    ],
  },

  {
    slug: 'portfolio-website',
    title: 'Interactive Portfolio Website',
    category: 'Frontend Development',
    year: '2026',
    role: 'UI/UX Designer & Frontend Developer',
    timeline: '—',
    team: 'Solo',
    featured: true,
    cover: '/projects/portfolio-website/cover.jpg',
    excerpt:
      'Website portfolio yang Anda buka sekarang — satu halaman utama berisi sembilan section, ditambah halaman case study dan artikel yang berdiri sendiri.',
    tech: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'GSAP ScrollTrigger',
      'Lenis',
      'React Router',
      'Lucide React',
    ],
    links: {
      demo: '',
      github: 'https://github.com/Itsmefarel/farelalhakim',
      figma: '',
    },

    overview: [
      'Website portfolio yang Anda buka sekarang, dibangun dari nol. Halaman utamanya memuat sembilan section — dari hero sampai kontak — sementara case study project dan artikel blog mendapat halaman sendiri agar tautannya bisa dikirim terpisah ke recruiter.',
      'Seluruh konten dipisahkan ke lapisan data tersendiri. Memperbarui pengalaman kerja, project, sertifikat, atau artikel cukup dilakukan di satu berkas, tanpa menyentuh komponen antarmuka sama sekali.',
      'Animasinya dibangun berlapis: Framer Motion untuk transisi halaman dan scroll reveal, GSAP ScrollTrigger untuk timeline pengalaman yang menggambar dirinya sendiri mengikuti scroll, dan Lenis untuk smooth scrolling yang disinkronkan dengan keduanya.',
    ],
    problem: [
      'CV satu halaman tidak menunjukkan cara seseorang berpikir dan menyelesaikan masalah.',
      'Template portfolio siap pakai membuat semua kandidat terlihat seragam.',
      'Portfolio dengan banyak animasi sering terasa berat dan sulit dibuka di perangkat seadanya.',
    ],
    goals: [
      'Menyampaikan identitas profesional dalam sepuluh detik pertama.',
      'Memberi setiap project halaman case study sendiri yang bisa dikirim terpisah.',
      'Menjaga performa dan keterbacaan meski animasi dipakai di hampir setiap section.',
    ],
    research: [
      'Mempelajari pola portfolio developer dan designer yang tampil di Awwwards.',
      'Mencatat urutan informasi yang membuat recruiter cepat menemukan hal penting.',
      'Menguji keterbacaan di layar kecil lebih dulu sebelum menambahkan efek visual.',
    ],
    process: [
      {
        title: 'Design system',
        description:
          'Menetapkan token warna, tipografi, dan motion di satu berkas CSS sebelum komponen pertama ditulis.',
      },
      {
        title: 'Arsitektur data',
        description:
          'Memisahkan seluruh konten ke folder data agar antarmuka dan isi bisa berkembang sendiri-sendiri.',
      },
      {
        title: 'Komponen & section',
        description: 'Membangun komponen kecil yang dipakai ulang di seluruh halaman dan case study.',
      },
      {
        title: 'Motion & interaksi',
        description:
          'Menyusun preloader, custom cursor, page transition, scroll reveal, dan timeline berbasis scroll.',
      },
      {
        title: 'Optimasi & aksesibilitas',
        description:
          'Memecah bundle, melazy-load halaman detail, menghormati reduced motion, dan menambahkan focus trap pada modal.',
      },
    ],
    solution: [
      'Satu halaman utama berisi sembilan section, dengan case study dan artikel yang punya URL sendiri.',
      'Lapisan data terpisah: menambah satu project cukup satu objek, sisanya terbentuk otomatis.',
      'Design system berbasis token sehingga satu perubahan warna berlaku di seluruh situs.',
      'Fallback gambar yang menampilkan placeholder gradien, bukan ikon gambar rusak, saat berkas belum tersedia.',
    ],
    results: [
      {
        value: '9 Section',
        label: 'Satu halaman utama',
        detail: 'Ditambah halaman case study dan artikel yang berdiri sendiri.',
      },
      {
        value: '1 Objek',
        label: 'Menambah project baru',
        detail: 'Kartu, filter kategori, case study, dan navigasi prev/next terbentuk otomatis.',
      },
      {
        value: 'Reduced Motion',
        label: 'Dihormati penuh',
        detail: 'Seluruh animasi mengikuti preferensi sistem; modal punya focus trap dan skip link tersedia.',
      },
    ],
    learned:
      'Membangun design system lebih dulu terasa lambat di awal, tetapi setiap section berikutnya jadi jauh lebih cepat dan hasil akhirnya terbaca sebagai satu produk. Pelajaran kedua: animasi justru terasa mahal ketika jumlahnya sedikit tapi tepat sasaran — bukan ketika ada di mana-mana.',
    gallery: [
      {
        src: '/projects/portfolio-website/hero.jpg',
        caption: 'Hero dengan typing animation, partikel interaktif, dan kartu identitas yang mengikuti kursor.',
      },
      {
        src: '/projects/portfolio-website/experience.jpg',
        caption: 'Timeline pengalaman yang garisnya menggambar sendiri mengikuti scroll menggunakan GSAP.',
      },
      {
        src: '/projects/portfolio-website/skills.jpg',
        caption: 'Skills ditampilkan sebagai dashboard dengan radial chart dan progress bar beranimasi.',
      },
      {
        src: '/projects/portfolio-website/projects.jpg',
        caption: 'Selected Work dengan filter kategori beranimasi dan kartu project yang dapat dipakai ulang.',
      },
      {
        src: '/projects/portfolio-website/case-study.jpg',
        caption: 'Halaman case study dengan sidebar navigasi section dan penomoran yang konsisten.',
      },
      {
        src: '/projects/portfolio-website/mobile.jpg',
        caption: 'Tampilan mobile dengan menu overlay dan tata letak yang mengikuti komponen yang sama.',
      },
    ],
  },
]

/* ────────────────────────────────────────────────────────────────────────────
   SALIN BLOK INI UNTUK MENAMBAH PROJECT BARU
   ──────────────────────────────────────────────────────────────────────────── */
export const PROJECT_TEMPLATE = {
  slug: 'nama-project-anda', // wajib unik → /projects/nama-project-anda
  title: 'Judul Project',
  category: 'Web Application', // Web Application | UI/UX Design | Frontend Development | Mobile App
  year: '2026',
  role: 'Peran Anda',
  timeline: '3 bulan',
  team: 'Solo',
  featured: false, // true = tampil lebih dulu di halaman utama
  cover: null, // null = cover gradien otomatis, atau '/projects/nama.jpg'
  excerpt: 'Satu kalimat yang menjelaskan project ini.',
  tech: ['React', 'Tailwind CSS'],
  links: { demo: '', github: '', figma: '' },
  // String untuk satu paragraf, atau array untuk beberapa paragraf.
  overview: 'Latar belakang project.',
  problem: ['Masalah 1', 'Masalah 2'],
  goals: ['Tujuan 1', 'Tujuan 2'],
  research: ['Temuan riset 1', 'Temuan riset 2'],
  process: [{ title: 'Tahap', description: 'Yang dikerjakan pada tahap ini.' }],
  solution: ['Solusi yang dibangun.'],
  results: [{ label: 'Metrik', value: 'Hasil', detail: 'Konteks singkat' }],
  learned: 'Pelajaran yang Anda ambil dari project ini.',
  // Galeri screenshot. Dua bentuk diterima:
  //   ['/projects/nama-1.jpg']                                → tanpa caption
  //   [{ src: '/projects/nama-1.jpg', caption: 'Keterangan' }] → dengan caption
  // Selama file gambar belum ada, tiap slot menampilkan placeholder gradien
  // dengan caption-nya — tidak akan pernah muncul gambar rusak.
  gallery: [],
}

/* ── Helpers (dipakai komponen, tidak perlu diubah) ───────────────────────── */

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug)

export const getAdjacentProjects = (slug) => {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  }
}

export const projectCategories = ['All', ...new Set(projects.map((project) => project.category))]
