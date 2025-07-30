import React, { useState, useEffect } from 'react';

const EditProfile = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        bio: initialData.bio || '',
        avatar: initialData.avatar || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Username is required');
      return;
    }
    if (onSave) {
      onSave(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="text-2xl font-bold text-primary mb-6">Edit Profile</h2>
        <div className="edit-container">
          <form onSubmit={handleSubmit} className="form-container">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
                onClick={handleCancel}
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
