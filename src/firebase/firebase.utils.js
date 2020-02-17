import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyALotke2BA1vi0YFlpvO1pinCMBrN26Lgk",
    authDomain: "crwn-db-ba114.firebaseapp.com",
    databaseURL: "https://crwn-db-ba114.firebaseio.com",
    projectId: "crwn-db-ba114",
    storageBucket: "crwn-db-ba114.appspot.com",
    messagingSenderId: "534116169590",
    appId: "1:534116169590:web:c819c0223bc6e2f4b26c57",
    measurementId: "G-WYMYTG8HEW"
  };

// Initialize Firebase
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionaData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  //if there the exists value in snapshot doesn't exist, then we will do this
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionaData
      })
    } catch (error) {
      console.log('Error creating new User', error.message);
    }
  }

  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;