import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ARPage from "./pages/ARPage";
import MateriPage from "./pages/Materi/MateriPage";
import StandarKompetensiPage from "./pages/StandarKompetensiPage";
import MateriDetailPage from "./pages/Materi/MateriDetailPage";
import SoalPage from "./pages/SoalPage";
import PetunjukPage from "./pages/PetunjukPage";
import TentangPage from "./pages/TentangPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/augmented-reality" element={<ARPage />} />
        <Route path="/materi" element={<MateriPage />} />
        <Route path="/materi/:materiId" element={<MateriDetailPage />} />
        <Route path="/standar-kompetensi" element={<StandarKompetensiPage />} />
        <Route path="/soal" element={<SoalPage />} />
        <Route path="/petunjuk" element={<PetunjukPage />} />
        <Route path="/tentang" element={<TentangPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
