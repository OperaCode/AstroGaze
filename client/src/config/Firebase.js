// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALxtGkriq8XQ4cBdWwgCUiRslkw4kyMgo",
  authDomain: "astrogaze-c7622.firebaseapp.com",
  projectId: "astrogaze-c7622",
  storageBucket: "astrogaze-c7622.firebasestorage.app",
  messagingSenderId: "451091021669",
  appId: "1:451091021669:web:12cb0a5c07ae3828086b8c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };



// public facing name : project-451091021669