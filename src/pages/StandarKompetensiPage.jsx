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
          STANDAR KOMPETENSI
          <br />
          KOMPETENSI DASAR
        </h1>
        <div className="bg-orange-500 p-2 rounded-md">
          <FaClipboardList size={24} />
        </div>
      </header>

      {/* Konten Utama */}
      <main className="p-4 flex-grow">
        <ContentCard title="STANDAR KOMPETENSI">
          <p>Memahami Dasar-Dasar Elektronika</p>
        </ContentCard>

        <ContentCard title="KOMPETENSI DASAR">
          <ol className="list-decimal list-inside">
            <li>Memahami simbol komponen elektronika</li>
            <li>Memahami sifat-sifat komponen elektronika</li>
          </ol>
        </ContentCard>

        <ContentCard title="TUJUAN PEMBELAJARAN">
          <ol className="list-decimal list-inside">
            <li>Mengenali dan memahami simbol berbagai macam komponen elektronika aktif dan pasif</li>
            <li>Memahami sifat-sifat komponen elektronika aktif dan pasif</li>
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
