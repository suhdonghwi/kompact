import styled from 'styled-components';

const RomBox = styled.div`
  width: 350px;
  height: 350px;
  background-image: url('/img/rom.png');
  background-size: contain;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  border: 7px solid #495057;
  border-top: none;
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.25), 0 14px 14px rgba(0, 0, 0, 0.22);
  border-radius: 10px;

  transition: transform 1.5s;
  transition-delay: 1s;
  transition-timing-function: linear;
  &.invisible {
    transform: translateX(-50%) translateY(-500px);
  }
`;

function Rom({ visible }: { visible: boolean }) {
  return <RomBox className={visible ? '' : 'invisible'} />;
}

export default Rom;
