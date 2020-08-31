import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC3iBPG9dTRKRSPT49C8sVuaKC42_PmjQ0",
  authDomain: "crwn-db-6ac7d.firebaseapp.com",
  databaseURL: "https://crwn-db-6ac7d.firebaseio.com",
  projectId: "crwn-db-6ac7d",
  storageBucket: "crwn-db-6ac7d.appspot.com",
  messagingSenderId: "1049178003660",
  appId: "1:1049178003660:web:0980be97f677b647b24a69",
  measurementId: "G-12KXWJ1G2M",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
