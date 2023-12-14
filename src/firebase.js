// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCf3s60UppiJXVNLkkx-9B8DIE30KflF9Y",
  authDomain: "e-basket-16bd9.firebaseapp.com",
  projectId: "e-basket-16bd9",
  storageBucket: "e-basket-16bd9.appspot.com",
  messagingSenderId: "643918553960",
  appId: "1:643918553960:web:6f03d2486b507f61d9acdd",
  measurementId: "G-KCRTJ2WPTN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
