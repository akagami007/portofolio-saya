import { Dictionary } from './en';

export const id: Dictionary = {
  hero: {
    greeting: "Hai, saya",
    name: "Stefan Cornelius",
    role: "Fullstack Developer & Quality Assurance Engineer",
    description: "Saya memadukan keahlian Fullstack Development dengan ketelitian holistik Quality Assurance. Saya merancang arsitektur aplikasi berskala besar yang inovatif, sekaligus mengamankan setiap rilis melalui kombinasi pengujian manual yang mendetail, otomatisasi ujung-ke-ujung (E2E), serta penyusunan dokumen pelaporan hasil uji yang komprehensif. Pendekatan terpadu ini tidak hanya mempercepat siklus peluncuran produk, tetapi juga memberikan transparansi penuh kepada pemangku kepentingan (stakeholders), memastikan setiap baris kode menghasilkan performa maksimal dan pengalaman pengguna tanpa cela.",
    viewWork: "Lihat Karya Saya",
    hireMe: "Pekerjakan Saya"
  },
  about: {
    title: "Tentang Saya",
    p1: "Dengan fokus ganda yang unik pada Fullstack Development dan Quality Assurance, saya tidak hanya menulis kode—saya merancang sistem yang tangguh. Pendekatan saya menggabungkan pemecahan masalah kreatif dari sisi frontend/backend dengan ketelitian ekstra khas seorang QA engineer.",
    p2: "Baik saat bekerja dengan klien freelance untuk mewujudkan visi mereka, maupun berkolaborasi dalam tim untuk membangun perangkat lunak enterprise, saya memprioritaskan kemudahan pemeliharaan (maintainability), performa, dan keandalan sistem.",
    coreCompetencies: "Keahlian Utama",
    frontend: "Frontend (React, Next.js, 3D)",
    backend: "Backend (Node.js, SQL, APIs)",
    qa: "QA & E2E Testing (Playwright, Cypress)"
  },
  experience: {
    title: "Pengalaman Kerja",
    description: "Perjalanan karier profesional saya dari waktu ke waktu.",
    items: [
      {
        id: 1,
        role: "Quality Assurance Tester",
        company: "PT Infosys Solusi Terpadu",
        period: "Apr 2022 - Sekarang",
        description: "Memimpin strategi pengujian hulu ke hilir (End-to-End) untuk aplikasi mobile dan web berkinerja tinggi. Merancang skenario pengujian yang sangat teliti dan menyusun dokumen hasil uji terstruktur guna memastikan setiap perilisan perangkat lunak bebas dari celah, menurunkan tingkat bug pasca-rilis secara drastis, serta mengamankan pengalaman pengguna yang memuaskan."
      },
      {
        id: 2,
        role: "Pega Developer",
        company: "PT Asuransi Sinar Mas",
        period: "Feb 2021 - Feb 2022",
        description: "Merancang dan membangun solusi alur kerja berskala Enterprise menggunakan platform Pega. Mengubah logika dan aturan bisnis yang rumit menjadi sistem terotomatisasi yang elegan, mempercepat efisiensi operasional internal, serta memastikan arsitektur asuransi berjalan aman dan stabil tanpa henti."
      }
    ]
  },
  projects: {
    title: "Galeri Proyek",
    description: "Kumpulan karya terbaru saya di bidang Fullstack Development dan Quality Assurance. Geser atau seret untuk menjelajahi proyek dalam ruang 3D.",
    dragHint: "← Geser untuk memutar galeri, Klik untuk melihat detail →",
    viewRepo: "Lihat Repositori",
    technologies: "Teknologi",
    items: [
      {
        id: 1,
        title: "E-Commerce",
        desc: "Next.js & Stripe",
        image: "/projects/1.jpg",
        github: "https://github.com/",
        longDesc: "Platform e-commerce full-stack berkinerja tinggi yang dirancang untuk ritel modern. Dilengkapi dengan etalase toko yang responsif, alur pembayaran yang aman melalui Stripe, serta dasbor kustom untuk manajemen inventaris.",
        tags: ["Next.js", "Stripe", "Tailwind CSS", "TypeScript"]
      },
      {
        id: 2,
        title: "QA Manual & Automation",
        desc: "Playwright, Cypress & Katalon",
        image: "/projects/2.jpg",
        github: "https://github.com/",
        longDesc: "Rangkaian penjaminan mutu (QA) komprehensif yang mencakup metodologi pengujian manual dan jalur pengujian E2E terotomatisasi. Dirancang untuk memastikan setiap peluncuran aplikasi web yang kompleks berjalan tanpa cacat (zero-defect).",
        tags: ["Playwright", "Cypress", "Katalon", "E2E Testing"]
      },
      {
        id: 3,
        title: "CMS OpenTrip",
        desc: "Next.js & Postgresql",
        image: "/projects/CMS OpenTrip.png",
        github: "https://github.com/",
        longDesc: "Sistem Manajemen Konten (CMS) kustom yang dirancang khusus untuk platform OpenTrip. Memungkinkan para admin untuk mengelola paket tur, pemesanan, hak akses pengguna, serta laporan keuangan dengan mulus dan terpusat.",
        tags: ["Next.js", "PostgreSQL", "Prisma", "Admin Panel"]
      },
      {
        id: 4,
        title: "OpenTrip",
        desc: "Next.js & Express",
        image: "/projects/OpenTrip.png",
        github: "https://github.com/",
        longDesc: "Portal utama bagi pelanggan untuk memesan pengalaman perjalanan. Ditenagai oleh frontend Next.js yang tangguh dan backend API Express, menawarkan pengecekan ketersediaan tur secara real-time dan sistem otentikasi pengguna yang aman.",
        tags: ["Next.js", "Express.js", "REST API", "Node.js"]
      },
      {
        id: 5,
        title: "Kilau Kebaya",
        desc: "Next.js, Laravel, & Postgresql",
        image: "/projects/KilauKebaya.png",
        github: "https://github.com/",
        longDesc: "Aplikasi web yang elegan dan modern untuk butik kebaya premium. Mengintegrasikan etalase Next.js yang menawan dengan backend API Laravel yang solid untuk menangani variasi produk dan pesanan yang kompleks.",
        tags: ["Next.js", "Laravel", "PostgreSQL", "E-Commerce"]
      },
      {
        id: 6,
        title: "Coffeshop",
        desc: "Next.js & TailwindCSS",
        image: "/projects/6.jpg",
        github: "https://github.com/akagami007/kopi-kita.git",
        longDesc: "Halaman pendaratan (landing page) dan menu digital yang memanjakan mata untuk kedai kopi lokal. Menampilkan desain pixel-perfect, animasi mikro yang mulus, dan dibangun murni dengan Next.js serta Tailwind CSS demi performa maksimal.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "UI/UX"]
      }
    ]
  },
  socials: {
    title: "Mari Terhubung",
    description: "Temukan saya di media sosial atau hubungi saya secara langsung."
  },
  contact: {
    title: "Mari Bekerja Sama",
    description: "Punya proyek freelance yang ingin dikerjakan atau sedang mencari Fullstack/QA engineer? Mari mulai obrolan di bawah ini.",
  },
  chat: {
    botName: "Stefan (Virtual)",
    step1: "Halo! Terima kasih sudah mampir ke portofolio saya. Boleh tahu siapa nama Anda?",
    step2: "Salam kenal, {name}! Boleh minta alamat email Anda agar saya bisa membalas pesan Anda nanti?",
    invalidEmail: "Hmm, sepertinya format emailnya kurang tepat. Boleh coba ketik ulang?",
    step3: "Bagus! Terakhir, apa yang ingin Anda diskusikan? Silakan pilih opsi di bawah atau ketik pesan Anda sendiri.",
    step4: "Menyiapkan pesan Anda untuk dikirim via WhatsApp...",
    success: "Sip! WhatsApp akan terbuka sebentar lagi. Jika tidak terbuka otomatis, Anda bisa mengirimnya secara manual.",
    error: "Terjadi kesalahan. Silakan coba lagi atau hubungi saya via LinkedIn!",
    inputPlaceholderName: "Ketik nama Anda...",
    inputPlaceholderEmail: "Ketik email Anda...",
    inputPlaceholderMessage: "Ketik pesan Anda di sini...",
    sendButton: "Kirim",
    optionJob: "Tawaran Kerja",
    optionFreelance: "Proyek Freelance"
  },
  footer: {
    rights: "Hak cipta dilindungi undang-undang.",
    builtWith: "Dibuat dengan Next.js, Three.js, dan Playwright."
  },
  nav: {
    about: "Tentang",
    skills: "Keahlian",
    caseStudies: "Studi Kasus",
    contact: "Hubungi Saya"
  }
};
