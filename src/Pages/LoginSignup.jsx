import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const db = getFirestore(app);

const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentuser, setCurrentUser] = useState();
  const [username, setUserName] = useState('');

  useEffect(() => {
    if (currentuser) {
      console.log('User is logged in:', currentuser.email, currentuser.displayName);
    } else {
      console.log('User is not logged in.');
    }
  }, [currentuser]);

  const handleAuth = async () => {
    try {
      setErrorMessage('');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid email format.');
        return;
      }

      if (isSignUp) {
        if (!isCheckboxChecked) {
          setErrorMessage('Please agree to the terms and conditions.');
          return;
        }

        if (password.length < 8) {
          setErrorMessage('Password must be at least 8 characters.');
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's profile with the provided username during signup
        await updateProfile(user, { displayName: username });

        setCurrentUser(user);

        try {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            username: username || user.displayName, // Use provided username or display name
            email: user.email,
            // Add any other user information you want to store
          });

          alert('Welcome! User created successfully');
          console.log('Document written with ID: ', userDocRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }

        console.log('User created successfully!');
        setIsSignUp(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);

        // Set the current user state after login
        const user = auth.currentUser;
        setCurrentUser(user);

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await userDocRef.get();

          if (userDoc.exists()) {
            <input
                type='username'
                placeholder='UserName'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
          }
        } catch (e) {
          console.error('Error updating user document: ', e);
        }

        console.log('User logged in successfully!');
        navigate('/user');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      setErrorMessage(isSignUp ? 'Invalid Email or Password' : 'Failed to login');
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className='loginsignup-fields'>
          {isSignUp && (
            <>
              <input
                type='username'
                placeholder='UserName'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </>
          )}
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleAuth}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
          onMouseDown={(e) => (e.target.style.color = '#fff')}
          onMouseUp={(e) => (e.target.style.color = '#fff')}
        >
          {isSignUp ? 'Continue' : 'Login'}
        </button>
        <p className='loginsignup-login'>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login Here' : 'Sign Up Here'}
          </span>
        </p>
        {isSignUp && (
          <div className='loginsignup-agree'>
            <input
              type='checkbox'
              name=''
              id=''
              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
            />
            <p>
              By continuing, I agree to all the terms and conditions of use & privacy policy.{' '}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
