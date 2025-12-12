import { FaMicrochip } from "react-icons/fa";
import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-600 text-white transition-opacity duration-1000">
      <div className="bg-white p-6 rounded-full shadow-xl mb-6 animate-bounce">
        <FaMicrochip className="text-emerald-600 text-6xl" />
      </div>
      <h1 className="text-3xl font-bold mb-2 tracking-wider animate-pulse">AR ELEKTRONIKA</h1>
      <p className="text-emerald-100 text-sm">Media Pembelajaran Interaktif</p>
      <div className="absolute bottom-10">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
