// src/pages/HomePage.jsx

import React from "react";
import MainMenuGrid from "../components/3_organisms/MainMenuGrid";

// Kita bisa tetap menggunakan bg-orange-500 untuk logo
const Logo = () => <div className="bg-orange-500 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-full border-4 border-white">R</div>;

export default function HomePage() {
  return (
    // Mengganti background dengan bg-gray-300
    <div className="bg-gray-300 min-h-screen flex justify-center py-4">
      <div className="w-full max-w-md mx-auto">
        <header className="flex items-center space-x-2 p-4">
          <Logo />
          <div className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md shadow-md border-2 border-cyan-400">AR DASAR ELEKTRONIKA</div>
        </header>
        <main className="flex flex-col items-center mt-4">
          {/* Menggunakan text-gray-800 */}
          <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">Memahami Komponen Elektronika</h1>
          <MainMenuGrid />
        </main>
      </div>
    </div>
  );
}
