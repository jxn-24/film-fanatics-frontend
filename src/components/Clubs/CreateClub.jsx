import React, { useState } from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

const CreateClub = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    description: '',
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, imageFile: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clubData = {
      name: formData.name,
      genre: formData.genre,
      description: formData.description,
      image: formData.imageFile ? URL.createObjectURL(formData.imageFile) : '/default-club-image.jpg', // Use default image if none provided
      members: 0,
      watchlist: [],
      topMovie: '',
    };

    fetch('http://localhost:3001/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clubData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage('Club created successfully!');
        setFormData({
          name: '',
          genre: '',
          description: '',
          imageFile: null,
        });
        setPreview(null);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/clubs'); // Navigate to club list after creation
        }, 2000);
      })
      .catch((error) => console.error('Error creating club:', error));
  };

  return (
    <div className="create-club-container">
      <form onSubmit={handleSubmit} className="create-club-form">
        <h2>Create a Club</h2>
        <input
          name="name"
          type="text"
          placeholder="Club Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <select
          name="genre"
          required
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">Select Genre</option>
          {genres.map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Club Description"
          required
          value={formData.description}
          onChange={handleChange}
        />
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview && (
          <div className="preview">
            <img src={preview} alt="preview" />
          </div>
        )}
        <button type="submit">Create Club</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default CreateClub;