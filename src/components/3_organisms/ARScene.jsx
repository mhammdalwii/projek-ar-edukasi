// src/components/3_organisms/ARScene.jsx

import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ARScene({ controller, anchors, arContent }) {
  useEffect(() => {
    if (!controller || !anchors.length) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const scene = new THREE.Scene();
    const camera = controller.getCamera();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector(".ar-scene-container").appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
    anchors.forEach((anchor) => {
      const content = arContent.find((c) => c.targetIndex === anchor.targetIndex);
      if (content) {
        const loader = new GLTFLoader();
        loader.load(content.modelPath, (gltf) => {
          const model = gltf.scene;
          model.scale.set(0.1, 0.1, 0.1);
          model.position.set(0, 0, 0);
          anchor.group.add(model);
        });
      }
    });

    renderer.setAnimationLoop(() => {
      controller.update();
      renderer.render(scene, camera);
    });

    const handleResize = () => renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [controller, anchors, arContent]);

  return <div className="ar-scene-container absolute top-0 left-0 w-full h-full" />;
}
