import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const PDF_FILE_URL = "https://pembelajaranar.my.id/assets/pdf/materi_elektronika.pdf";

export default function MateriPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Deteksi perangkat mobile
    const checkMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    setIsMobile(checkMobile);

    // Jika di mobile, langsung buka di tab baru
    if (checkMobile) {
      window.open(PDF_FILE_URL, "_blank");
    }
  }, []);

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
        {!isMobile ? (
          <>
            {/* Desktop viewer */}
            <embed src={PDF_FILE_URL} type="application/pdf" className="w-full h-full border-none" />
            <div className="absolute bottom-4 w-full text-center">
              <p className="text-sm text-gray-600 bg-gray-100/80 inline-block px-4 py-2 rounded-md shadow">
                Jika PDF tidak tampil,&nbsp;
                <a href={PDF_FILE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  klik di sini untuk melihat langsung
                </a>
              </p>
            </div>
          </>
        ) : (
          // Mobile fallback
          <div className="flex items-center justify-center h-full text-center px-4">
            <p className="text-gray-700 text-sm bg-white p-4 rounded shadow-md">
              📱 Materi sedang dibuka di tab baru.
              <br />
              Jika tidak otomatis terbuka,{" "}
              <a href={PDF_FILE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                klik di sini
              </a>
              .
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
