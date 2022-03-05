import styled from 'styled-components';

const RomBox = styled.div`
  width: 300px;
  height: 300px;
  background-image: url('/img/tray.png');

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

function Rom() {
  return <RomBox></RomBox>;
}

export default Rom;
