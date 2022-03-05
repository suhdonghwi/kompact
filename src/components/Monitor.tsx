import { useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";

import THREE from "three";
import Macintosh from "../models/Macintosh";

export default function Monitor() {
  const canvasRef = useRef(document.createElement("canvas"));
  const textureRef = useRef<THREE.CanvasTexture>();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1024;
    canvas.height = 1024;

    const context = canvas.getContext("2d");
    if (context) {
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgb(10, 10, 10)";
      context.fill();

      const img = new Image();
      img.src = "sample.png";
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, []);

  useFrame(() => {
    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  });

  return (
    <group>
      <Suspense fallback={null}>
        <Macintosh scale={[0.001, 0.001, 0.001]} position={[0, 1.5, 4.5]} />
      </Suspense>

      <mesh position={[0, 1.68, 4.81]} rotation={[-Math.PI / 24, 0, 0]}>
        <planeBufferGeometry args={[0.6, 0.45]} />
        <meshBasicMaterial attach="material">
          <canvasTexture
            ref={textureRef}
            attach="map"
            image={canvasRef.current}
          />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}
