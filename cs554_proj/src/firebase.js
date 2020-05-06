import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5ZTkBxReq1gHWg1TYoaIGO6oHGaAR6Ak",
    authDomain: "cs554finalproj.firebaseapp.com",
    databaseURL: "https://cs554finalproj.firebaseio.com",
    projectId: "cs554finalproj",
    storageBucket: "cs554finalproj.appspot.com",
    messagingSenderId: "568173716710",
    appId: "1:568173716710:web:63a05733b09f2ad1838727"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };