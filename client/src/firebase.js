// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "world-journey-19068.firebaseapp.com",
  projectId: "world-journey-19068",
  storageBucket: "world-journey-19068.appspot.com",
  messagingSenderId: "202869282433",
  appId: "1:202869282433:web:544dd4d697a25d055e5f80",
  measurementId: "G-G3RVFSTJZJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);