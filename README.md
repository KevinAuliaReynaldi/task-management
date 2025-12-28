Website Task Management adalah sebuah aplikasi berbasis web yang dirancang untuk membantu proses pengelolaan tugas secara terstruktur, efisien, dan terkontrol dalam sebuah tim atau organisasi. Aplikasi ini memungkinkan pengguna untuk membuat, mengatur, memantau, dan memperbarui tugas sesuai dengan peran (role) yang dimiliki.

Website ini dibangun menggunakan Next.js dengan TypeScript sebagai framework utama, Tailwind CSS untuk tampilan antarmuka yang modern dan responsif, serta MySQL (phpMyAdmin) sebagai sistem manajemen basis data. Sistem keamanan dan autentikasi pengguna diterapkan menggunakan NextAuth dengan Credentials Provider, sehingga akses ke dalam sistem hanya dapat dilakukan oleh pengguna yang terdaftar.

🔐 Sistem Role dan Hak Akses
Website ini menerapkan Role-Based Access Control (RBAC) yang membagi pengguna ke dalam dua peran utama:
1. Admin
- Mengelola data pengguna (create, read, update, delete)
- Membuat, mengubah, menghapus, dan melihat seluruh tugas
- Menentukan dan mengatur penugasan task kepada user
- Memantau progres tugas seluruh pengguna
2. User
- Melihat daftar tugas yang diberikan kepadanya
- Memperbarui status tugas (Todo, In Progress, Done)
- Tidak memiliki akses ke data pengguna lain
- Tidak dapat menghapus tugas

📌 Fitur Utama
- Manajemen tugas berbasis role
- Status tugas (Todo, In Progress, Done)
- Penentuan deadline tugas
- Dashboard terpisah antara Admin dan User
- Sistem login yang aman dengan enkripsi password
- Validasi dan proteksi akses halaman serta API

🎯 Tujuan Pengembangan
Website Task Management ini dikembangkan untuk meningkatkan produktivitas kerja, meminimalisir kesalahan dalam pembagian tugas, serta mempermudah monitoring pekerjaan secara real-time. Aplikasi ini cocok digunakan untuk kebutuhan perusahaan, organisasi, tim proyek, maupun tugas akademik.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
