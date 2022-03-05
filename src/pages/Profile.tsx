import styled from 'styled-components';

import { easings, useSpring } from '@react-spring/three';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import DiskSlider from '../components/DiskSlider';
import Rom from '../components/Rom';
import Monitor from '../components/Monitor';
import { useMemo } from 'react';

function CameraTransition({ show }: { show: boolean }) {
  const { camera } = useThree();
  const springProps = useSpring({
    config: { duration: 2000, easing: easings.easeOutQuart },
    x: 0,
    y: 0.18,
    z: show ? 0.48 : 2,
    rotX: show ? 0 : -Math.PI / 2,
    rotY: 0,
    rotZ: 0,
  });

  useFrame(() => {
    camera.position.x = springProps.x.get();
    camera.position.y = springProps.y.get();
    camera.position.z = springProps.z.get();

    camera.rotation.x = springProps.rotX.get();
    camera.rotation.y = springProps.rotY.get();
    camera.rotation.z = springProps.rotZ.get();
  });

  return <></>;
}

function ThreeCanvas() {
  const images = useMemo(() => {
    const img = new Image();
    img.src = 'img/sample.png';

    const img2 = new Image();
    img2.src = 'img/sample2.png';

    return [img, img2];
  }, []);

  return (
    <Canvas gl={{ antialias: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 10, 7]} intensity={1.0} />

      <PerspectiveCamera position={[0, 0.18, 0.48]} makeDefault />
      <CameraTransition show={true} />

      <Monitor images={images} />
    </Canvas>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function Profile() {
  return (
    <Container>
      <Rom />
      <DiskSlider />
    </Container>
  );
}

export default Profile;
