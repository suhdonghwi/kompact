import { Canvas } from "@react-three/fiber";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
