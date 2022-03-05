import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { AtomEffect } from 'recoil';

const auth = getAuth();

const firebaseUserEffect =
  (): AtomEffect<User | null> =>
  ({ setSelf, trigger }) => {
    // Initialize atom value to the remote storage state
    if (trigger === 'get') {
      setSelf(auth.currentUser);
    }

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setSelf(user);
      } else {
        // User is signed out
      }
    });
  };

export default firebaseUserEffect;
