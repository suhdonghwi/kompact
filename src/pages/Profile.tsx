import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

import DiskSlider from '../components/DiskSlider';
import Rom from '../components/Rom';

import { easings, useSpring } from '@react-spring/three';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import Monitor from '../components/Monitor';
import { useMemo } from 'react';
import Macintosh from '../models/Macintosh';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/firebase';

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
    img.src = 'img/disk-ex-1.png';

    const img2 = new Image();
    img2.src = 'img/disk-ex-2.png';

    return [img, img2];
  }, []);

  return (
    <Canvas>
      <ambientLight intensity={0.7} />

      <Macintosh position={[0, 0, 0]} />
    </Canvas>
  );
}

const ThreeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function Profile() {
  const user = useRecoilValue(userState);

  /*
  if (!user) {
    return <Navigate to="login" />;
  }
  */

  return (
    <>
      <ThreeBackground>
        <ThreeCanvas />
      </ThreeBackground>

      <Container>
        <Rom />
        <DiskSlider email="sgmin.park@gmail.com" />
      </Container>
    </>
  );
}

export default Profile;
