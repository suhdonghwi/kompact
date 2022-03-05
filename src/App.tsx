import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from './atoms/firebase';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import EditDisk from './pages/EditDisk';
import DiskSlider2 from './components/DiskSlider2';
import { Button } from '@mui/material';

import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect } from 'react';
import CreateDisk from './pages/CreateDisk';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #08b108;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
`;

function App() {
  const user = useRecoilValue(userState);
  useEffect(() => {
    console.log(user?.email);
  }, [user]);
  return (
    <>
      <Reset />
      <BrowserRouter>
        <Routes>
          {user && user.displayName ? <></> : <></>}
          <Route
            path="/"
            element={
              <Container>
                <Title>Hello, world!</Title>
                <Button onClick={() => signOut(auth)}>Sign Out</Button>
              </Container>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-disk" element={<EditDisk />} />
          <Route path="/create-disk" element={<CreateDisk />} />
          <Route path="/test" element={<DiskSlider2 email="" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
