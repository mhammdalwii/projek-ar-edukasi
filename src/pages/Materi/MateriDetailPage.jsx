import React from "react";
import { useParams, Link } from "react-router-dom";
import { materiData } from "../../data/materiData";
import { IoArrowBack } from "react-icons/io5";

export default function MateriDetailPage() {
  const { materiId } = useParams(); // Mengambil ID dari URL, contoh: "resistor"
  const materi = materiData[materiId];

  // Jika data tidak ditemukan, tampilkan pesan
  if (!materi) {
    return (
      <div className="p-4 text-center">
        Materi tidak ditemukan.
        <Link to="/materi" className="text-blue-500 block mt-4">
          Kembali ke Daftar Materi
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-emerald-600 text-white p-4 shadow-md flex items-center">
        <Link to="/materi" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">{materi.title}</h1>
      </header>

      <main className="p-4">
        <div className="bg-white p-5 rounded-lg shadow-md">
          {materi.image && <img src={materi.image} alt={materi.title} className="w-full h-48 object-cover rounded-md mb-4" />}
          <div className="text-gray-700 space-y-4">
            {materi.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
