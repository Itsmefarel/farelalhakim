/**
 * SKILLS — rendered as a "capability dashboard", not a plain list.
 *
 * level = 0..100. Be honest: recruiters test what you claim.
 *   40–59  Familiar   · pernah dipakai, masih perlu referensi
 *   60–74  Competent  · nyaman dipakai untuk tugas nyata
 *   75–89  Proficient · bisa dipakai mandiri end-to-end
 *   90+    Advanced   · bisa mengajarkan ke orang lain
 */

export const skillCategories = [
  {
    id: 'technical',
    title: 'Technical Skill',
    description: 'Kemampuan teknis yang dipakai untuk merancang dan membangun produk digital.',
    icon: 'code-2',
    skills: [
      { name: 'UI/UX Design', level: 88, tools: ['Figma', 'Wireframing', 'Prototyping'] },
      { name: 'Web Development', level: 78, tools: ['HTML', 'CSS', 'JavaScript'] },
      { name: 'Programming', level: 72, tools: ['PHP', 'Python', 'Java'] },
      { name: 'System Management', level: 80, tools: ['Sistem Informasi', 'Konfigurasi'] },
      { name: 'Data Entry & Reporting', level: 90, tools: ['Validasi', 'Rekap', 'Laporan'] },
      { name: 'Microsoft Office', level: 92, tools: ['Word', 'Excel', 'PowerPoint'] },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skill',
    description: 'Cara saya bekerja bersama tim dan menghadapi masalah di lapangan.',
    icon: 'users',
    skills: [
      { name: 'Communication', level: 90, tools: ['Presentasi', 'Edukasi pengguna'] },
      { name: 'Teamwork', level: 88, tools: ['Kolaborasi', 'Koordinasi'] },
      { name: 'Technology Adaptation', level: 88, tools: ['Tools baru', 'Sistem baru'] },
      { name: 'Problem Solving', level: 86, tools: ['Analisis', 'Root cause'] },
      { name: 'Mentoring & Public Speaking', level: 85, tools: ['Narasumber', 'Pelatihan'] },
      { name: 'Time Management', level: 85, tools: ['Prioritas', 'Deadline'] },
      { name: 'Leadership', level: 78, tools: ['Inisiatif', 'Pendampingan'] },
    ],
  },
]

/**
 * Focus areas — the three headline numbers at the top of the skills
 * dashboard. Keep to three; more turns the dashboard into a list again.
 */
export const focusAreas = [
  {
    id: 'design',
    label: 'Design',
    value: 85,
    caption: 'UI/UX, prototyping, design system',
    icon: 'pen-tool',
  },
  {
    id: 'development',
    label: 'Development',
    value: 75,
    caption: 'Frontend, web, dasar pemrograman',
    icon: 'code-2',
  },
  {
    id: 'operations',
    label: 'Operations',
    value: 88,
    caption: 'System management, data, support',
    icon: 'server-cog',
  },
]

/** Tool badges for the marquee strip — logo-free, so nothing ever 404s. */
export const toolbelt = [
  'Figma',
  'React',
  'Tailwind CSS',
  'JavaScript',
  'HTML5',
  'CSS3',
  'PHP',
  'MySQL',
  'Python',
  'Git',
  'Canva',
  'Microsoft Excel',
  'Notion',
  'Trello',
]

/** Short "how I work" steps used in the About section. */
export const workflow = [
  {
    step: '01',
    title: 'Understand',
    description: 'Menggali masalah dan kebutuhan pengguna sebelum menyentuh desain atau kode.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Menyusun alur, wireframe, dan prototype di Figma untuk diuji lebih awal.',
    icon: 'pen-tool',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Menerjemahkan desain menjadi antarmuka yang responsif dan rapi.',
    icon: 'code',
  },
  {
    step: '04',
    title: 'Evaluate',
    description: 'Menguji, mengukur, dan memperbaiki berdasarkan umpan balik nyata.',
    icon: 'line-chart',
  },
]
