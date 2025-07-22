import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setClubs } from '../../redux/clubsSlice';

function EditClub() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/clubs/${id}`)
      .then((response) => {
        const club = response.data;
        setName(club.name);
        setGenre(club.genre);
        setDescription(club.description);
      })
      .catch((error) => console.error('Error fetching club:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('genre', genre);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      await axios.put(`${import.meta.env.VITE_APP_API_URL}/clubs/${id}`, formData);
      
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/clubs`);
      dispatch(setClubs(response.data));
      navigate(`/clubs/${id}`);
    } catch (error) {
      console.error('Error updating club:', error);
    }
  };

  return (
    <div className="card">
      <h2>Edit Club</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Club Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
          <option value="">Select Genre</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Classic">Classic</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
          <option value="Documentary">Documentary</option>
          <option value="Animation">Animation</option>
          <option value="Indie">Indie</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditClub;