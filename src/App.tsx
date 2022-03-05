import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from './atoms/firebase';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import EditDisk from './pages/EditDisk';

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
              </Container>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-disk" element={<EditDisk />} />
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
