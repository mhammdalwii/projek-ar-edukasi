import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ARPage from "./pages/ARPage";
import MateriPage from "./pages/MateriPage";
import StandarKompetensiPage from "./pages/StandarKompetensiPage";
import SoalPage from "./pages/SoalPage";
import PetunjukPage from "./pages/PetunjukPage";
import TentangPage from "./pages/TentangPage";
import SplashScreen from "./components/3_organisms/SplashScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/augmented-reality" element={<ARPage />} />
        <Route path="/materi" element={<MateriPage />} />
        <Route path="/standar-kompetensi" element={<StandarKompetensiPage />} />
        <Route path="/soal" element={<SoalPage />} />
        <Route path="/petunjuk" element={<PetunjukPage />} />
        <Route path="/tentang" element={<TentangPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
