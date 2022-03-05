import { atom } from 'recoil';

import firebaseUserEffect from './effects/firebaseUserEffect';

export const userState = atom({
  key: 'user',
  default: null,
  effects: [firebaseUserEffect()],
});
