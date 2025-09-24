import React, { useState, useEffect } from "react";
import InfoCard from "../2_molecules/InfoCard";
const arContent = [
  {
    id: "resistor",
    markerType: "preset", // Tipe marker bawaan
    markerValue: "hiro", // Nama preset
    modelPath: "/assets/models/resistor.glb",
    title: "Resistor",
    description: "Resistor adalah komponen elektronik pasif yang memiliki nilai resistansi untuk membatasi arus listrik.",
  },
  {
    id: "kapasitor",
    markerType: "pattern", // Tipe marker kustom
    markerValue: "/assets/markers/resistor.patt", // Path ke file .patt
    modelPath: "/assets/models/resistor.glb", // Ganti dengan model kapasitor Anda
    title: "Kapasitor",
    description: "Kapasitor adalah komponen yang dapat menyimpan muatan listrik sementara.",
  },
];

export default function ARViewer() {
  const [activeContent, setActiveContent] = useState(null);

  // State untuk menangani event dari a-frame
  useEffect(() => {
    const handleMarkerFound = (event) => {
      const markerId = event.target.id;
      const foundContent = arContent.find((content) => content.id === markerId);
      setActiveContent(foundContent);
    };

    const handleMarkerLost = () => {
      setActiveContent(null);
    };

    // Mendaftarkan event listener ke semua marker
    document.querySelectorAll("a-marker").forEach((marker) => {
      marker.addEventListener("markerFound", handleMarkerFound);
      marker.addEventListener("markerLost", handleMarkerLost);
    });

    return () => {
      // Membersihkan event listener saat komponen di-unmount
      document.querySelectorAll("a-marker").forEach((marker) => {
        marker.removeEventListener("markerFound", handleMarkerFound);
        marker.removeEventListener("markerLost", handleMarkerLost);
      });
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <a-scene vr-mode-ui="enabled: false;" renderer="logarithmicDepthBuffer: true;" embedded arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
        {arContent.map((content) => (
          <a-marker
            key={content.id}
            id={content.id}
            type={content.markerType}
            preset={content.markerType === "preset" ? content.markerValue : undefined}
            url={content.markerType === "pattern" ? content.markerValue : undefined}
            emitevents="true"
          >
            <a-entity gltf-model={`url(${content.modelPath})`} scale="0.05 0.05 0.05" position="0 0.5 0" rotation="0 0 0"></a-entity>
          </a-marker>
        ))}
        <a-entity camera></a-entity>
      </a-scene>

      {/* Overlay UI (InfoCard) */}
      {activeContent && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-10">
          <InfoCard title={activeContent.title} description={activeContent.description} />
        </div>
      )}
    </div>
  );
}
