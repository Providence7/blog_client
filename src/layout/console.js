import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALlmPJakmH0hFlILe63vlShbPwLW5bKUI",
  authDomain: "fashion-era7.firebaseapp.com",
  projectId: "fashion-era7",
  storageBucket: "fashion-era7.firebasestorage.app",
  messagingSenderId: "542393302035",
  appId: "1:542393302035:web:85300fbac6aeff933a53e6",
  measurementId: "G-4CDQYRM5GL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };