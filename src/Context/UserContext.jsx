import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const userDoc = await firestore.collection('users').doc(authUser.uid).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }

      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const getInitials = (username) => {
    return username ? username.charAt(0) : '';
  };

  const value = {
    user,
    userData,
    loading,
    getInitials,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
