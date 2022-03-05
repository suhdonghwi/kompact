import { useRef, useCallback, useEffect } from 'react';
import { useDrag, useGesture } from '@use-gesture/react';
import { useSprings, a, SpringValue, SpringRef } from '@react-spring/web';
import { useSpring } from 'react-spring';

const styles = {
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    touchAction: 'none',
  },
};

/**
 * Calculates a spring-physics driven infinite slider
 *
 * @param {Array} items - display items
 * @param {Function} children - render child
 * @param {number} width - fixed item with
 * @param {number} visible - number of items that muste be visible on screen
 */
export default function DiskSlider({
  items,
  width = 600,
  visible = 4,
  style,
  children,
}: any) {
  const idx = useCallback(
    (x, l = items.length) => (x < 0 ? x + l : x) % l,
    [items],
  );
  const getPos = useCallback(
    (i, firstVis, firstVisIdx) => idx(i - firstVis + firstVisIdx),
    [idx],
  );
  const [springs, api] = useSprings(items.length, (i) => ({
    x: (i < items.length - 1 ? i : -1) * width,
    y: 0,
  }));
  const prev = useRef([0, 1]);
  const target = useRef(null);

  const runSprings = useCallback(
    (y, dy) => {
      const firstVis = idx(Math.floor(y / width) % items.length);
      const firstVisIdx = dy < 0 ? items.length - visible - 1 : 1;
      api.start((i) => {
        const position = getPos(i, firstVis, firstVisIdx);
        const prevPosition = getPos(i, prev.current[0], prev.current[1]);
        const rank =
          firstVis - (y < 0 ? items.length : 0) + position - firstVisIdx;
        const configPos = dy > 0 ? position : items.length - position;
        return {
          x: (-y % (width * items.length)) + width * rank,
          immediate: dy < 0 ? prevPosition > position : prevPosition < position,
          config: {
            tension: (1 + items.length - configPos) * 100,
            friction: 30 + configPos * 20,
          },
        };
      });
      prev.current = [firstVis, firstVisIdx];
    },
    [idx, getPos, width, visible, api, items.length],
  );

  const wheelOffset = useRef(0);

  useGesture(
    {
      onWheel: ({ event, offset: [, y], direction: [, dy] }) => {
        event.preventDefault();
        if (dy) {
          wheelOffset.current = y;
          runSprings(wheelOffset.current + y, dy);
        }
      },
    },
    { target, eventOptions: { passive: false } },
  );

  return (
    <div ref={target} style={{ ...style, ...styles.container }}>
      {springs.map((spring, i) => (
        <ItemContainer
          key={i}
          spring={spring}
          width={width}
          api={api}
          index={i}
          render={children(items[i], i)}
        />
      ))}
    </div>
  );
}

const ItemContainer = ({
  spring,
  width,
  api,
  index,
  render,
}: {
  spring: {
    x: SpringValue<number>;
    y: SpringValue<number>;
  };
  width: number;
  api: SpringRef<{ x: number; y: number }>;
  index: number;
  render: any;
}) => {
  const target = useRef(null);

  const runSpring = useCallback((x, y) => {
    api.start((i) => {
      return index === i ? { x, y } : {};
    });
  }, []);

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
  });

  /*
  //const prevX = useRef(spring.x.get());
  useGesture(
    {
      onDragStart: () => {
        prevX = spring.x.get();
      },
      onDrag: ({ offset: [x, y] }) => {
        runSpring(prevX + x, y);
      },
      onDragEnd: ({ offset: [x] }) => {
        runSpring(prevX, 0);
      },
    },
    {
      target,
      eventOptions: { passive: false },
    },
  );*/

  return (
    <a.div
      ref={target}
      style={{
        position: 'absolute',
        height: '100%',
        willChange: 'transform',
        width,
        x: spring.x,
        y: spring.y,
      }}
      children={render}
    />
  );
};
