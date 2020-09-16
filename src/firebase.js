import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWIEZ1fi45L0TLKTigTpygwf6zsk1eGrE",
  authDomain: "slack-clone-ed0c8.firebaseapp.com",
  databaseURL: "https://slack-clone-ed0c8.firebaseio.com",
  projectId: "slack-clone-ed0c8",
  storageBucket: "slack-clone-ed0c8.appspot.com",
  messagingSenderId: "167273783595",
  appId: "1:167273783595:web:878157a7329a14606da56e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Auth stuff

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

export const signOut = () => {
  auth.signOut();
};

// Firestore Stuff
export const firestore = firebase.firestore();
window.firestore = firestore;

export const createOrGetUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        display_name: displayName || additionalData.displayName,
        email,
        photo_url: photoURL
          ? photoURL
          : "https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72",
        created_at: createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error in creating User", error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection("users").doc(uid);
    return userDocument;
  } catch (error) {
    console.error("Error in fetching User");
  }
};
