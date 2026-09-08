# Aset project — MY Asrama TEL-U ✅ SUDAH TERISI

Seluruh gambar sudah dipotong dari board Figma
(`UI_UX MY Asrama TEL-U.png`, 11826 × 8449 px) dan terpasang di halaman
case study. Tidak ada yang perlu Anda lakukan lagi di sini.

| File                  | Isi                                                          |
| --------------------- | ------------------------------------------------------------ |
| `cover.jpg`           | Board Figma penuh, dikomposisikan ke kanvas 16:9              |
| `home.jpg`            | Index Screen — pintasan 8 modul, profil, pengaturan akun      |
| `barcode-absensi.jpg` | Scan QR pengantar + state kode berhasil terbaca               |
| `payment.jpg`         | Metode bayar, isi ulang kredit, tagihan, konfirmasi           |
| `complaint-hub.jpg`   | Formulir laporan, verifikasi, lampiran bukti                  |
| `dorm-store.jpg`      | Etalase kategori, daftar produk, keranjang, checkout          |
| `design-system.jpg`   | Skala warna Primary–Error dan kumpulan state overlay          |

## Kalau ingin mengganti salah satu gambar

Timpa file-nya dengan nama yang sama — tidak ada kode yang perlu diubah.
Kalau nama atau ekstensinya berbeda, sesuaikan `cover` / `gallery` pada entry
`slug: 'my-asrama-telu'` di `src/data/projects.js`.

## Catatan teknis

- **`cover.jpg`** sengaja dibuat tepat 1920 × 1080 (16:9). Bingkai cover di
  halaman detail memakai `object-cover` pada rasio 16:9, jadi dengan rasio yang
  sudah sama persis, board tidak terpotong sedikit pun.
- **Gambar galeri** ditampilkan dengan `object-contain` di atas kotak 4:3,
  sehingga potongan yang tinggi maupun lebar sama-sama muat utuh.
- Semua file JPEG kualitas 88–90, sisi terpanjang maksimal 1600 px. Total
  seluruh aset project ini sekitar 1.5 MB.

---

⚠️ **Sebelum deploy final:** file penanda ini ikut ter-publish dan bisa dibuka
publik. Hapus saja kalau sudah tidak diperlukan.
