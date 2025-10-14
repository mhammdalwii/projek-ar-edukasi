import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBack, IoDownload, IoDocument } from "react-icons/io5";

const PDF_FILE_PATH = "/assets/pdf/materi_elektronika.pdf";

export default function MateriPage() {
  const fullPdfUrl = `${window.location.origin}${PDF_FILE_PATH}`;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="mr-4 text-2xl hover:bg-gray-700 p-2 rounded-lg transition duration-200">
            <IoArrowBack />
          </Link>
          <h1 className="text-xl font-bold">Materi Pembelajaran Elektronika</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* File Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="bg-blue-500 p-6 text-white">
              <div className="flex items-center">
                <IoDocument className="text-4xl mr-4" />
                <div>
                  <h2 className="text-2xl font-bold">Materi Elektronika</h2>
                  <p className="text-blue-100">File PDF - Materi Pembelajaran</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Download Button */}
                <a
                  href={PDF_FILE_PATH}
                  download="materi_elektronika.pdf"
                  className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
                >
                  <IoDownload className="mr-3 text-xl" />
                  Download PDF
                </a>

                {/* Open in New Tab */}
                <a
                  href={fullPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
                >
                  <span className="mr-3">📄</span>
                  Buka di Browser
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
