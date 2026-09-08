/**
 * LEADERSHIP — pengalaman kepemimpinan organisasi/program.
 *
 * Dipisahkan dari `experiences` supaya pengalaman profesional dan peran
 * kepemimpinan tidak tercampur saat dibaca recruiter.
 *
 * Urutan array = urutan tampil (terbaru di atas).
 */

export const leadership = [
  {
    id: 'kepala-suku-pmm-4',
    role: 'Kepala Suku Pertukaran Mahasiswa Merdeka Batch IV',
    organization: 'Kampus Merdeka — Kemendikbudristek',
    location: 'Telkom University, Bandung',
    period: 'Februari 2024 — Juni 2024',
    icon: 'users',
    summary:
      'Bertanggung jawab sebagai Kepala Suku PMM dalam mengoordinasikan 43 mahasiswa dari berbagai daerah di Indonesia selama program Pertukaran Mahasiswa Merdeka Batch IV.',
    highlights: [
      'Coordinated communication and activities for 43 students.',
      'Managed group information and collaboration.',
      'Supported cross-cultural teamwork.',
      'Developed leadership, teamwork, and stakeholder management skills.',
    ],
    stack: ['Leadership', 'Team Coordination', 'Stakeholder Management', 'Cross-cultural Teamwork'],
    gallery: [
      {
        src: '/leadership/memandu-penyambutan.jpg',
        caption: 'Memandu acara penyambutan mahasiswa inbound PMM Angkatan 4 di Telkom University.',
      },
      {
        src: '/leadership/penyambutan-mahasiswa.jpg',
        caption: 'Penyambutan resmi peserta PMM Angkatan 4 dari berbagai daerah di Indonesia.',
      },
    ],
  },
]
