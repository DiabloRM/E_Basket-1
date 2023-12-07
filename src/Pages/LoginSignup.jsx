import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import 'firebase/auth';

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

const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async () => {
    try {
      setErrorMessage('');

      // Check if email is in a valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid email format.');
        return;
      }

      if (isSignUp) {
        // Check if terms and conditions checkbox is checked
        if (!isCheckboxChecked) {
          setErrorMessage('Please agree to the terms and conditions.');
          return;
        }

        if (password.length < 8) {
          setErrorMessage('Password must be at least 8 characters.');
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
        setIsSignUp(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully!');
        navigate('/shop');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      setErrorMessage('Invalid Email or Password');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User is already authenticated:', user);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className='loginsignup-fields'>
          {isSignUp && (
            <>
              <input type="text" placeholder='First Name' />
              <input type="text" placeholder='Last Name' />
            </>
          )}
          <input
            type="email"
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleAuth}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = ''}
          onMouseDown={(e) => e.target.style.color = '#fff'}
          onMouseUp={(e) => e.target.style.color = '#fff'}
        >
          {isSignUp ? 'Continue' : 'Login'}
        </button>
        <p className="loginsignup-login">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login Here' : 'Sign Up Here'}
          </span>
        </p>
        {isSignUp && (
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              name=''
              id=''
              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
            />
            <p>By continuing, I agree to all the terms and conditions of use & privacy policy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
