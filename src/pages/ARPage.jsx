import React from "react";
import { Link } from "react-router-dom";
import ARViewer from "../components/3_organisms/ARViewer";
import { IoArrowBack } from "react-icons/io5";

export default function ARPage() {
  return (
    <div>
      <ARViewer />

      {/* Tombol Kembali */}
      <Link to="/" className="absolute top-4 left-4 z-20 bg-white bg-opacity-75 p-2 rounded-full shadow-md" aria-label="Kembali ke Menu Utama">
        <IoArrowBack size={24} />
      </Link>
    </div>
  );
}
