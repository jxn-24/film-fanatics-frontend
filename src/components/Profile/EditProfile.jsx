import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth?.user) || { name: '', bio: '', avatar: '' }; // Fallback if no auth slice

  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    avatar: user.avatar || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Dispatch update profile action (replace with your team's auth action)
    dispatch({
      type: 'auth/updateProfile',
      payload: formData,
    });
    navigate('/profile');
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="text-2xl font-bold text-primary mb-6">Edit Profile</h2>
        <div className="edit-container">
          <form onSubmit={handleSubmit} className="form-container">
            <div>
              <label className="form-label">Username</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
            <div>
              <label className="form-label">Avatar URL (Optional)</label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter avatar image URL"
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;