import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfViewer({ file }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    const container = viewerRef.current;

    const renderPDF = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(file).promise;
        container.innerHTML = ""; // reset sebelum render
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          container.appendChild(canvas);

          await page.render({ canvasContext: context, viewport }).promise;
        }
      } catch (err) {
        container.innerHTML = "<p class='text-red-600 text-center mt-10'>Gagal memuat PDF</p>";
        console.error("Error render PDF:", err);
      }
    };

    renderPDF();
  }, [file]);

  return (
    <div className="w-full h-full overflow-auto bg-gray-100">
      <div ref={viewerRef} className="flex flex-col items-center p-2"></div>
    </div>
  );
}
