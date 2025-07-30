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
    profileImage: user?.profileImage || '',
    password: '',
  });
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

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

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      setPosts([...posts, { id: Date.now(), content: newPostContent, likes: 0 }]);
      setNewPostContent('');
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  if (!user) return <p style={{ textAlign: 'center' }}>Login to view profile</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
       
        {!editMode ? (
          <>
           <h3>@{user.username}</h3>
            {user.profileImage && (
              <img
                src={user.profileImage}
                alt="Profile"
                className="profile-image"
              />
            )}
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Clubs:</strong> Indie Film Society, Classic Cinema Club</p>
            <p><strong>Watched:</strong> 12 movies</p>
            <p><strong>Followers:</strong> {user.followers?.length || 84}</p>
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
              name="profileImage"
              value={profileData.profileImage}
              placeholder="Profile Image URL"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={profileData.password}
              placeholder="New Password"
              onChange={handleChange}
            />
            <div className="profile-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </>
        )}
        <div className="post-section">
          <h4>Your Posts</h4>
          <div className="post-form">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write a new post..."
            />
            <button onClick={handlePostSubmit}>Add Post</button>
          </div>
          <div className="post-list">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <p>{post.content}</p>
                <div className="post-actions">
                  <span>{post.likes} Likes</span>
                  <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;