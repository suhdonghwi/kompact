import { useFrame } from '@react-three/fiber';
import {
  Suspense,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import THREE from 'three';
import Macintosh from '../models/Macintosh';

interface MonitorProps {
  images: HTMLImageElement[];
}

export default function Monitor({ images }: MonitorProps) {
  const canvasRef = useRef(document.createElement('canvas'));
  const textureRef = useRef<THREE.CanvasTexture>();

  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1024;
    canvas.height = 1024;

    const context = canvas.getContext('2d');
    if (context) {
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'rgb(10, 10, 10)';
      context.fill();
    }
  }, []);

  useFrame(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      const image = images[index];

      const realWidth = canvas.width - 100;
      const realHeight = canvas.height - 300;

      let showWidth, showHeight;
      if (realWidth / image.width > realHeight / image.height) {
        showWidth = image.height * (realHeight / image.height);
        showHeight = realHeight;
      } else {
        showWidth = realWidth;
        showHeight = image.width * (realWidth / image.width);
      }

      context.drawImage(
        images[index],
        (canvas.width - showWidth) / 2,
        (canvas.height - showHeight) / 2,
        showWidth,
        showHeight,
      );
    }

    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  });

  const onClick = useCallback(() => {
    setIndex((idx) => (idx + 1) % 2);
  }, []);

  return (
    <group>
      <mesh
        position={[0, 0.2035, 0.208]}
        rotation={[-Math.PI / 30, 0, 0]}
        onClick={onClick}
      >
        <planeBufferGeometry args={[0.17, 0.13]} />
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
