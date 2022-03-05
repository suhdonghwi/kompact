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
        context.drawImage(img, 70, 170, 700, 500);
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
        <Macintosh position={[0, 0, 0]} />
      </Suspense>

      <mesh position={[0, 0.2, 0.208]} rotation={[-Math.PI / 30, 0, 0]}>
        <planeBufferGeometry args={[0.17, 0.17]} />
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
