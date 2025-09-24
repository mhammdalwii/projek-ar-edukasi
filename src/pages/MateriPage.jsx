import React from "react";
import { Link } from "react-router-dom";
import MateriCard from "../components/2_molecules/MateriCard";
import { IoArrowBack } from "react-icons/io5";

export default function MateriPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-700 text-white p-4 shadow-md flex items-center">
        <Link to="/" className="mr-4">
          <IoArrowBack size={24} />
        </Link>
        <h1 className="text-xl font-bold">Materi Pembelajaran</h1>
      </header>

      <main className="p-4 md:p-6">
        <MateriCard title="Resistor">
          <p>Resistor adalah komponen elektronik yang berfungsi untuk menghambat atau membatasi aliran arus listrik dalam suatu rangkaian.</p>
          <p>Nilai resistansi diukur dalam satuan Ohm (Ω).</p>
        </MateriCard>

        <MateriCard title="Kapasitor">
          <p>Kapasitor (atau kondensator) adalah komponen yang dapat menyimpan energi listrik dalam bentuk medan listrik. Fungsinya mirip seperti baterai kecil yang bisa diisi dan dilepaskan dengan cepat.</p>
        </MateriCard>
      </main>
    </div>
  );
}
