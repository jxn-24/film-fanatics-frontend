import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClub = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    description: '',
    image: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.genre || !formData.description || !formData.image) {
      return setError('Please fill in all fields.');
    }

    try {
      const newClub = {
        ...formData,
        creatorId: user.id
      };
      await axios.post('http://localhost:3001/clubs', newClub);
      navigate('/clubs');
    } catch (err) {
      console.error('Failed to create club:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="container">
        <p>Please <a href="/login">log in</a> to create a club.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center">Create a New Club</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Club Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="genre"
              className="form-control"
              placeholder="Genre (e.g., Sci-Fi, Comedy, Drama)"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              className="form-control"
              placeholder="Club Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="url"
              name="image"
              className="form-control"
              placeholder="Club Cover Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-green" style={{ width: '100%' }}>
            Create Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClub;
