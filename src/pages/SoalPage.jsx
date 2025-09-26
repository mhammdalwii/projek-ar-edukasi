import React from "react";
import { Link } from "react-router-dom";
import Quiz from "../components/3_organisms/Quiz";
import { IoArrowBack } from "react-icons/io5";

export default function SoalPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-700 text-white p-4 shadow-md flex items-center">
        <Link to="/" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">Latihan Soal</h1>
      </header>

      <main className="p-4 md:p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl">
          <Quiz />
        </div>
      </main>
    </div>
  );
}
