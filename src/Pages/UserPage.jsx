/*
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import './CSS/UserPage.css';

const UserPage = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firestore]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  // Function to get initials from the first and last name
  const getInitials = (firstname, lastname) => {
    return `${firstname ? firstname.charAt(0) : ''}${lastname ? lastname.charAt(0) : ''}`;
  };
  return (
    <div className="user-page-container">
      <div className="profile-photo">
        {userData && (
          <>
            <div className="initials">
              {getInitials(userData.firstname, userData.lastname)}
            </div>
            <div className="name">
              {userData.firstname} {userData.lastname}
            </div>
          </>
        )}
      </div>
      <h1>Welcome, {userData ? `${userData.firstname} ${userData.lastname}` : user ? 'user' : ''}!</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
*/


import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import './CSS/UserPage.css';

const UserPage = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }

        // Assuming 'username' is a field in the user document
        const usernameDoc = await firestore.collection('users').doc(user.uid).get();
        if (usernameDoc.exists) {
          setUserData(prevData => ({
            ...prevData,
            username: usernameDoc.data().username,
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firestore]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-page-container">
      <div className="profile-photo">
        {userData && userData.firstname && userData.lastname ? (
          <>
            <div className="initials">
              {`${userData.firstname.charAt(0)}${userData.lastname.charAt(0)}`}
            </div>
            <div className="name">
              {`${userData.firstname} ${userData.lastname}`}
            </div>
          </>
        ) : (
          <div className="initials">
            {/* Handle cases where firstname or lastname is missing */}
            {user ? `${user.email.charAt(0).toUpperCase()}` : ''}
          </div>
        )}
      </div>
      <h1>
        Welcome, {userData ? `${userData.firstname} ${userData.lastname}` : user ? `${user.email}` : ''}!
      </h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;

