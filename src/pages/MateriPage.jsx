import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const PDF_FILE_URL = "https://pembelajaranar.my.id/assets/pdf/materi_elektronika.pdf";

export default function MateriPage() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* 🔹 Header */}
      <header className="bg-gray-700 text-white p-4 shadow-md flex items-center flex-shrink-0">
        <Link to="/" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">Materi Pembelajaran</h1>
      </header>

      {/*  Konten utama */}
      <main className="flex-grow">
        <iframe src={`https://docs.google.com/gview?url=${encodeURIComponent(PDF_FILE_URL)}&embedded=true`} title="Materi Pembelajaran PDF" className="w-full h-full border-none" />

        {/* Fallback link jika iframe gagal */}
        <p className="text-center text-sm mt-2 text-gray-600">
          Jika PDF tidak tampil,{" "}
          <a href={PDF_FILE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            klik di sini untuk melihat langsung
          </a>
        </p>
      </main>
    </div>
  );
}
