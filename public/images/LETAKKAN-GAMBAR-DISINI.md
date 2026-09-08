# Folder gambar

## Foto profil — ✅ SUDAH TERPASANG

`profile.jpg` (608 × 598 px, 34 KB) sudah ada dan tampil di hero.
Path-nya terdaftar sebagai `photo: '/images/profile.jpg'` di
`src/data/profile.js`.

**Kalau suatu saat ingin mengganti foto:** timpa `profile.jpg` dengan file
baru bernama sama — tidak ada kode yang perlu diubah. Bila memakai format
lain (`.png` / `.webp`), sesuaikan juga nilai `photo` di `profile.js`.

Saran: rasio potret 4:5 dan lebar minimal 900 px agar tetap tajam di layar
beresolusi tinggi. Jaga ukuran file di bawah ±150 KB — gambar ini dimuat
paling awal dan ikut menentukan skor performa halaman.

Kalau file hilang atau gagal dimuat, hero otomatis kembali ke monogram "FA",
jadi tidak akan pernah muncul ikon gambar rusak.

## Screenshot project

Untuk cover dan galeri case study, buat folder `public/projects/` lalu isi
`cover` dan `gallery` di `src/data/projects.js`:

```js
cover: '/projects/nama-project.jpg',
gallery: ['/projects/nama-project-1.jpg', '/projects/nama-project-2.jpg'],
```

## Sertifikat

Untuk file sertifikat, buat folder `public/certificates/` lalu isi `image` dan
`file` di `src/data/certifications.js`.

---

⚠️ **Sebelum deploy final:** file penanda ini ikut ter-publish dan bisa dibuka
publik di `namadomain.vercel.app/images/LETAKKAN-GAMBAR-DISINI.md`.
Hapus saja kalau sudah tidak diperlukan.
