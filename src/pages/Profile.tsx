import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';

import DiskSlider, { DiskItem } from '../components/DiskSlider';
import Rom from '../components/Rom';

import { easings, useSpring } from '@react-spring/three';
import { PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import Monitor from '../components/Monitor';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/firebase';
import Logo from '../components/Logo';
import { IconButton } from '@mui/material';
import { Add as AddIcon, ExitToApp as SignOutIcon } from '@mui/icons-material';

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

function ThreeCanvas({ images }: { images: string[] }) {
  const loadedImages = useMemo(
    () =>
      images.map((image) => {
        const img = new Image();
        img.src = image;
        img.crossOrigin = 'anonymous';
        return img;
      }),
    [images],
  );

  useEffect(() => {
    console.log(loadedImages);
  }, [loadedImages]);

  return (
    <Canvas>
      <ambientLight intensity={0.7} />

      <pointLight position={[5, 10, 7]} intensity={1.0} />
      <PerspectiveCamera position={[0, 0.18, 0.48]} makeDefault />
      <CameraTransition show={loadedImages.length > 0} />

      <PresentationControls
        global
        snap
        zoom={0.8}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 8, Math.PI / 8]}
        azimuth={[-Math.PI / 16, Math.PI / 16]}
      >
        <Monitor images={loadedImages} />
      </PresentationControls>
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

  &.front {
    z-index: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  left: 1rem;
  top: 1rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
`;

function Profile() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const [inRom, setInRom] = useState<DiskItem | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const onDrop = useCallback((item: DiskItem, x: number, y: number) => {
    if (y < 400) {
      setInRom(item);

      setTimeout(() => {
        setImages(item.images.map(({ url }) => url));
        console.log(item);
      }, 2500);
    }
  }, []);

  return (
    <>
      <ThreeBackground className={inRom === null ? '' : 'front'}>
        <ThreeCanvas images={images} />
      </ThreeBackground>
      <Container>
        <Rom visible={inRom === null} />
        <DiskSlider
          visible={inRom === null}
          email={user?.email ?? ''}
          inRom={inRom}
          onDrop={onDrop}
        />
      </Container>
      <ButtonWrapper>
        <IconButton
          onClick={async () => {
            navigate('/create-disk');
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          onClick={async () => {
            await signOut(auth);
            navigate('/login');
          }}
        >
          <SignOutIcon />
        </IconButton>
      </ButtonWrapper>
    </>
  );
}

export default Profile;
