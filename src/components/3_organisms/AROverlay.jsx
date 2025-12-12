"use client";
import { FaCamera, FaRedo, FaExclamationTriangle } from "react-icons/fa";

export default function AROverlay({ isLoading, error, cameraStatus, isSwitchingCamera, isMobile, onRestart, onSwitchCamera }) {
  // 1. Tampilan Error
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-red-900/90 z-50 backdrop-blur-sm p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm text-center">
          <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-3">⚠️ Kamera Bermasalah</h3>
          <p className="text-gray-700 text-sm mb-6 leading-relaxed">{error}</p>
          <div className="space-y-2 text-xs text-gray-600 mb-6">
            <p>✓ Pastikan browser memiliki akses ke kamera</p>
            <p>✓ Coba refresh halaman atau gunakan browser lain</p>
          </div>
          <button onClick={onRestart} className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // 2. Tampilan Loading (Spinner)
  if (isLoading || isSwitchingCamera) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-50">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white font-medium text-lg animate-pulse">{cameraStatus}</p>
      </div>
    );
  }

  // 3. Tampilan Utama (Controls)
  return (
    <>
      {/* Status Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 shadow-lg">{cameraStatus}</div>
      </div>

      {/* Mobile Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
        {isMobile && (
          <button onClick={onSwitchCamera} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition shadow-lg border border-white/10" aria-label="Ganti Kamera" type="button">
            <FaCamera className="text-xl" />
          </button>
        )}
      </div>

      {/* Footer Controls */}
      <button onClick={onRestart} className="absolute bottom-6 right-4 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition shadow-lg border border-white/10" aria-label="Restart AR" type="button">
        <FaRedo className="text-xl" />
      </button>
    </>
  );
}
