import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';

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

  return (
    <div>
      <h1>Welcome, {userData ? `${userData.firstName} ${userData.lastName}` : 'User'}!</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          {/* Display other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default UserPage;
