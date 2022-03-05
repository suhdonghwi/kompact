import styled from 'styled-components';

const Disk = styled.div<{ backgroundImage?: string }>`
  border-radius: 100%;
  border: 1px solid grey;
  background: ${({ backgroundImage }) =>
    backgroundImage
      ? `url("${backgroundImage}")`
      : 'conic-gradient( white,  white, white, grey, grey, violet, deepskyblue, aqua, palegreen, yellow, orange, red, grey, grey, white, white, white, white, grey, grey, violet, deepskyblue, aqua, palegreen, yellow, orange, red, grey, grey, white)'};
  background-size: cover;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: inherit;
    box-shadow: 0 0 1px grey;
    box-sizing: border-box;
  }

  &:before {
    width: 30%;
    height: 30%;
    margin: -15% 0 0 -15%;
    background: lightgrey;
    background-clip: padding-box;
    border: 10px solid rgba(0, 0, 0, 0.2);
  }

  &:after {
    width: 18%;
    height: 18%;
    margin: -9% 0 0 -9%;
    background: white;
    background-clip: padding-box;
    border: 10px solid rgba(0, 0, 0, 0.1);
    filter: drop-shadow(0 0 2px grey);
  }
`;

export default Disk;
