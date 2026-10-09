import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Aapki Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7MpW1DlYFotxpN9eFaY1FLGDQjgZQoUE",
  authDomain: "authentication-1e3fe.firebaseapp.com",
  projectId: "authentication-1e3fe",
  storageBucket: "authentication-1e3fe.firebasestorage.app",
  messagingSenderId: "743334919191",
  appId: "1:743334919191:web:d0d9617a074d8e8c603052",
  measurementId: "G-G7PKWD7EQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();