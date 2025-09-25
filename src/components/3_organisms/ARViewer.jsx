import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const arContent = [
  {
    targetIndex: 0,
    modelPath: "/assets/models/resistor3.glb",
    title: "Resistor",
    description: "Resistor adalah komponen elektronik pasif...",
  },
];

export default function ARViewer() {
  const containerRef = useRef(null);
  const [activeContent, setActiveContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cameraStatus, setCameraStatus] = useState("Menginisialisasi kamera...");

  useEffect(() => {
    let mindarThree;
    let mixers = [];
    let animationLoopId;

    const startAR = async () => {
      try {
        setIsLoading(true);
        setCameraStatus("Memuat library AR...");

        // Tunggu hingga MindAR siap
        if (!window.MINDAR) {
          throw new Error("MindAR library belum dimuat");
        }

        setCameraStatus("Menyiapkan kamera...");

        mindarThree = new window.MINDAR.IMAGE.MindARThree({
          container: containerRef.current,
          imageTargetSrc: "/assets/markers/targets.mind",
        });

        const { renderer, scene, camera } = mindarThree;
        const gltfLoader = new GLTFLoader();

        // Optimasi renderer
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 10, 5);
        scene.add(directionalLight);

        // Tambahkan lights tambahan untuk pencahayaan yang lebih baik
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        setCameraStatus("Memuat model 3D...");

        let modelsLoaded = 0;
        const totalModels = arContent.length;

        // 🔑 Buat anchor untuk setiap target
        arContent.forEach((content) => {
          const anchor = mindarThree.addAnchor(content.targetIndex);

          gltfLoader.load(
            content.modelPath,
            (gltf) => {
              const model = gltf.scene;
              model.scale.set(0.2, 0.2, 0.2);

              // Optimasi model
              model.traverse((child) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });

              anchor.group.add(model);

              if (gltf.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
                mixers.push(mixer);
              }

              modelsLoaded++;
              if (modelsLoaded === totalModels) {
                setCameraStatus("Menyalakan kamera...");
              }
            },
            // Progress callback
            (progress) => {
              const percent = ((progress.loaded / progress.total) * 100).toFixed(0);
              setCameraStatus(`Memuat model... ${percent}%`);
            },
            // Error callback
            (error) => {
              console.error("Error loading model:", error);
              setError(`Gagal memuat model: ${error.message}`);
            }
          );

          anchor.onTargetFound = () => {
            setActiveContent(content);
            setCameraStatus("Target ditemukan!");
            setTimeout(() => setCameraStatus(null), 2000);
          };
          anchor.onTargetLost = () => {
            setActiveContent(null);
            setCameraStatus("Cari marker target...");
          };
        });

        setCameraStatus("Memulai pengalaman AR...");
        await mindarThree.start();

        setIsLoading(false);
        setCameraStatus("Kamera siap! Arahkan ke marker.");

        // Gunakan animation loop yang lebih optimal
        const animate = (time) => {
          if (!mindarThree) return;

          const delta = time * 0.001;
          mixers.forEach((m) => m.update(delta));
          renderer.render(scene, camera);
          animationLoopId = requestAnimationFrame(animate);
        };

        animationLoopId = requestAnimationFrame(animate);
      } catch (err) {
        console.error("Error starting AR:", err);
        setError(`Gagal memulai AR: ${err.message}`);
        setIsLoading(false);
      }
    };

    // Handle visibility change - pause/resume AR ketika tab tidak aktif
    const handleVisibilityChange = () => {
      if (document.hidden && mindarThree) {
        mindarThree.stop();
      } else if (mindarThree && mindarThree.controller) {
        mindarThree.start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    startAR();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (animationLoopId) {
        cancelAnimationFrame(animationLoopId);
      }

      if (mindarThree && mindarThree.controller) {
        mindarThree.stop();
      }
    };
  }, []);

  // Fungsi untuk restart AR
  const restartAR = () => {
    setError(null);
    setIsLoading(true);
    setCameraStatus("Memulai ulang kamera...");

    // Restart akan dilakukan melalui useEffect
    window.location.reload();
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0" id="ar-container" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">{cameraStatus}</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-80 z-20">
          <div className="text-white text-center p-6 max-w-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-2">Terjadi Kesalahan</h3>
            <p className="mb-4">{error}</p>
            <button onClick={restartAR} className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      {cameraStatus && !isLoading && !error && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">{cameraStatus}</div>}

      {/* Info Card */}
      {activeContent && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm z-10 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-2">{activeContent.title}</h3>
          <p className="text-gray-700">{activeContent.description}</p>
        </div>
      )}

      {/* Control Panel */}
      {!isLoading && !error && (
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button onClick={restartAR} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all" title="Restart AR">
            🔄
          </button>
        </div>
      )}
    </div>
  );
}
