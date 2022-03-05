import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from './atoms/firebase';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';

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
    <BrowserRouter>
      <Routes>
        {user && user.displayName ? <></> : <></>}
        <Route path="/" element={<Title>Hello, world!</Title>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
