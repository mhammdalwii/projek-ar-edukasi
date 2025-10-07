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
  {
    targetIndex: 1,
    modelPath: "/assets/models/kapasitor3.glb",
    title: "Kapasitor",
    description: "Kapasitor adalah komponen listrik yang digunakan untuk menyimpan muatan listrik...",
  },
  {
    targetIndex: 2,
    modelPath: "/assets/models/induktor.glb",
    title: "Induktor",
    description: "Induktor adalah komponen pasif yang menyimpan energi dalam bentuk medan magnet...",
  },
  {
    targetIndex: 3,
    modelPath: "/assets/models/dioda.glb",
    title: "Dioda",
    description: "Dioda adalah komponen elektronik yang memungkinkan arus listrik mengalir hanya dalam satu arah...",
  },
  {
    targetIndex: 4,
    modelPath: "/assets/models/transistor.glb",
    title: "Transistor",
    description: "Transistor adalah komponen semikonduktor yang digunakan untuk memperkuat atau mengalihkan sinyal elektronik...",
  },
  {
    targetIndex: 5,
    modelPath: "/assets/models/integrated_circuit.glb",
    title: "IC (Integrated Circuit)",
    description: "IC adalah rangkaian elektronik miniatur yang menggabungkan banyak komponen seperti transistor, resistor, dan kapasitor dalam satu chip...",
  },
  {},
];

export default function ARViewer() {
  const containerRef = useRef(null);
  const [activeContent, setActiveContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cameraStatus, setCameraStatus] = useState("Menginisialisasi kamera...");
  const [cameraMode, setCameraMode] = useState("environment");
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);

  useEffect(() => {
    let mindarThree;
    let mixers = [];
    let animationLoopId;

    const startAR = async () => {
      try {
        setIsLoading(true);
        setCameraStatus("Memuat library AR...");

        if (!window.MINDAR) {
          throw new Error("MindAR library belum dimuat");
        }

        setCameraStatus("Menyiapkan kamera...");

        // Konfigurasi kamera berdasarkan mode
        const config = {
          container: containerRef.current,
          imageTargetSrc: "/assets/markers/targets.mind",
          uiScanning: "yes",
          uiLoading: "yes",
        };

        // Tambahkan preferensi kamera untuk mobile
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Default ke kamera belakang untuk HP
          config.cameraParams = {
            facingMode: cameraMode,
          };
        }

        mindarThree = new window.MINDAR.IMAGE.MindARThree(config);

        const { renderer, scene, camera } = mindarThree;
        const gltfLoader = new GLTFLoader();

        // Optimasi untuk mobile
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.0);
        pointLight.position.set(0, 5, 5);
        scene.add(pointLight);

        setCameraStatus("Memuat model 3D...");

        // 🔑 Buat anchor untuk setiap target
        arContent.forEach((content) => {
          const anchor = mindarThree.addAnchor(content.targetIndex);

          gltfLoader.load(
            content.modelPath,
            (gltf) => {
              const model = gltf.scene;
              model.scale.set(0.3, 0.3, 0.3);
              model.position.set(0, 0.1, 0);
              model.rotation.set(0, 0, 0);

              model.traverse((child) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });

              anchor.group.add(model);
              console.log("Model loaded successfully");

              if (gltf.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
                mixers.push(mixer);
              }
            },
            (progress) => {
              const percent = ((progress.loaded / progress.total) * 100).toFixed(0);
              setCameraStatus(`Memuat model... ${percent}%`);
            },
            (error) => {
              console.error("Error loading model:", error);
              setError(`Gagal memuat model. Pastikan file ada di: ${content.modelPath}`);
            }
          );

          anchor.onTargetFound = () => {
            console.log("Target found!");
            setActiveContent(content);
            setCameraStatus("Target ditemukan!");
          };

          anchor.onTargetLost = () => {
            console.log("Target lost!");
            setActiveContent(null);
            setCameraStatus("Cari marker target...");
          };
        });

        setCameraStatus("Memulai kamera...");
        await mindarThree.start();

        setIsLoading(false);
        setCameraStatus(`Kamera ${cameraMode === "environment" ? "Belakang" : "Depan"} aktif`);
        setIsSwitchingCamera(false);

        // Animation loop
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
        setError(`Error: ${err.message}. Pastikan mengakses via HTTPS dan izinkan kamera.`);
        setIsLoading(false);
        setIsSwitchingCamera(false);
      }
    };

    startAR();

    return () => {
      if (animationLoopId) {
        cancelAnimationFrame(animationLoopId);
      }
      if (mindarThree && mindarThree.controller) {
        mindarThree.stop();
      }
    };
  }, [cameraMode]); // Restart ketika cameraMode berubah

  // Fungsi untuk switch kamera
  const switchCamera = () => {
    setIsSwitchingCamera(true);
    setCameraStatus("Mengganti kamera...");

    // Toggle antara depan dan belakang
    setCameraMode((prevMode) => (prevMode === "environment" ? "user" : "environment"));
  };

  const restartAR = () => {
    window.location.reload();
  };

  // Deteksi apakah device mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="relative w-screen h-screen bg-black">
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Loading Overlay */}
      {(isLoading || isSwitchingCamera) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-semibold">{cameraStatus}</p>
            <p className="text-sm mt-2 text-gray-300">{isSwitchingCamera ? "Mengganti kamera..." : "Memuat pengalaman AR..."}</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-90 z-20">
          <div className="text-white text-center p-6 max-w-md">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Kamera Tidak Dapat Diakses</h3>
            <p className="mb-4 text-sm">{error}</p>
            <div className="text-left text-sm bg-black bg-opacity-50 p-3 rounded mb-4">
              <p className="font-semibold">Solusi:</p>
              <p>• Gunakan HTTPS</p>
              <p>• Izinkan akses kamera</p>
              <p>• Refresh halaman</p>
              {!isMobile && <p>• Gunakan perangkat mobile untuk pengalaman terbaik</p>}
            </div>
            <button onClick={restartAR} className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mr-2">
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      {cameraStatus && !isLoading && !error && !isSwitchingCamera && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">{cameraStatus}</div>}

      {/* Camera Switch Button - Hanya tampil di mobile dan ketika tidak loading */}
      {isMobile && !isLoading && !error && !isSwitchingCamera && (
        <button
          onClick={switchCamera}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          title={`Switch ke Kamera ${cameraMode === "environment" ? "Depan" : "Belakang"}`}
        >
          <div className="flex items-center justify-center">
            {cameraMode === "environment" ? (
              // Icon kamera depan (selfie)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // Icon kamera belakang
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2" />
                <path d="M2 12h4l2-3 2 3 2-3 2 3 2-3 2 3h4" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            )}
          </div>
          <span className="text-xs mt-1 block">{cameraMode === "environment" ? "Depan" : "Belakang"}</span>
        </button>
      )}

      {/* Camera Mode Indicator */}
      {isMobile && !isLoading && !error && !isSwitchingCamera && <div className="absolute top-20 right-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">Kamera: {cameraMode === "environment" ? "Belakang" : "Depan"}</div>}

      {/* Info Card */}
      {activeContent && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm z-10 bg-white p-4 rounded-lg shadow-lg border-2 border-green-500">
          <h3 className="font-bold text-lg mb-2 text-green-700">{activeContent.title}</h3>
          <p className="text-gray-800">{activeContent.description}</p>
        </div>
      )}

      {/* Debug Info */}
      {!isLoading && !error && !isSwitchingCamera && (
        <div className="absolute top-16 left-4 z-10">
          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">Device: {isMobile ? "Mobile" : "Desktop"}</div>
        </div>
      )}

      {/* Restart Button */}
      {!isLoading && !error && !isSwitchingCamera && (
        <button onClick={restartAR} className="absolute bottom-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all backdrop-blur-sm" title="Restart AR">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      )}
    </div>
  );
}
