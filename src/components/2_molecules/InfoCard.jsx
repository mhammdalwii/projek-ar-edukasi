"use client";

export default function InfoCard({ title, description }) {
  return (
    <div className="absolute bottom-6 left-6 z-20 max-w-xs">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-5 border border-white/20">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        {/* deskripsi */}
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
