import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, registerUser } from '../../store/authSlice';
import '../../index.css';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    avatar: user?.avatar || '',
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...profileData };
    dispatch(registerUser(updatedUser)); 
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) return <p style={{ textAlign: 'center' }}>Login to view profile</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
       
        {!editMode ? (
          <>
            <h3>@{user.username}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Clubs:</strong> Indie Film Society, Classic Cinema Club</p>
            <p><strong>Watched:</strong> 12 movies</p>
            <p><strong>Followers:</strong> 84</p>

            <div className="profile-buttons">
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              name="username"
              value={profileData.username}
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="text"
              name="avatar"
              value={profileData.avatar}
              placeholder="Avatar URL"
              onChange={handleChange}
            />
            <div className="profile-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;