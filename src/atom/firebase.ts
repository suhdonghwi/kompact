import { initializeApp } from 'firebase/app';
import { atom } from 'recoil';

import firebaseUserEffect from './effects/firebaseUserEffect';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};
initializeApp(firebaseConfig);

export const userState = atom({
  key: 'user',
  default: null,
  effects: [firebaseUserEffect()],
});
