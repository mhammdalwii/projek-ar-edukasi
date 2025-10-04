import { Link, useNavigate } from "react-router-dom";
import InstructionStep from "../components/2_molecules/InstructionStep";
import { IoArrowBack } from "react-icons/io5";
import { FaCamera, FaCube, FaExpand } from "react-icons/fa";

export default function PetunjukPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 shadow-md flex items-center">
        <Link to="/" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">Petunjuk Penggunaan AR</h1>
      </header>

      {/* Konten Petunjuk */}
      <main className="p-4">
        <div className="space-y-4">
          <InstructionStep
            number="1"
            icon={<FaCamera size={20} />}
            title="Siapkan Marker & Izinkan Kamera"
            description="Cetak atau tampilkan gambar marker di layar lain, lalu izinkan browser untuk mengakses kamera perangkat Anda saat diminta."
          />
          <InstructionStep number="2" icon={<FaExpand size={20} />} title="Arahkan Kamera ke Marker" description="Posisikan kamera Anda sehingga gambar marker terlihat jelas dan sepenuhnya masuk ke dalam layar." />
          <InstructionStep number="3" icon={<FaCube size={20} />} title="Lihat Objek 3D Muncul" description="Secara otomatis, objek 3D beserta penjelasannya akan muncul di atas marker pada layar Anda." />
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8 text-center">
          <button onClick={() => navigate("/augmented-reality")} className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-emerald-700 transition-transform transform hover:scale-105">
            Mulai Coba AR
          </button>
        </div>
      </main>
    </div>
  );
}
