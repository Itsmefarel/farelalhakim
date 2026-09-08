/**
 * BLOG — artikel pendek yang menunjukkan cara Anda berpikir.
 *
 * Konten disimpan sebagai array "block" supaya bisa dirender tanpa
 * library markdown tambahan. Tipe block yang didukung:
 *   { type: 'heading',   text }
 *   { type: 'paragraph', text }
 *   { type: 'list',      items: [] }
 *   { type: 'quote',     text }
 *   { type: 'code',      lang, code }
 *
 * Menambah artikel = menambah satu objek di array ini. URL: /blog/<slug>
 */

export const posts = [
  {
    slug: 'belajar-uiux-dari-lapangan',
    title: 'Belajar UI/UX dari Lapangan, Bukan dari Tutorial',
    category: 'UI/UX Case Study',
    date: '2026-07-18',
    readTime: '5 menit',
    excerpt:
      'Pendampingan UMK mengajari saya satu hal yang tidak pernah muncul di tutorial: pengguna tidak membaca, mereka menebak.',
    tags: ['UI/UX', 'Research', 'Field Notes'],
    content: [
      {
        type: 'paragraph',
        text: 'Ketika pertama kali belajar UI/UX, saya mengira pekerjaannya adalah membuat tampilan yang rapi. Ternyata bagian tersulitnya jauh sebelum itu: memahami apa yang sebenarnya membuat orang berhenti di tengah jalan.',
      },
      { type: 'heading', text: 'Pengguna tidak membaca, mereka menebak' },
      {
        type: 'paragraph',
        text: 'Saat mendampingi pelaku usaha mikro mengisi formulir pengajuan, saya memperhatikan pola yang sama berulang kali. Mereka tidak membaca penjelasan panjang di atas isian. Mereka melihat label, menebak maksudnya, lalu mengisi.',
      },
      {
        type: 'paragraph',
        text: 'Artinya, satu kata pada label bekerja lebih keras daripada satu paragraf bantuan yang ditulis di bawahnya.',
      },
      { type: 'heading', text: 'Tiga hal yang saya ubah' },
      {
        type: 'list',
        items: [
          'Mengganti istilah resmi dengan bahasa yang dipakai sehari-hari di lapangan.',
          'Memberi contoh nyata langsung di sebelah isian, bukan di halaman bantuan terpisah.',
          'Menunjukkan progres agar orang tahu tinggal berapa langkah lagi.',
        ],
      },
      {
        type: 'quote',
        text: 'Desain yang baik mengurangi jumlah pertanyaan, bukan menambah jumlah halaman penjelasan.',
      },
      { type: 'heading', text: 'Yang saya bawa ke project berikutnya' },
      {
        type: 'paragraph',
        text: 'Sekarang, sebelum membuka Figma, saya menulis dulu daftar pertanyaan yang mungkin muncul di kepala pengguna. Kalau antarmuka saya belum menjawab pertanyaan itu, berarti desainnya belum selesai — sebagus apa pun tampilannya.',
      },
    ],
  },
  {
    slug: 'catatan-frontend-pertama',
    title: 'Catatan Frontend: Hal yang Baru Saya Pahami Setelah Praktik',
    category: 'Programming Notes',
    date: '2026-06-02',
    readTime: '4 menit',
    excerpt:
      'Menulis komponen itu mudah. Menulis komponen yang masih enak dibaca dua bulan kemudian, itu yang perlu latihan.',
    tags: ['Frontend', 'React', 'Clean Code'],
    content: [
      {
        type: 'paragraph',
        text: 'Waktu awal belajar React, saya menaruh hampir semuanya di satu file. Selama fiturnya sedikit, itu terasa cepat. Masalah baru muncul ketika saya harus mengubah satu hal kecil dan bingung sendiri di mana letaknya.',
      },
      { type: 'heading', text: 'Pisahkan data dari tampilan' },
      {
        type: 'paragraph',
        text: 'Perubahan paling berdampak pada cara saya menulis kode adalah memindahkan seluruh konten ke file data terpisah. Komponen hanya mengurus cara menampilkan, bukan isi.',
      },
      {
        type: 'code',
        lang: 'jsx',
        code: `// Sebelum — konten menempel di komponen\nfunction Skills() {\n  return <li>UI/UX Design — 88%</li>\n}\n\n// Sesudah — komponen hanya merender data\nfunction Skills({ skills }) {\n  return skills.map((skill) => <SkillBar key={skill.name} {...skill} />)\n}`,
      },
      {
        type: 'paragraph',
        text: 'Hasilnya, menambah keahlian baru cukup mengubah satu baris di file data. Tidak ada risiko merusak tampilan.',
      },
      { type: 'heading', text: 'Animasi secukupnya' },
      {
        type: 'list',
        items: [
          'Animasi masuk membantu orang memahami urutan informasi.',
          'Animasi di setiap elemen justru membuat halaman terasa lambat.',
          'Selalu sediakan jalur untuk pengguna yang memilih reduced motion.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Aturan sederhana yang saya pakai sekarang: kalau animasi dihapus dan halaman tetap masuk akal, animasi itu boleh ada. Kalau halaman jadi membingungkan tanpanya, berarti saya menyembunyikan masalah struktur di balik gerakan.',
      },
    ],
  },
  {
    slug: 'dari-kampus-ke-dunia-kerja',
    title: 'Dari Kampus ke Dunia Kerja: Apa yang Tidak Diajarkan di Kelas',
    category: 'Learning Journey',
    date: '2026-04-25',
    readTime: '4 menit',
    excerpt:
      'Nilai bagus membantu saya masuk ruangan. Yang membuat saya bertahan di dalamnya ternyata hal lain.',
    tags: ['Career', 'Fresh Graduate', 'Reflection'],
    content: [
      {
        type: 'paragraph',
        text: 'Selama kuliah, ukuran keberhasilan cukup jelas: kerjakan tugas, penuhi kriteria, dapat nilai. Di tempat kerja, sebagian besar masalah datang tanpa kriteria penilaian dan sering tanpa rumusan yang jelas.',
      },
      { type: 'heading', text: 'Masalah nyata jarang datang dalam bentuk rapi' },
      {
        type: 'paragraph',
        text: 'Tidak ada yang bilang "buatkan validasi data". Yang ada adalah keluhan "datanya sering salah, jadi harus dicek ulang terus". Menerjemahkan keluhan menjadi masalah yang bisa dikerjakan adalah keahlian tersendiri.',
      },
      { type: 'heading', text: 'Tiga kebiasaan yang membantu saya' },
      {
        type: 'list',
        items: [
          'Bertanya sampai paham, bukan sampai terlihat paham.',
          'Menulis catatan singkat setelah setiap perubahan — sangat menolong saat ditanya minggu berikutnya.',
          'Menyelesaikan versi kecil lebih dulu daripada merencanakan versi sempurna yang tidak pernah jadi.',
        ],
      },
      {
        type: 'quote',
        text: 'Fresh graduate tidak dinilai dari seberapa banyak yang sudah dikuasai, tetapi dari seberapa cepat bisa belajar dan diandalkan.',
      },
      {
        type: 'paragraph',
        text: 'Itu juga alasan portfolio ini tidak hanya menampilkan hasil akhir, tetapi juga prosesnya. Hasil menunjukkan apa yang saya bisa; proses menunjukkan bagaimana saya akan mengerjakan hal yang belum saya bisa.',
      },
    ],
  },
  {
    slug: 'webinar-nib-sertifikat-halal-sihalal',
    title: 'Berbagi Pengetahuan Digital: Pembuatan NIB dan Sertifikat Halal bagi UMKM melalui SIHALAL',
    category: 'Professional Activity',
    date: '2026-02-22',
    readTime: '4 menit',
    excerpt:
      'Berkesempatan menjadi narasumber dalam webinar edukasi bersama LP3H Edukasi Halal Indonesia mengenai proses pembuatan NIB dan sertifikasi halal bagi UMKM melalui aplikasi SIHALAL.',
    tags: ['Public Speaking', 'Digital Education', 'SIHALAL', 'UMKM', 'Technology Adoption'],
    content: [
      {
        type: 'paragraph',
        text: 'Minggu siang, 22 Februari 2026, saya menjadi salah satu dari tiga narasumber pada webinar yang diselenggarakan LP3H Edukasi Halal Indonesia. Topiknya sangat spesifik: bagaimana pelaku UMKM mengurus Nomor Induk Berusaha dan sertifikat halal lewat aplikasi SIHALAL. Pesertanya bukan orang teknologi — mereka pemilik usaha yang selama ini mengurus semuanya secara manual.',
      },
      { type: 'heading', text: 'Menjelaskan sistem kepada orang yang bukan penggunanya' },
      {
        type: 'paragraph',
        text: 'Kesulitan terbesar bukan menjelaskan cara memakai aplikasinya. Kesulitannya adalah menjelaskan mengapa langkah tertentu ada. Selama mendampingi, saya sering menemukan pelaku usaha berhenti bukan karena tidak bisa mengklik, melainkan karena tidak paham apa yang sedang diminta sistem darinya.',
      },
      {
        type: 'paragraph',
        text: 'Jadi saya tidak memulai dari antarmuka SIHALAL. Saya mulai dari pertanyaan yang ada di kepala mereka: dokumen apa yang harus disiapkan, berapa lama prosesnya, dan apa yang terjadi kalau ada yang kurang. Barulah setelah itu layar aplikasinya masuk akal.',
      },
      { type: 'heading', text: 'Yang saya ubah dari cara menjelaskan' },
      {
        type: 'list',
        items: [
          'Mengganti istilah teknis dan singkatan resmi dengan bahasa yang dipakai pelaku usaha sehari-hari.',
          'Menunjukkan alurnya secara berurutan di layar, bukan membacakan daftar persyaratan.',
          'Menyiapkan contoh dokumen nyata, karena satu contoh lebih cepat dipahami daripada satu paragraf penjelasan.',
          'Menyediakan waktu tanya jawab terpisah, agar peserta tidak sungkan bertanya di tengah materi.',
        ],
      },
      { type: 'heading', text: 'Public speaking ternyata soal mendengar' },
      {
        type: 'paragraph',
        text: 'Sebelum acara, saya mengira tugas narasumber adalah menyampaikan materi sebaik mungkin. Ternyata bagian yang paling menentukan justru sesi tanya jawab. Pertanyaan peserta menunjukkan bagian mana dari penjelasan saya yang belum sampai — dan itu informasi yang tidak akan saya dapat kalau saya hanya fokus menyelesaikan slide.',
      },
      {
        type: 'quote',
        text: 'Materi dianggap berhasil bukan ketika selesai dibawakan, melainkan ketika peserta bisa mengulangi langkahnya sendiri setelah acara.',
      },
      { type: 'heading', text: 'Yang saya bawa ke pekerjaan sehari-hari' },
      {
        type: 'paragraph',
        text: 'Pengalaman ini menyambung langsung dengan pekerjaan saya mengelola data sertifikasi halal. Ketika saya tahu di titik mana pelaku usaha biasanya bingung, saya jadi lebih teliti memeriksa berkas di titik yang sama. Edukasi dan pengelolaan data ternyata dua sisi dari masalah yang sama: keduanya berusaha membuat data masuk dengan benar sejak awal.',
      },
      {
        type: 'paragraph',
        text: 'Buat saya, ini juga alasan kenapa teknologi tidak berhenti di aplikasinya. Sistem sebagus apa pun tetap butuh orang yang mau menjelaskannya dengan sabar kepada mereka yang baru pertama kali memakainya.',
      },
    ],
  },
]

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug)

/** Format ISO date → "18 Juli 2026" */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
