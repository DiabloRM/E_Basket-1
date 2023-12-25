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

  // Function to get initials from the username
  const getInitials = (username) => {
    return username ? username.charAt(0) : '';
  };

  return (
    <div className="user-page-container">
      <div className="profile-photo">
        {userData && (
          <>
            <div className="initials">
              {getInitials(userData.username)}
            </div>
            <div className="name">
              {userData.username}
            </div>
          </>
        )}
      </div>
      <h1>Welcome, {userData ? userData.username : user ? 'user' : ''}!</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;

*/




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

        const usernameDoc = await firestore.collection('users').doc(user.uid).get();
        if (usernameDoc.exists) {
          setUserData((prevData) => ({
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
          <div className="name">
            {`${userData.firstname} ${userData.lastname}`}
          </div>
        ) : (
          <div className="name">
            {user ? user.email : ''}
          </div>
        )}
      </div>
      <h1>
        Welcome, {userData ? `${userData.firstname} ${userData.lastname}` : user ? `${user.email}` : ''}!
      </h1>
      {userData && (
        <div>
          <p>User ID: {user.uid}</p>
          <p>Username: {userData.Username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;

*/





// UserPage.js
import React from 'react';
import { useUser } from '../Context/UserContext';
import './CSS/UserPage.css';

const UserPage = () => {
  const { user, userData, loading, getInitials } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-page-container">
      <div className="profile-photo">
        {userData && (
          <>
            <div className="initials">
              {getInitials(userData.username)}
            </div>
            <div className="name">
              {userData.username}
            </div>
          </>
        )}
      </div>
      <h1>Welcome, {userData ? userData.username : user ? 'user' : ''}!</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
