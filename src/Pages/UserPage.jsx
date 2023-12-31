import React from 'react';
import { useUser } from '../Context/UserContext';
import './CSS/UserPage.css';

const UserPage = () => {
  const { user, userData, loading, getInitials } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  const initials = userData
    ? getInitials(userData.username).toUpperCase()
    : getInitials(user.email).toUpperCase();

  return (
    <div className="user-page-container">
      <div className="profile-photo">
        {initials && (
          <>
            <div className="initials">
              {initials}
            </div>
          </>
        )}
        {userData && (
          <>
            <div className="name">
              {userData.username}
            </div>
          </>
        )}
      </div>
      <h1>Welcome, {userData ? userData.username : user ? 'Kushal' : ''}!</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;