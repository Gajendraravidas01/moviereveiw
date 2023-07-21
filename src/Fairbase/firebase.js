// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3LGjIPsdI33RpmdDqxwwQ7cIhtmcxKas",
  authDomain: "mymovie-f3b49.firebaseapp.com",
  projectId: "mymovie-f3b49",
  storageBucket: "mymovie-f3b49.appspot.com",
  messagingSenderId: "1062759966830",
  appId: "1:1062759966830:web:1a428a90488cbf34295e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieref = collection(db,"movies");
export const reviewref = collection(db,"review");
export const usersref = collection(db,"users");
export default app