import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentCard from "../components/2_molecules/ContentCard";
import { FaHome, FaBars, FaClipboardList } from "react-icons/fa";

export default function StandarKompetensiPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 shadow-md flex justify-between items-center">
        <button className="text-2xl">
          <FaBars />
        </button>
        <h1 className="text-lg font-semibold text-center">
          Capaian Pembelajaran &
          <br />
          Tujuan Pembelajaran
        </h1>
        <div className="bg-orange-500 p-2 rounded-md">
          <FaClipboardList size={24} />
        </div>
      </header>

      {/* Konten Utama */}
      <main className="p-4 flex-grow">
        <ContentCard title="CAPAIAN PEMBELAJARAN">
          <p>Peserta didik mampu memahami komponen elektronika pasif dan aktif, membaca nilai komponen sesuai kodenya, mengenal hukum elektronika dasar (hukum Ohm - Kirchoff, dll)</p>
        </ContentCard>

        <ContentCard title="TUJUAN PEMBELAJARAN">
          <ol className="list-decimal list-inside">
            <li>Memahami jenis, bentuk/kemasan karakteristik komponen elektronika pasif yaitu: RLC (Resistor, Induktor dan Capasitor)</li>
            <li>Memahami jenis, bentuk, karakteristik, konfigurasi komponen elektronika aktif yaitu: Diode, Transistor dan IC</li>
            <li>Memahami pembacaan kode nilai atau system kode komponen pasif dan aktif sesuai kode standar</li>
            <li>Mengevaluasi penerapan komponen pasif dan aktif dalam rangkaian elektronika DC sederhana</li>
            <li>Mengevaluasi penerapan komponen pasif dan aktif dalam rangkaian elektronika AC sederhana </li>
          </ol>
        </ContentCard>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-600 p-2 flex justify-end items-center">
        <button onClick={() => navigate("/")} className="bg-indigo-700 text-white p-3 rounded-lg shadow-md">
          <FaHome size={28} />
        </button>
      </footer>
    </div>
  );
}
