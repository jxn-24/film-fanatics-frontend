import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clubData, setClubData] = useState(null);
  const [form, setForm] = useState({ name: '', genre: '', description: '', image: '' });
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/clubs/${id}`);
        setClubData(res.data);
        setForm({
          name: res.data.name,
          genre: res.data.genre,
          description: res.data.description,
          image: res.data.image,
        });
      } catch (error) {
        console.error('Error fetching club:', error);
      }
    };
    fetchClub();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user || user.id !== clubData.creatorId) {
      alert('You are not authorized to edit this club.');
      return;
    }

    try {
      await axios.patch(`http://localhost:3001/clubs/${id}`, form);
      navigate(`/clubs/${id}`);
    } catch (error) {
      console.error('Error updating club:', error);
    }
  };

  if (!clubData) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center">Edit Club</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Club Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="form-control"
              placeholder="Genre"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-control"
              placeholder="Image URL"
            />
          </div>
          <button type="submit" className="btn btn-green" style={{ width: '100%' }}>
            Update Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClub;
