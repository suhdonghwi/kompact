import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import Monitor from "./components/Monitor";

import Macintosh from "./models/Macintosh";

function App() {
  const images = useMemo(() => {
    const img = new Image();
    img.src = "sample.png";

    return [img];
  }, []);

  return (
    <div className="App">
      <Canvas gl={{ antialias: true }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 10, 7]} intensity={1.0} />

        <PerspectiveCamera position={[0, 0.18, 0.48]} makeDefault />

        <Monitor images={images}/>
      </Canvas>
    </div>
  );
}

export default App;
