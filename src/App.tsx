import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Monitor from "./components/Monitor";

import Macintosh from "./models/Macintosh";

function App() {
  return (
    <div className="App">
      <Canvas gl={{ antialias: true }}>
        <ambientLight intensity={0.3} />

        <PerspectiveCamera position={[0, 1.5, 6]} makeDefault />

        <Monitor />
      </Canvas>
    </div>
  );
}

export default App;
