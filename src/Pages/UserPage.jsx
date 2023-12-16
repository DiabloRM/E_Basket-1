// UserPage.js

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import './CSS/UserPage.css';

const UserPage = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (user) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firestore]);

  // Function to get initials from the first and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div className="user-page-container">
      <div className="profile-photo">
        {userData && (
          <>
            <div className="initials">
              {getInitials(userData.firstName, userData.lastName)}
            </div>
            <div className="name">
              {userData.firstName} {userData.lastName}
            </div>
          </>
        )}
      </div>
      <h1>Welcome, {userData ? `${userData.firstName} ${userData.lastName}` : user ? 'user' : ''}!</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
