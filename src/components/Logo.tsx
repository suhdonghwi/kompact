import styled from 'styled-components';

const FontText = styled.h1`
  font-family: 'SANJUGotgam';
  font-size: 2rem;
`;

const Logo = ({ style }: { style?: React.CSSProperties }) => {
  return <FontText style={style}>콤팩트</FontText>;
};

export default Logo;
