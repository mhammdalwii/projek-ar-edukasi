import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ARPage from "./pages/ARPage";
import MateriPage from "./pages/Materi/MateriPage";
import StandarKompetensiPage from "./pages/StandarKompetensiPage";
import MateriDetailPage from "./pages/Materi/MateriDetailPage";
import SoalPage from "./pages/SoalPage";
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
        {/* <Route path="/tentang" element={<TentangPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
