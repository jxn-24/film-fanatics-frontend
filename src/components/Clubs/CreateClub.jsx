import React, { useState } from 'react';
import '../../index.css';

const CreateClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    description: '',
    imageUrl: '',
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'imageUrl') {
      setPreview(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, imageFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clubData = {
      name: formData.name,
      genre: formData.genre,
      description: formData.description,
      image: formData.imageUrl || (formData.imageFile && URL.createObjectURL(formData.imageFile))
    };

    console.log('New club created:', clubData); 

    setSuccessMessage('Club created successfully!');
    setFormData({
      name: '',
      genre: '',
      description: '',
      imageUrl: '',
      imageFile: null,
    });
    setPreview(null);

    setTimeout(() => setSuccessMessage(''), 2000);
  };

  return (
    <div className="create-club-container">
      <h2>Create a Club</h2>
      <form onSubmit={handleSubmit} className="create-club-form">
        <input name="name" type="text" placeholder="Club Name" required value={formData.name} onChange={handleChange} />

        <select name="genre" required value={formData.genre} onChange={handleChange}>
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

        <label>Image URL</label>
        <input type="text" name="imageUrl" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} />

        <label>OR Upload Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

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