import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8XqYWvYe6ZrXOOtJmNPTub46E_wOJHHg",
  authDomain: "nutrimars.firebaseapp.com",
  databaseURL: "https://nutrimars.firebaseio.com",
  projectId: "nutrimars",
  storageBucket: "nutrimars.appspot.com",
  messagingSenderId: "932185209293",
  appId: "1:932185209293:web:e37c1839d98c8d019bec84"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const storage = app.storage();
export const db = app.firestore();
