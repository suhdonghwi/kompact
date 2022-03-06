import { useDrag, useGesture } from '@use-gesture/react';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
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

const List = styled.ul`
  overflow-x: scroll;
  height: 100vh;

  padding: 1rem 1.5rem;
  box-sizing: border-box;

  list-style-type: none;

  display: flex;
  flex-direction: row;
  align-items: flex-end;

  transition: transform 1s;
  transition-delay: 2.5s;
  &.invisible {
    transform: translateY(500px);
  }
`;

const Item = styled.li`
  & + & {
    margin-left: 30px;
  }
`;

const StyledDisk = styled(Disk)`
  width: 300px;
  height: 300px;
`;

type DiskDoc = { id: string; name: string; length: number };

export type DiskItem = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  cover: string;
};

function DiskSlider({
  visible,
  email,
  inRom,
  onDrop,
}: {
  visible: boolean;
  email: string;
  inRom: DiskItem | null;
  onDrop: (item: DiskItem, x: number, y: number) => void;
}) {
  const [items, setItems] = useState<DiskItem[]>([]);
  useEffect(() => {
    (async () => {
      const db = getFirestore();
      const disksRef = collection(db, 'disks');
      const q = query(disksRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const d: DiskItem[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DiskDoc;
        return {
          id: doc.id,
          name: data.name,
          images: Array.from(Array(data.length)).map((_, i) => ({
            url:
              'https://firebasestorage.googleapis.com/v0/b/kompact-archive.appspot.com/o/' +
              doc.id +
              '%2F' +
              i +
              '?alt=media',
          })),
          cover:
            'https://firebasestorage.googleapis.com/v0/b/kompact-archive.appspot.com/o/' +
            doc.id +
            '%2Fcover' +
            '?alt=media',
        };
      });
      setItems(d);
    })();
  }, [email]);

  return (
    <List className={visible ? '' : 'invisible'}>
      {items.map((item, i) => (
        <Item key={i}>
          <AnimatedDisk
            item={item}
            index={i}
            inRom={inRom !== null && item.id === inRom.id}
            onDrop={(x, y) => onDrop(item, x, y)}
          />
        </Item>
      ))}
    </List>
  );
}

const DiskContainer = styled(animated.div)`
  transition: transform 1.5s;
  transition-delay: 1s;
  transition-timing-function: linear;
  &.invisible {
    transform: translateY(-500px);
  }
`;

function AnimatedDisk({
  item,
  index,
  inRom,
  onDrop,
}: {
  item: Item;
  index: number;
  inRom: boolean;
  onDrop: (x: number, y: number) => void;
}) {
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
      },
      onDragEnd: ({ xy: [x, y] }) => {
        onDrop(x, y);
      },
    },
    {},
  );

  useEffect(() => {
    if (inRom) {
      api.start({
        x: document.body.clientWidth / 2 - 350 / 2 - index * 332,
        y: -480,
      });
    }
  }, [inRom]);

  return (
    <DiskContainer className={inRom ? 'invisible' : ''}>
      <animated.div style={{ x, y, touchAction: 'none' }} {...bind()}>
        <StyledDisk backgroundImage={item.cover} />
      </animated.div>
    </DiskContainer>
  );
}

export default DiskSlider;
