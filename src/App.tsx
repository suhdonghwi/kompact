import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

import Macintosh from "./models/Macintosh";

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <PerspectiveCamera
          position={[0, 2, 4]}
          makeDefault
        />

        <Macintosh position={[0, 0, 0]} scale={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}

export default App;
