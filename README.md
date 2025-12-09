# Chaintificate

**Chaintificate** adalah platform berbasis blockchain untuk penerbitan dan verifikasi sertifikat digital. Dibangun dengan [Next.js](https://nextjs.org/), proyek ini memanfaatkan keunggulan teknologi Web3 untuk menjamin keaslian, transparansi, dan keabadian sertifikat pendidikan maupun profesional.

## 🚀 Fitur Utama

### 1. Sistem Multi-Peran (Role-Based)
- **Institusi**: Dapat mendaftarkan diri, membuat "Koleksi Sertifikat" (Smart Contract Collection), dan menerbitkan sertifikat kepada siswa.
- **Mahasiswa**: Dapat mendaftar, menerima sertifikat secara otomatis ke dompet digital mereka, dan menampilkan portofolio sertifikat yang telah terverifikasi.

### 2. Penerbitan Sertifikat (Minting)
- Sertifikat dicetak (minting) sebagai aset digital (NFT) langsung di blockchain.
- Menjamin sertifikat tidak dapat dipalsukan dan mudah diverifikasi oleh pihak ketiga.

### 3. Penyimpanan Terdesentralisasi (IPFS)
- Metadata sertifikat dan gambar aset disimpan menggunakan **Pinata (IPFS)**, memastikan data tetap tersedia secara terdesentralisasi dan aman.

### 4. Papan Lowongan Kerja (Job Vacancy)
- Fitur tambahan yang menghubungkan siswa dengan peluang karir yang relevan dengan sertifikasi mereka.

### 5. Dasbor & Manajemen
- **Dasbor Institusi**: Untuk mengelola koleksi, memantau sertifikat yang diterbitkan, dan melakukan aksi minting.
- **Eksplorer**: Memudahkan penelusuran sertifikat dan koleksi yang ada di platform.

## 🛠️ Teknologi Stack

Proyek ini dibangun menggunakan teknologi modern:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Bahasa**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Blockchain Interaction**: [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/), [Ethers.js](https://docs.ethers.org/)
- **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/)
- **Database**: PostgreSQL dengan [Prisma ORM](https://www.prisma.io/)
- **Storage**: [Pinata](https://pinata.cloud/) (IPFS)

## 📦 Persyaratan Sistem

Sebelum memulai, pastikan Anda memiliki:
- **Node.js**: Versi 18 atau lebih baru.
- **PostgreSQL**: Untuk database lokal.
- **Dompet Kripto**: Ekstensi browser seperti [MetaMask](https://metamask.io/) yang terpasang.

## 💻 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan Chaintificate di komputer lokal Anda:

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/username/chaintificate.git
cd chaintificate
npm install
```

### 2. Konfigurasi Environment Variables
Buat file `.env` di root direktori project dan isi dengan kredensial yang diperlukan. Contoh konfigurasi dasar:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/chaintificate?schema=public"

# Pinata IPFS (Untuk upload gambar sertifikat)
NEXT_PUBLIC_PINATA_JWT="your_pinata_jwt_token"
NEXT_PUBLIC_GATEWAY_URL="https://gateway.pinata.cloud"

# Blockchain (Opsional, tergantung konfigurasi Wagmi)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your_wallet_connect_id"
```

### 3. Setup Database Prisma
Generate client Prisma dan sinkronkan skema ke database lokal Anda:

```bash
# Generate Prisma Client
npm run build 
# atau secara spesifik: 
npx prisma generate

# Push schema ke Database (untuk development)
npx prisma db push
```

### 4. Jalankan Server Development
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda. Pastikan dompet kripto Anda terhubung ke jaringan yang sesuai (misalnya Localhost atau Testnet yang dikonfigurasi).

## 📜 Lisensi

Project ini dikembangkan untuk tujuan pendidikan dan prototyping blockchain.
