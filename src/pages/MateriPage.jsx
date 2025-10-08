import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

// 📂 Tentukan path ke file PDF Anda di sini
const PDF_FILE_PATH = "/assets/pdf/materi_elektronika.pdf";

export default function MateriPage() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <header className="bg-gray-700 text-white p-4 shadow-md flex items-center flex-shrink-0">
        <Link to="/" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">Materi Pembelajaran</h1>
      </header>

      <main className="flex-grow">
        {/* Tampilkan PDF menggunakan iframe */}
        <iframe src={PDF_FILE_PATH} title="Materi Pembelajaran PDF" className="w-full h-full border-none" />
      </main>
    </div>
  );
}
