import React, { useEffect, useRef, useState } from "react";
import ARScene from "./ARScene";
import InfoCard from "../2_molecules/InfoCard";

const arContent = [
  {
    targetIndex: 0,
    modelPath: "/assets/models/resistor.glb",
    title: "Resistor",
    description: "Resistor adalah komponen elektronik pasif...",
  },
  {
    targetIndex: 1,
    modelPath: "/assets/models/kapasitor.glb",
    title: "Kapasitor",
    description: "Kapasitor adalah komponen yang dapat menyimpan muatan...",
  },
];

export default function ARViewer() {
  const containerRef = useRef(null);
  const [activeContent, setActiveContent] = useState(null);
  const [arAnchor, setArAnchor] = useState(null);

  useEffect(() => {
    let mindarThree;

    const startAR = async () => {
      mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/assets/markers/targets.mind",
      });

      const { renderer, scene, camera } = mindarThree;

      const anchor = mindarThree.addAnchor(0);
      setArAnchor(anchor);

      anchor.onTargetFound = () => {
        const foundContent = arContent.find((c) => c.targetIndex === 0);
        setActiveContent(foundContent);
      };
      anchor.onTargetLost = () => setActiveContent(null);

      await mindarThree.start();

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    startAR();

    return () => {
      if (mindarThree && mindarThree.controller) {
        mindarThree.stop();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden">
      {activeContent && arAnchor && <ARScene modelPath={activeContent.modelPath} anchor={arAnchor} />}

      {activeContent && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-10">
          <InfoCard title={activeContent.title} description={activeContent.description} />
        </div>
      )}
    </div>
  );
}
