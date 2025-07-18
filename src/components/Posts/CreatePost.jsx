import React, { useState } from 'react';
import { X, Camera, Film, Send } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    movieId: '',
    movieTitle: '',
    user: 'Current User' // Added author info
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const movies = [
    { id: 1, title: 'The Matrix' },
    { id: 2, title: 'Inception' },
    { id: 3, title: 'The Godfather' },
    { id: 4, title: 'Pulp Fiction' },
    { id: 5, title: 'Spirited Away' },
    { id: 6, title: 'The Dark Knight' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (formData.content.length > 1000) newErrors.content = 'Content must be 1000 characters or less';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const postData = {
        id: Date.now(),
        ...formData,
        image: previewImage,
        likes: 0,
        liked: false,
        comments: 0,
        timestamp: new Date().toISOString()
      };
      dispatch(addPost(postData));
      navigate('/explore'); // Redirect to posts feed
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="create-post-container">
        <div className="create-post-card">
          <div className="create-post-header">
            <h1 className="create-post-title">Create New Post</h1>
            <button
              onClick={() => navigate('/explore')}
              className="create-post-close"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Movie Selection */}
            <div className="create-post-section">
              <label className="create-post-label">
                <Film className="w-5 h-5 mr-2" />
                Select Movie
              </label>
              <select
                name="movieId"
                value={formData.movieId}
                onChange={(e) => {
                  const selectedMovie = movies.find(m => m.id.toString() === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    movieId: e.target.value,
                    movieTitle: selectedMovie?.title || ''
                  }));
                }}
                className="create-post-input"
              >
                <option value="">Select a movie</option>
                {movies.map(movie => (
                  <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="create-post-section">
              <label className="create-post-label">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="create-post-input"
                placeholder="Enter post title"
              />
              {errors.title && <p className="create-post-error">{errors.title}</p>}
            </div>

            {/* Content */}
            <div className="create-post-section">
              <label className="create-post-label">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="create-post-input create-post-textarea"
                placeholder="Share your thoughts about the movie..."
              />
              <div className="create-post-char-count">
                {formData.content.length}/1000 characters
              </div>
              {errors.content && <p className="create-post-error">{errors.content}</p>}
            </div>

            {/* Image Upload */}
            <div className="create-post-section">
              <label className="create-post-label">
                Add Image (Optional)
              </label>
              {previewImage && (
                <div className="mb-4">
                  <img
                    src={previewImage}
                    alt="Post preview"
                    className="create-post-image-preview"
                  />
                </div>
              )}
              
              <div className="create-post-image-actions">
                <label className="create-post-upload-btn">
                  <Camera className="w-5 h-5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                
                {previewImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="create-post-remove-btn"
                  >
                    <X className="w-5 h-5" />
                    <span>Remove Image</span>
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-3">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>

            {/* Submit Button */}
            <div className="create-post-footer">
              <button
                type="button"
                onClick={() => navigate('/explore')}
                className="create-post-cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="create-post-submit-btn"
              >
                <Send className="w-5 h-5" />
                <span>Post</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;