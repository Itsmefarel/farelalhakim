/**
 * CERTIFICATIONS — rendered as a gallery with preview modal + download.
 *
 * Cara menambah:
 * 1. Letakkan file sertifikat di `public/certificates/nama-file.jpg` (atau .pdf)
 * 2. Tambahkan objek baru di array ini dengan `file: '/certificates/nama-file.jpg'`
 * 3. `image: null` → preview gradien otomatis dibuat dari judul sertifikat.
 */

export const certifications = [
  {
    id: 'pmm-batch-4',
    title: 'Pertukaran Mahasiswa Merdeka Angkatan 4',
    issuer: 'Kampus Merdeka — Kemendikbudristek',
    date: 'Februari — Juni 2024',
    credentialId: '',
    credentialUrl: '',
    image: '/certificates/pmm-batch-4.jpg',
    file: '/certificates/pmm-batch-4.jpg',
    skills: ['Leadership', 'Koordinasi Tim', 'Kolaborasi Lintas Budaya', 'Konten Digital', 'Networking'],
  },
  {
    id: 'pendamping-halal',
    title: 'Pelatihan Pendamping Proses Produk Halal (P3H)',
    issuer: 'BPJPH — Kementerian Agama RI',
    date: 'Agustus 2025',
    credentialId: 'A-393/BD.II/P.II.II/KP.02/09/2025',
    credentialUrl: '',
    // Tanggal lahir pada sertifikat asli sengaja ditutup sebelum dipublikasikan.
    image: '/certificates/p3h-bpjph.jpg',
    file: '/certificates/p3h-bpjph.jpg',
    skills: ['Sertifikasi Halal', 'Pendampingan UMK', 'Verifikasi Dokumen'],
  },
]
