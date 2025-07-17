import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clubData, setClubData] = useState({ name: '', genre: '', description: '', image: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/clubs/${id}`);
        setClubData(res.data);
      } catch (err) {
        setError('Failed to fetch club data');
      }
    };
    fetchClub();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/clubs/${id}`, clubData);
      navigate(`/clubs/${id}`);
    } catch (err) {
      setError('Failed to update club');
    }
  };

  return (
    <div className="container">
      <h2>Edit Club</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Club Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={clubData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select
            className="form-control"
            name="genre"
            value={clubData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
            <option value="Classic">Classic</option>
            <option value="Indie">Indie</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={clubData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={clubData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-green">Update Club</button>
      </form>
    </div>
  );
};

export default EditClub;