import styled from 'styled-components';

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
  return (
    <Container>
      <Title>Welcome to Kompact</Title>
    </Container>
  );
}

export default App;
