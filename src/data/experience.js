/**
 * EXPERIENCE — rendered as the interactive vertical timeline.
 *
 * Urutan array = urutan tampil (terbaru di atas).
 */

export const experiences = [
  {
    id: 'operator-skb-way-kanan',
    role: 'Operator Sekolah',
    company: 'UPT SKB Way Kanan',
    type: 'Full Time',
    location: 'Way Kanan, Lampung',
    start: 'April 2026',
    end: 'Agustus 2026',
    period: 'April 2026 — Agustus 2026',
    icon: 'database',
    summary:
      'Mengelola data dan sistem informasi satuan pendidikan, memastikan data peserta didik dan lembaga akurat serta sinkron dengan sistem pusat.',
    highlights: [
      'Mengelola input dan pemutakhiran data peserta didik, tenaga pendidik, dan sarana pada sistem informasi sekolah.',
      'Melakukan verifikasi dan validasi data untuk menjaga akurasi sebelum sinkronisasi ke sistem pusat.',
      'Menyusun laporan administratif dan dokumen operasional menggunakan Microsoft Office.',
      'Menjadi titik bantuan teknis pertama bagi staf untuk kendala perangkat dan aplikasi harian.',
    ],
    stack: ['Data Entry', 'System Management', 'Microsoft Office', 'IT Support'],
  },
  {
    id: 'pph-lp3h',
    role: 'Pendamping Proses Produk Halal (PPH)',
    company: 'LP3H Edukasi Halal Indonesia',
    type: 'Contract',
    location: 'Bandar Lampung, Indonesia',
    start: 'Agustus 2025',
    end: 'April 2026',
    period: 'Agustus 2025 — April 2026',
    icon: 'shield-check',
    summary:
      'Mendampingi pelaku usaha mikro dan kecil melewati proses sertifikasi halal, dari edukasi awal hingga pengajuan resmi melalui SiHalal BPJPH. Menjadi penghubung antara pelaku usaha dan lembaga sertifikasi, sehingga persyaratan regulasi yang semula terasa rumit dapat dipenuhi secara mandiri.',
    highlights: [
      'Memberikan edukasi dan pendampingan sertifikasi halal kepada pelaku UMK, menerjemahkan persyaratan regulasi menjadi langkah yang mudah diikuti.',
      'Memandu pelaku usaha melewati seluruh tahapan sertifikasi, dari persiapan dokumen hingga pengajuan resmi.',
      'Memverifikasi bahan baku, proses produksi, dan dokumen pendukung agar sesuai standar sertifikasi halal yang berlaku.',
      'Menjadi narahubung dan fasilitator pengajuan sertifikasi melalui sistem SiHalal BPJPH.',
      'Mendokumentasikan hasil pendampingan dan proses verifikasi secara sistematis sebagai dasar audit dan tindak lanjut.',
    ],
    stack: [
      'Halal Certification',
      'Compliance',
      'Client Assistance',
      'Document Verification',
      'SiHalal BPJPH',
      'Stakeholder Communication',
      'Training & Education',
      'Process Documentation',
    ],
  },
  {
    id: 'data-entry-lp3h',
    role: 'Data Entry Specialist',
    company: 'LP3H Edukasi Halal Indonesia',
    type: 'Contract',
    location: 'Bandar Lampung, Indonesia',
    start: 'Agustus 2025',
    end: 'April 2026',
    period: 'Agustus 2025 — April 2026',
    icon: 'database',
    summary:
      'Mengelola basis data sertifikasi halal untuk lebih dari 3.000 pelaku usaha dan memastikan setiap entri akurat serta siap diproses. Menerapkan validasi dan quality control di titik input, sehingga kesalahan tertangkap sebelum data masuk ke sistem pusat.',
    highlights: [
      'Mengelola, memvalidasi, dan menginput lebih dari 3.000 data pelaku usaha ke sistem SiHalal BPJPH.',
      'Memeriksa kelengkapan dokumen legalitas usaha meliputi NIB, KTP, data usaha, dan informasi bahan baku.',
      'Melakukan data cleaning, validasi, dan rekonsiliasi database menggunakan Microsoft Excel dan Google Sheets.',
      'Menerapkan quality control untuk menjaga akurasi dan konsistensi data lintas periode pelaporan.',
      'Menyusun dokumentasi digital yang terstruktur agar data mudah ditelusuri kembali.',
    ],
    stack: [
      'Data Management',
      'Data Validation',
      'Data Cleaning',
      'Quality Control',
      'SiHalal BPJPH',
      'Microsoft Excel',
      'Google Sheets',
      'Digital Documentation',
    ],
  },
]

/** EDUCATION — ditampilkan sebagai kartu di bawah timeline pengalaman. */
export const education = [
  {
    id: 'darmajaya',
    degree: 'S1 Teknik Informatika',
    school: 'Institut Informatika dan Bisnis Darmajaya',
    location: 'Bandar Lampung, Indonesia',
    period: '2021 — 2025',
    gpa: '3.61',
    gpaScale: '4.00',
    icon: 'graduation-cap',
    notes: [
      'Fokus pada rekayasa perangkat lunak, interaksi manusia–komputer, dan basis data.',
      'Menyelesaikan tugas akhir dengan pendekatan riset pengguna dan perancangan antarmuka.',
    ],

    // ── Tugas akhir / skripsi ────────────────────────────────────────────
    thesisTitle:
      'Implementasi Aplikasi Pembelajaran Interaktif Berbasis Game Edukatif bagi Anak Usia Dini (Studi Kasus: PAUD SKB Way Kanan)',
    thesisDescription:
      'Mengembangkan aplikasi pembelajaran interaktif berbasis game edukatif untuk anak PAUD dengan model pengembangan ADDIE dan metode Research and Development. Aplikasi memiliki dua menu utama — Belajar (huruf, angka, benda, dan bentuk bangun datar) serta Bermain (menulis huruf, pasang angka, merangkai kalimat, dan menyusun suku kata) — dan diuji dengan Black Box Testing hingga seluruh fitur berfungsi sesuai kebutuhan.',
    role: 'Peneliti & Pengembang Aplikasi',
    technology: [
      'Unity',
      'Game Edukatif',
      'ADDIE Model',
      'Research & Development',
      'Black Box Testing',
      'Observasi & Wawancara',
      'Studi Literatur',
    ],
    repositoryUrl: 'https://repo.darmajaya.ac.id/24442/',
    // Foto wisuda. Kosong atau file belum ada = tampil placeholder, bukan
    // gambar rusak. Ini gambar pendukung, bukan foto profil utama.
    image: '/images/graduation.jpg',
  },
]
