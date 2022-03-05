import { useDrag, useGesture } from '@use-gesture/react';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import Disk from './Disk';

type Item = { id: string; name: string; cover: string };
const _items: Item[] = [
  {
    id: 'asdfoidsosasd',
    name: '첫번째 디스크',
    cover: '/img/disk-ex-1.png',
  },
  {
    id: 'asdfoiaaosdsd',
    name: '두번째 디스크',
    cover: '/img/disk-ex-2.png',
  },
  {
    id: 'asdfoidsosasd',
    name: '첫번째 디스크',
    cover: '/img/disk-ex-1.png',
  },
  {
    id: 'asdfoiasasdod',
    name: '이잉 디스크',
    cover: '/img/disk-ex-3.png',
  },
  {
    id: 'asdfoiasasdod',
    name: '이잉 디스크',
    cover: '/img/disk-ex-3.png',
  },
  {
    id: 'asdfoidsosasd',
    name: '첫번째 디스크',
    cover: '/img/disk-ex-1.png',
  },
  {
    id: 'asdfoiasasdod',
    name: '이잉 디스크',
    cover: '/img/disk-ex-3.png',
  },
];

const Container = styled.div`
  position: relative;
`;

const List = styled.ul`
  overflow-x: scroll;
  height: 100vh;

  padding: 0;
  list-style-type: none;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Item = styled.li``;

const StyledDisk = styled(Disk)`
  width: 300px;
  height: 300px;
`;

type DiskDoc = { id: string; name: string };

function DiskSlider({ email }: { email: string }) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    (async () => {
      const db = getFirestore();
      const disksRef = collection(db, 'disks');
      const q = query(disksRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      setItems(
        querySnapshot.docs.map((doc) => {
          const data = doc.data() as DiskDoc;
          return {
            id: data.id,
            name: data.name,
            images: [],
            cover: `${data.id}/cover.png`,
          };
        }),
      );
    })();
  }, []);

  return (
    <Container>
      <List>
        {_items.map((item, i) => (
          <Item key={i}>
            <AnimatedDisk cover={item.cover} />
          </Item>
        ))}
      </List>
    </Container>
  );
}

const CoverImg = styled.div`
  width: 300px;
  height: 300px;
  background-size: contain;
`;

function AnimatedDisk({ cover }: { cover: string }) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0 });
      },
      onDragEnd: ({ xy: [x, y] }) => {
        console.log(x, y);
      },
    },
    {},
  );

  return (
    <animated.div {...bind()} style={{ x, y, touchAction: 'none' }}>
      <StyledDisk backgroundImage={cover} />
    </animated.div>
  );
}

export default DiskSlider;
