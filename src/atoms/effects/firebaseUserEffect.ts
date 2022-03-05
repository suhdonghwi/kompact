import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase';
import { AtomEffect } from 'recoil';

const firebaseUserEffect =
  (): AtomEffect<User | null> =>
  ({ setSelf, trigger }) => {
    // Initialize atom value
    if (trigger === 'get') {
      const userCopy = JSON.parse(JSON.stringify(auth.currentUser));
      setSelf(userCopy);
    }

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userCopy = JSON.parse(JSON.stringify(user));
        setSelf(userCopy);
      } else {
        // User is signed out
        setSelf(null);
      }
    });
  };

export default firebaseUserEffect;
