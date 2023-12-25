// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCB10NUdY08hoSfCTqa7SJu5Za8NhSi15g",
  authDomain: "e-basket-01.firebaseapp.com",
  projectId: "e-basket-01",
  storageBucket: "e-basket-01.appspot.com",
  messagingSenderId: "515946268452",
  appId: "1:515946268452:web:bb17a362230b686eec55b1",
  measurementId: "G-R0BL91QMD4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
