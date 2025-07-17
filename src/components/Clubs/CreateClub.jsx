import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateClub = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/clubs', { name, genre, description });
      navigate('/clubs');
    } catch (err) {
      setError('Failed to create club');
    }
  };

  return (
    <div className="container">
      <h2>Create Club</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Club Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select
            className="form-control"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Select genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Club</button>
      </form>
    </div>
  );
};

export default CreateClub;