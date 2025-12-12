/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import AROverlay from "./AROverlay";
import InfoCard from "../2_molecules/InfoCard";

// Data Model
const arContent = [
  {
    targetIndex: 0,
    modelPath: "/assets/models/resistor3.glb",
    title: "Resistor",
    description: "Komponen elektronik pasif untuk menghambat aliran arus listrik.",
  },
  {
    targetIndex: 1,
    modelPath: "/assets/models/capasitor.glb",
    title: "Kapasitor",
    description: "Kapasitor adalah komponen listrik yang digunakan untuk menyimpan muatan listrik.",
  },
  {
    targetIndex: 2,
    modelPath: "/assets/models/induktor.glb",
    title: "Induktor",
    description: "Induktor adalah komponen pasif yang menyimpan energi dalam bentuk medan magnet.",
  },
  {
    targetIndex: 3,
    modelPath: "/assets/models/dioda1.glb",
    title: "Dioda",
    description: "Dioda adalah komponen elektronik yang memungkinkan arus listrik mengalir hanya dalam satu arah.",
  },
  {
    targetIndex: 4,
    modelPath: "/assets/models/transistor.glb",
    title: "Transistor",
    description: "Transistor adalah komponen semikonduktor yang digunakan untuk memperkuat atau mengalihkan sinyal elektronik.",
  },
  {
    targetIndex: 5,
    modelPath: "/assets/models/integrated_circuit.glb",
    title: "IC (Integrated Circuit)",
    description: "IC adalah rangkaian elektronik miniatur yang menggabungkan banyak komponen dalam satu chip.",
  },
];

export default function ARViewer() {
  const containerRef = useRef(null);
  const mindarRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const mixersRef = useRef([]);
  const animationLoopIdRef = useRef(null);

  const [activeContent, setActiveContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cameraStatus, setCameraStatus] = useState("Menginisialisasi...");
  const [cameraMode, setCameraMode] = useState("environment");
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const startAR = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!window.MINDAR) {
          throw new Error("MindAR library tidak ditemukan. Pastikan script sudah di-load.");
        }

        if (!containerRef.current) {
          throw new Error("Container tidak ditemukan.");
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: cameraMode },
            });
            // Jangan stop track, biarkan MindAR yang handle
            // stream.getTracks().forEach((track) => track.stop())
          } catch (err) {
            throw new Error("Izin akses kamera ditolak. Silakan berikan izin di pengaturan browser.");
          }
        }

        const config = {
          container: containerRef.current,
          imageTargetSrc: "/assets/markers/targets.mind",
          uiScanning: "no",
          uiLoading: "yes",
        };

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          config.cameraParams = { facingMode: cameraMode };
        }

        const mindarThree = new window.MINDAR.IMAGE.MindARThree(config);
        mindarRef.current = mindarThree;

        const { renderer, scene, camera } = mindarThree;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        renderer.alpha = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
        dirLight.position.set(5, 10, 7.5);
        dirLight.castShadow = true;
        scene.add(ambientLight, dirLight);

        const gltfLoader = new GLTFLoader();

        arContent.forEach((content) => {
          if (content.targetIndex === undefined || !content.modelPath) return;

          const anchor = mindarThree.addAnchor(content.targetIndex);

          gltfLoader.load(
            content.modelPath,
            (gltf) => {
              try {
                const model = gltf.scene;

                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                // Center model ke origin
                model.position.sub(center);

                // Scale untuk ukuran yang cocok
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 1.5 / maxDim;
                model.scale.set(scale, scale, scale);

                // Posisi di tengah marker dengan sedikit offset ke atas
                model.position.y += 0.3;

                model.castShadow = true;
                model.receiveShadow = true;
                anchor.group.add(model);

                if (gltf.animations && gltf.animations.length > 0) {
                  const mixer = new THREE.AnimationMixer(model);
                  gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                  });
                  mixersRef.current.push(mixer);
                }
              } catch (err) {
                console.error(`Error saat menambah model ${content.title}:`, err);
              }
            },
            undefined,
            (err) => {
              console.error(`Model load error untuk ${content.title}:`, err);
              setCameraStatus(`Error loading: ${content.title}`);
            }
          );

          anchor.onTargetFound = () => {
            console.log(`Target ditemukan: ${content.title}`);
            setActiveContent(content);
            setCameraStatus(`✓ Menampilkan: ${content.title}`);
          };

          anchor.onTargetLost = () => {
            console.log("Target hilang");
            setActiveContent(null);
            setCameraStatus("Mencari Marker...");
          };
        });

        await mindarThree.start();
        console.log("[v0] MindAR started successfully");

        setIsLoading(false);
        setIsSwitchingCamera(false);
        setCameraStatus("✓ Siap! Arahkan ke marker.");

        const animate = () => {
          if (!mindarRef.current) return;

          const delta = clockRef.current.getDelta();
          mixersRef.current.forEach((mixer) => {
            mixer.update(delta);
          });

          renderer.render(scene, camera);
          animationLoopIdRef.current = requestAnimationFrame(animate);
        };

        animate();
      } catch (err) {
        console.error("[v0] AR Error:", err);
        setError(err.message || "Gagal mengakses kamera. Pastikan izin diberikan.");
        setIsLoading(false);
      }
    };

    startAR();

    return () => {
      if (animationLoopIdRef.current) {
        cancelAnimationFrame(animationLoopIdRef.current);
      }
      if (mindarRef.current) {
        mindarRef.current.stop();
        mindarRef.current = null;
      }
      mixersRef.current = [];
    };
  }, [cameraMode]);

  const handleSwitchCamera = () => {
    setIsSwitchingCamera(true);
    setCameraMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleRestart = () => window.location.reload();

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" style={{ width: "100vw", height: "100vh" }} />

      {/* Overlay UI */}
      <AROverlay isLoading={isLoading} error={error} cameraStatus={cameraStatus} cameraMode={cameraMode} isSwitchingCamera={isSwitchingCamera} isMobile={isMobile} onRestart={handleRestart} onSwitchCamera={handleSwitchCamera} />

      {/* Info Card */}
      {activeContent && <InfoCard title={activeContent.title} description={activeContent.description} />}
    </main>
  );
}
