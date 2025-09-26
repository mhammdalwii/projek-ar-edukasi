import React from "react";
import { Link } from "react-router-dom";
import { materiData } from "../../data/materiData";
import { IoArrowBack, IoChevronForward } from "react-icons/io5";

export default function MateriPage() {
  // Ubah objek materiData menjadi array agar mudah di-map
  const materiList = Object.keys(materiData);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-emerald-600 text-white p-4 shadow-md flex items-center">
        <Link to="/" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">Materi Pembelajaran</h1>
      </header>

      <main className="p-4">
        <div className="space-y-3">
          {materiList.map((key) => (
            <Link
              key={key}
              to={`/materi/${key}`} // Link ke halaman detail, contoh: /materi/resistor
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-semibold text-gray-800">{materiData[key].title}</span>
              <IoChevronForward className="text-gray-400" size={20} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
