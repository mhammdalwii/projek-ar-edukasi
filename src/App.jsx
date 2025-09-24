import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ARPage from "./pages/ARPage";
import MateriPage from "./pages/MateriPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/augmented-reality" element={<ARPage />} />
        <Route path="/materi" element={<MateriPage />} />
        {/* <Route path="/tentang" element={<TentangPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
