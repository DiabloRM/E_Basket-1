import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <div className='loginsignup-fields'>
          {isSignUp && <input type="text" placeholder='Your Name' />}
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        <button>{isSignUp ? 'Continue' : 'Login'}</button>
        <p className="loginsignup-login">
          {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
          <span onClick={toggleForm}>{isSignUp ? 'Login Here' : 'Sign Up Here'}</span>
        </p>
        {isSignUp && (
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, I agree to all the terms and conditions of use & privacy policy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
