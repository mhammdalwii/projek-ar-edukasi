import { Link } from "react-router-dom";
import ProfileCard from "../components/2_molecules/ProfileCard";
import { IoArrowBack } from "react-icons/io5";

export default function TentangPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gray-700 text-white p-4 shadow-md flex items-center">
        <Link to="/" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">Tentang Aplikasi</h1>
      </header>

      {/* Konten Utama */}
      <main className="p-4 md:p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">AR Dasar Elektronika</h2>
          <p className="text-gray-600 mt-1">Versi 1.0.0 - Oktober 2025</p>
          <p className="max-w-2xl mx-auto mt-4 text-gray-700">Aplikasi ini merupakan media pembelajaran berbasis Augmented Reality untuk membantu memahami komponen dasar elektronika secara interaktif.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Ganti informasi di bawah ini dengan data Anda */}
          <ProfileCard
            name="[Nama Anda]"
            role="Pengembang"
            nim="[NIM Anda]"
            email="[Email Anda]"
            photoUrl="/assets/images/foto_anda.jpg" // Sediakan foto Anda di folder public
            socialLinks={{ github: "https://github.com/[username_anda]" }}
          />

          <ProfileCard
            name="[Nama Pembimbing]"
            role="Pembimbing"
            nim="[NIP/NIDN Pembimbing]"
            email="[Email Pembimbing]"
            photoUrl="/assets/images/foto_pembimbing.jpg" // Sediakan foto pembimbing
          />
        </div>
      </main>
    </div>
  );
}
