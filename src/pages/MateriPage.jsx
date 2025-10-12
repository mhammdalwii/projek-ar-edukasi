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

      {/* 🔹 Konten utama */}
      <main className="flex-grow relative">
        {/* Tampilkan PDF langsung */}
        <embed src={PDF_FILE_URL} type="application/pdf" className="w-full h-full border-none" />

        {/* 🔹 Fallback link jika PDF tidak tampil */}
        <div className="absolute bottom-4 w-full text-center">
          <p className="text-sm text-gray-600 bg-gray-100/80 inline-block px-4 py-2 rounded-md shadow">
            Jika PDF tidak tampil,&nbsp;
            <a href={PDF_FILE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              klik di sini untuk melihat langsung
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
