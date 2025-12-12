import React, { useEffect } from "react";
import { FaDownload, FaWhatsapp } from "react-icons/fa";
import { jsPDF } from "jspdf";

const NOMOR_WA_TUJUAN = "6285213333165";

export default function QuizResult({ userInfo, answersLog }) {
  const score = answersLog.filter((log) => log.isCorrect).length;
  const totalQuestions = answersLog.length;
  const wrong = totalQuestions - score;

  // Simpan hasil ke localStorage
  useEffect(() => {
    const attempt = {
      id: new Date().toISOString(),
      ...userInfo,
      score,
      totalQuestions,
      log: answersLog, // Kita tetap simpan log lengkap di local storage
    };
    localStorage.setItem("quizAttempt", JSON.stringify(attempt));
  }, [userInfo, answersLog, score, totalQuestions]);

  // Fungsi untuk membuat dan mengunduh PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Hasil Kuis - AR Dasar Elektronika", 10, 20);

    doc.setFontSize(12);
    doc.text(`Nama: ${userInfo.name}`, 10, 40);
    doc.text(`Kelas: ${userInfo.userClass}`, 10, 50);

    doc.setFontSize(14);
    doc.text(`Jawaban Benar: ${score}`, 10, 70);
    doc.text(`Jawaban Salah: ${wrong}`, 10, 80);

    doc.save(`hasil_kuis_${userInfo.name.replace(" ", "_")}.pdf`);
  };

  // Fungsi untuk mengirim ringkasan via WhatsApp
  const handleSendWhatsApp = () => {
    // Buat teks ringkas sesuai permintaan
    let text = `Halo, saya telah mengerjakan kuis AR Dasar Elektronika.\n\n`;
    text += `Nama: ${userInfo.name}\n`;
    text += `Kelas: ${userInfo.userClass}\n`;
    text += `Benar: ${score}\n`;
    text += `Salah: ${wrong}\n\n`;
    text += `Terima kasih.`;

    // Encode teks untuk URL dan buka link wa.me
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${NOMOR_WA_TUJUAN}?text=${encodedText}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Hasil Kuis Selesai!</h2>

      <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
        <p className="text-lg">
          Nama: <span className="font-bold">{userInfo.name}</span>
        </p>
        <p className="text-lg">
          Kelas: <span className="font-bold">{userInfo.userClass}</span>
        </p>
        <p className="text-3xl font-bold text-emerald-600 mt-2">
          Skor: {score} / {totalQuestions}
        </p>
      </div>

      {/* Tombol Aksi Baru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button onClick={handleDownloadPDF} className="flex items-center justify-center bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors">
          <FaDownload className="mr-2" />
          Unduh Hasil (PDF)
        </button>
        <button onClick={handleSendWhatsApp} className="flex items-center justify-center bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
          <FaWhatsapp className="mr-2" />
          Kirim Hasil ke WA
        </button>
      </div>

      <h3 className="text-xl font-bold mb-4">Ringkasan Kuis:</h3>
      <p className="text-center text-sm text-gray-500">Kuis ini hanya dapat dikerjakan satu kali. Silakan unduh atau kirim hasil Anda.</p>
      {/* Kita bisa sembunyikan rincian jawaban jika tidak diperlukan */}
      {/* <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {answersLog.map((log, index) => ( ... ))}
        </div> 
      */}
    </div>
  );
}
