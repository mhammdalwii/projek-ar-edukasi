import React, { useState } from "react";

export default function QuizForm({ onStart }) {
  const [name, setName] = useState("");
  const [userClass, setUserClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && userClass) {
      onStart({ name, userClass });
    } else {
      alert("Nama dan Kelas tidak boleh kosong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold text-center mb-6">Mulai Kuis</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Masukkan nama Anda..." />
      </div>
      <div className="mb-6">
        <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
          Kelas
        </label>
        <input type="text" id="class" value={userClass} onChange={(e) => setUserClass(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: X IPA 1" />
      </div>
      <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
        Mulai Kerjakan
      </button>
    </form>
  );
}
