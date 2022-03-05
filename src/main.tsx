import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';

import './index.css';
import App from './App';

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
};
console.log(import.meta.env.MODE);
console.log(firebaseConfig);
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
