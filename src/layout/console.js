import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOXsc0YdIjQKUeDewqlh4Zrp3bnh_faQE",
  authDomain: "myblog-8ab88.firebaseapp.com",
  projectId: "myblog-8ab88",
  storageBucket: "myblog-8ab88.firebasestorage.app",
  messagingSenderId: "639198185809",
  appId: "1:639198185809:web:f593853f3346f64874eb70",
  measurementId: "G-8TNBB2NK55"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };