import styled from 'styled-components';
import DiskSlider from '../components/DiskSlider';
import { a } from '@react-spring/web';

const items = [
  {
    css: 'url(/img/disk-ex-1.png)',
    height: 100,
  },
  {
    css: 'url(/img/disk-ex-2.png)',
    height: 100,
  },
  {
    css: 'url(/img/disk-ex-3.png)',
    height: 100,
  },
  {
    css: 'url(/img/disk-ex-4.png)',
    height: 100,
  },
];

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 70px 100px;
`;

const Marker = styled.div`
  color: white;
  position: absolute;
  top: 0px;
  left: 140px;
  font-family: monospace;
`;

const Image = styled(a.div)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const ImageList = () => {
  return (
    <ListContainer>
      <DiskSlider items={items} width={100} visible={3}>
        {({ css }: any, i: any) => (
          <Content>
            <Marker>{String(i).padStart(2, '0')}</Marker>
            <Image style={{ backgroundImage: css }} />
          </Content>
        )}
      </DiskSlider>
    </ListContainer>
  );
};

function Profile() {
  return (
    <>
      <ImageList />
    </>
  );
}

export default Profile;
