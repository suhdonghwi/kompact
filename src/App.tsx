import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Monitor from "./components/Monitor";

import Macintosh from "./models/Macintosh";

function App() {
  return (
    <div className="App">
      <Canvas gl={{ antialias: true }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 10, 7]} intensity={1.0} />

        <PerspectiveCamera position={[0, 0.17, 0.5]} makeDefault />

        <Monitor />
      </Canvas>
    </div>
  );
}

export default App;
